import {ApolloServer} from "apollo-server-express";
import muuid from "uuid-mongodb";
import express from "express";
import {InMemoryDB} from "../../utils/inMemoryDB.js";
import {queryAPI, setUpServer} from "../../utils/testUtils.js";
import {muuidToString} from "../../utils/helpers.js";
import {AreaType} from "../../db/AreaTypes.js";
import {BulkImportResultType} from "../../db/BulkImportTypes.js";
import MutableClimbDataSource from "../../model/MutableClimbDataSource.js";
import BulkImportDataSource from "../../model/BulkImportDataSource.js";
import addAreaWithClimbs from './examples/add-area-with-climbs.json' assert {type: 'json'};

describe('bulkImport', () => {
  const query = `
    mutation bulkImport($input: BulkImportInput!) {
      bulkImport(input: $input) {
        addedAreas {
          uuid
          metadata {
            area_id
          }
        }
        updatedAreas {
          uuid
          metadata {
            area_id
          }
        }
        addedOrUpdatedClimbs {
          id
        }
      }
    }
  `

  let server: ApolloServer
  let user: muuid.MUUID
  let userUuid: string
  let app: express.Application
  let inMemoryDB: InMemoryDB

  let bulkImport: BulkImportDataSource
  let climbs: MutableClimbDataSource

  beforeAll(async () => {
    ({server, inMemoryDB, app} = await setUpServer())
    // Auth0 serializes uuids in "relaxed" mode, resulting in this hex string format
    // "59f1d95a-627d-4b8c-91b9-389c7424cb54" instead of base64 "WfHZWmJ9S4yRuTicdCTLVA==".
    user = muuid.mode('relaxed').v4()
    userUuid = muuidToString(user)

    bulkImport = BulkImportDataSource.getInstance()
    climbs = MutableClimbDataSource.getInstance()
  })

  beforeEach(async () => {
    await inMemoryDB.clear()
    await bulkImport.addCountry('usa')
  })

  afterAll(async () => {
    await server.stop()
    await inMemoryDB.close()
  })

  it('should return 403 if no user', async () => {
    const res = await queryAPI({
      app,
      query,
      operationName: 'bulkImport',
      variables: {input: addAreaWithClimbs}
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.errors[0].message).toBe('Not Authorised!')
  })

  it('should return 403 if user is not an editor', async () => {
    const res = await queryAPI({
      app,
      userUuid,
      query,
      operationName: 'bulkImport',
      variables: {input: addAreaWithClimbs}
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.errors[0].message).toBe('Not Authorised!')
  })

  it('should return 200 if user is an editor', async () => {
    const res = await queryAPI({
      app,
      userUuid,
      roles: ['editor'],
      query,
      operationName: 'bulkImport',
      variables: {input: addAreaWithClimbs}
    })
    expect(res.status).toBe(200)
  })

  describe('addAreaWithClimbs', () => {
    it('should import data', async () => {
      const res = await queryAPI({
        app,
        userUuid,
        roles: ['editor'],
        query,
        operationName: 'bulkImport',
        variables: {
          input: addAreaWithClimbs
        }
      });
      expect(res.body.errors).toBeFalsy()

      const result = res.body.data.bulkImport as BulkImportResultType
      expect(result.addedAreas.length).toBe(4)

      const committedAreas = await Promise.all(result.addedAreas.map((area) => bulkImport.findOneAreaByUUID(muuid.from(area.metadata.area_id))));
      expect(committedAreas.length).toBe(4);

      const committedClimbs = await Promise.all(result.addedOrUpdatedClimbs.map((climb) => climbs.findOneClimbByMUUID(climb._id)));
      expect(committedClimbs.length).toBe(2);
    })
  });

  describe('updateAreas', () => {
    let testArea: AreaType

    beforeEach(async () => {
      testArea = await bulkImport.addArea(user, "Test Area", null, "us")
    })

    it('should update existing areas', async () => {
      const res = await queryAPI({
        app,
        userUuid,
        roles: ['editor'],
        query,
        operationName: 'bulkImport',
        variables: {
          input: {
            areas: [
              {
                uuid: testArea.metadata.area_id,
                areaName: "Updated Test Area",
                description: "Updated description",
                lat: 11,
                lng: 1.5,
                children: [
                  {
                    areaName: "New Child Area",
                    gradeContext: "UIAA",
                    climbs: [
                      {
                        name: "New Climb",
                        grade: "7+",
                        disciplines: {
                          sport: true
                        },
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      });
      expect(res.body.errors).toBeFalsy()

      const result = res.body.data.bulkImport as BulkImportResultType
      expect(result.addedAreas).toHaveLength(1)
      expect(result.updatedAreas).toHaveLength(1)
      expect(result.addedOrUpdatedClimbs).toHaveLength(1)

      const updatedAreas = await Promise.all(result.updatedAreas.map((area) => bulkImport.findOneAreaByUUID(muuid.from(area.metadata.area_id))));
      expect(updatedAreas).toHaveLength(1);
      expect(updatedAreas[0].area_name).toEqual('Updated Test Area')
      expect(updatedAreas[0].content.description).toEqual('Updated description')
      expect(updatedAreas[0].children).toHaveLength(1)

      const addedAreas = await Promise.all(result.addedAreas.map((area) => bulkImport.findOneAreaByUUID(muuid.from(area.metadata.area_id))));
      expect(addedAreas).toHaveLength(1);
      expect(addedAreas[0].area_name).toEqual('New Child Area')
      // expect(addedAreas[0].gradeContext).toEqual('UIAA')
      expect(addedAreas[0].climbs).toHaveLength(1)

      const addedClimbs = await Promise.all(result.addedOrUpdatedClimbs.map((climb) => climbs.findOneClimbByMUUID(climb._id)));
      expect(addedClimbs).toHaveLength(1);
      expect(addedClimbs[0]?.name).toEqual('New Climb')
      expect(addedClimbs[0]?.grades).toEqual({sport: '7+'})
    })
  });
});