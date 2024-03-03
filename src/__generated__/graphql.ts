import { MUUID } from 'uuid-mongodb'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string, output: string }
  String: { input: string, output: string }
  Boolean: { input: boolean, output: boolean }
  Int: { input: number, output: number }
  Float: { input: number, output: number }
  Date: { input: Date, output: Date }
  MUUID: { input: MUUID, output: MUUID }
}

export interface AddOrganizationInput {
  associatedAreaIds?: InputMaybe<Array<InputMaybe<Scalars['MUUID']['input']>>>
  description?: InputMaybe<Scalars['String']['input']>
  displayName: Scalars['String']['input']
  donationLink?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  excludedAreaIds?: InputMaybe<Array<InputMaybe<Scalars['MUUID']['input']>>>
  facebookLink?: InputMaybe<Scalars['String']['input']>
  hardwareReportLink?: InputMaybe<Scalars['String']['input']>
  instagramLink?: InputMaybe<Scalars['String']['input']>
  orgType: Scalars['String']['input']
  website?: InputMaybe<Scalars['String']['input']>
}

/** Input params for creating a new post */
export interface AddPostInput {
  description?: InputMaybe<Scalars['String']['input']>
  photoUrls: Array<InputMaybe<Scalars['String']['input']>>
  userId: Scalars['ID']['input']
}

export interface AddPostResponse {
  __typename?: 'AddPostResponse'
  postId?: Maybe<Scalars['String']['output']>
}

/** Input for adding a new tag input. */
export interface AddTagInput {
  destinationId: Scalars['ID']['input']
  destinationType: Scalars['Int']['input']
  mediaUrl: Scalars['String']['input']
  mediaUuid: Scalars['ID']['input']
}

export interface AddTagResponse {
  __typename?: 'AddTagResponse'
  tagId?: Maybe<Scalars['ID']['output']>
}

/** Input for adding a new media input. mediaType - 0: photo */
export interface AddXMediaInput {
  mediaType: Scalars['Int']['input']
  mediaUrl: Scalars['String']['input']
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  userId: Scalars['ID']['input']
}

/** Aggregations of data about this area, its children and its climbs. */
export interface AggregateType {
  __typename?: 'AggregateType'
  /** Sums of climbs grouped by discipline */
  byDiscipline?: Maybe<CountByDisciplineType>
  /** Sums of climbs grouped by arbitrary grade */
  byGrade?: Maybe<Array<Maybe<CountByGroupType>>>
  /** Sums of climbs grouped by grade band (Rough adjective difficulty) */
  byGradeBand?: Maybe<CountByGradeBand>
}

export interface AllHistoryFilter {
  fromDate?: InputMaybe<Scalars['Date']['input']>
  toDate?: InputMaybe<Scalars['Date']['input']>
  userUuid?: InputMaybe<Scalars['ID']['input']>
  uuidList?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export interface AllTimeTags {
  __typename?: 'AllTimeTags'
  byUsers: Array<Maybe<TagsByUser>>
  totalMediaWithTags: Scalars['Int']['output']
}

export interface AreEditableFieldsInput {
  areaName?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  experimentalAuthor?: InputMaybe<ExperimentalAuthorType>
  isBoulder?: InputMaybe<Scalars['Boolean']['input']>
  isDestination?: InputMaybe<Scalars['Boolean']['input']>
  isLeaf?: InputMaybe<Scalars['Boolean']['input']>
  lat?: InputMaybe<Scalars['Float']['input']>
  leftRightIndex?: InputMaybe<Scalars['Int']['input']>
  lng?: InputMaybe<Scalars['Float']['input']>
  shortCode?: InputMaybe<Scalars['String']['input']>
  uuid: Scalars['String']['input']
}

/** A climbing area, wall or crag */
export interface Area {
  __typename?: 'Area'
  /** statistics about this area */
  aggregate?: Maybe<AggregateType>
  /** UUIDs of this areas parents, traversing up the heirarchy to the root area. */
  ancestors: Array<Maybe<Scalars['String']['output']>>
  areaName: Scalars['String']['output']
  /** The name that this area is commonly identified by */
  area_name: Scalars['String']['output']
  /** Metadata about creation & update of this area */
  authorMetadata: AuthorMetadata
  /**
   * The areas that appear within this area. If this area is a leaf node,
   * you will not expect to see any child areas.
   */
  children?: Maybe<Array<Maybe<Area>>>
  /**
   * The climbs that appear within this area. If this area is a leaf node, then these climbs can be understood
   * as appearing physically on - rather than within - this area.
   */
  climbs?: Maybe<Array<Maybe<Climb>>>
  content?: Maybe<AreaContent>
  /** total climbs per km sq */
  density: Scalars['Float']['output']
  /**
   * Grade systems have minor variations between countries.
   * gradeContext is a short abbreviated string that identifies the
   * context in which the grade was assigned.
   *
   * Area grade contexts will be inherited by its nearest child climbs.
   */
  gradeContext: Scalars['String']['output']
  id: Scalars['ID']['output']
  /** Media associated with this area, or its child climbs */
  media?: Maybe<Array<Maybe<MediaWithTags>>>
  metadata: AreaMetadata
  /** Organizations associated with this area or its parent areas */
  organizations?: Maybe<Array<Maybe<Organization>>>
  /** pathTokens hashed into a single string */
  pathHash?: Maybe<Scalars['String']['output']>
  /** areaNames of this areas parents, traversing up the heirarchy to the root area. */
  pathTokens: Array<Maybe<Scalars['String']['output']>>
  /** ShortCodes are short, globally uniqe codes that identify significant climbing areas */
  shortCode?: Maybe<Scalars['String']['output']>
  /** The total number of climbs in this area */
  totalClimbs: Scalars['Int']['output']
  /** We use UUID for identification of areas. The id field is used in internal database relations. */
  uuid: Scalars['ID']['output']
}

export interface AreaContent {
  __typename?: 'AreaContent'
  description?: Maybe<Scalars['String']['output']>
}

export interface AreaFilter {
  exactMatch?: InputMaybe<Scalars['Boolean']['input']>
  match: Scalars['String']['input']
}

export interface AreaHistoryFilter {
  areaId?: InputMaybe<Scalars['ID']['input']>
}

export interface AreaInput {
  countryCode?: InputMaybe<Scalars['String']['input']>
  experimentalAuthor?: InputMaybe<ExperimentalAuthorType>
  isBoulder?: InputMaybe<Scalars['Boolean']['input']>
  isDestination?: InputMaybe<Scalars['Boolean']['input']>
  isLeaf?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  parentUuid?: InputMaybe<Scalars['ID']['input']>
}

export interface AreaMetadata {
  __typename?: 'AreaMetadata'
  areaId: Scalars['ID']['output']
  area_id: Scalars['ID']['output']
  /** NE and SW corners of the bounding box for this area */
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>
  /** If this is true, this area is a bouldering area or an individual boulder. */
  isBoulder?: Maybe<Scalars['Boolean']['output']>
  isDestination: Scalars['Boolean']['output']
  /** centroid latitude of this areas bounding box */
  lat?: Maybe<Scalars['Float']['output']>
  /**
   * If this is true, this area has no children and is a leaf node.
   * This means that the area is a crag, boulder or wall that has
   * climbs as its direct decendents.
   * If both leaf and isBoulder are true:
   *   - This area is a boulder.
   *   - climbs[] may only contain boulder problems.
   */
  leaf: Scalars['Boolean']['output']
  /** Left-to-right sorting index.  Undefined or -1 or unsorted area. */
  leftRightIndex?: Maybe<Scalars['Int']['output']>
  /** centroid longitude of this areas bounding box */
  lng?: Maybe<Scalars['Float']['output']>
  /** Mountainproject ID (if associated) */
  mp_id: Scalars['String']['output']
  /** Array of the polygon vertices (convex hull) containing child areas. */
  polygon?: Maybe<Array<Maybe<Array<Maybe<Scalars['Float']['output']>>>>>
}

/** Area sorting input param */
export interface AreaSortingInput {
  /** Area UUID */
  areaId: Scalars['String']['input']
  /** Left-to-right sorting index. The backend enforces uniqueness for value >= 0.  Use -1 to indicate unsorted order. */
  leftRightIndex: Scalars['Int']['input']
}

/** Filter for organizations that are associated with an area. */
export interface AssociatedAreaIdsFilter {
  includes?: InputMaybe<Array<InputMaybe<Scalars['MUUID']['input']>>>
}

/** Author metadata */
export interface AuthorMetadata {
  __typename?: 'AuthorMetadata'
  createdAt?: Maybe<Scalars['Date']['output']>
  createdBy?: Maybe<Scalars['ID']['output']>
  createdByUser?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['Date']['output']>
  updatedBy?: Maybe<Scalars['ID']['output']>
  updatedByUser?: Maybe<Scalars['String']['output']>
}

/**
 * Bulk input for adding or updating areas.
 * Provide either a `uuid` to UPDATE an existing area, or `areaName` to ADD a new area.
 */
export interface BulkImportAreaInput {
  /** The name of the new area (or, if provided together with a uuid, the updated name of the area) */
  areaName?: InputMaybe<Scalars['String']['input']>
  /** An optional bounding box that can be displayed on maps, using GeoJSON bbox (see https://datatracker.ietf.org/doc/html/rfc7946#section-5). */
  bbox?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  /** A list of child areas. Can be deeply nested. */
  children?: InputMaybe<Array<InputMaybe<BulkImportAreaInput>>>
  /**
   * A list of climbs that are directly associated with this area.
   * An area that has climbs cannot have child areas and automatically becomes a leaf node.
   */
  climbs?: InputMaybe<Array<InputMaybe<BulkImportClimbInput>>>
  /** Only relevant for the first level of areas (i. e. USA -> Utah). Must be ISO 3166-1 Alpha-3 country code (e. g. ‘USA’). */
  countryCode?: InputMaybe<Scalars['String']['input']>
  /** The name that this area is commonly identified by within the climbing community. */
  description?: InputMaybe<Scalars['String']['input']>
  /** The grading system used for climbing/bouldering in the area. Inherits from parent node if current node does not have one. UIAA = UIAA/font, US = yds/vscale, FR = french/font (see https://github.com/OpenBeta/openbeta-graphql/blob/9c517329db079c922fe7f092a78b658cb295e158/src/GradeUtils.ts#L40.) */
  gradeContext?: InputMaybe<Scalars['String']['input']>
  /** Latitude coordinate of the area, using the WGS 84 reference system. */
  lat?: InputMaybe<Scalars['Float']['input']>
  /** The sorting index of the area. Defaults to -1 if not provided. */
  leftRightIndex?: InputMaybe<Scalars['Int']['input']>
  /** Longitude coordinate of the area, using the WGS 84 reference system. */
  lng?: InputMaybe<Scalars['Float']['input']>
  /** The area UUID */
  uuid?: InputMaybe<Scalars['ID']['input']>
}

/**
 * Bulk input for adding or updating climbs (and pitches) within an area.
 * Either define `uuid` or `name` to indicate whether to add or update a climb.
 * Provide a `uuid` to UPDATE a climb, and `name` to ADD a new climb.
 * Make sure to update all climbs if the leftRightIndex of a climb is updated.
 */
export interface BulkImportClimbInput {
  /** The number of bolts (fixed anchors) on the climb. */
  boltsCount?: InputMaybe<Scalars['Int']['input']>
  /** The description of this climb, this is the main text field for this climb. This contains beta, visual descriptors, and any other information useful to identifying and attempting the climb. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Object of applicable disciplines (e.g. { "trad": true }). Options: trad, sport, bouldering, deepwatersolo, alpine, ice, mixed, aid, tr (= toprope). Can be combined. */
  disciplines?: InputMaybe<DisciplineType>
  /** The experimental author of the climb. */
  experimentalAuthor?: InputMaybe<ExperimentalAuthorType>
  /** The first ascent information of the climb. Usually formatted as: name(s) (year). */
  fa?: InputMaybe<Scalars['String']['input']>
  /** The difficulty grade of the climb. Must be coherent with the area's gradeContext. I. e. gradeContext = 'US' requires denomination in yds/vscale (climbing/bouldering), so '5.11'/'V14', 'FR' would be french/font '9c+'/'9a', 'UIIA' would be uiaa/font '9+'/'9a'. (see https://github.com/OpenBeta/sandbag). */
  grade?: InputMaybe<Scalars['String']['input']>
  /** Latitude coordinate of the climb, using the WGS 84 reference system. */
  lat?: InputMaybe<Scalars['Float']['input']>
  /** A numeric index used for sorting climbs from left to right (of a wall). */
  leftRightIndex?: InputMaybe<Scalars['Int']['input']>
  /** Total length in meters if known (-1 otherwise) */
  length?: InputMaybe<Scalars['Int']['input']>
  /** Longitude coordinate of the climb, using the WGS 84 reference system. */
  lng?: InputMaybe<Scalars['Float']['input']>
  /** The location of the climb, e.g. 'The first climb on the left, entry directly behind the tree'. */
  location?: InputMaybe<Scalars['String']['input']>
  /** The name that this climb is commonly identified by (or if provided together with a uuid, the updated name of the climb). */
  name?: InputMaybe<Scalars['String']['input']>
  /** A list of pitches that are directly associated with this climb (applies only to multi-pitch climbs). */
  pitches?: InputMaybe<Array<InputMaybe<BulkImportPitchesInput>>>
  /** The protection of the climb, e.g. 'Long run out to the first bolt'. */
  protection?: InputMaybe<Scalars['String']['input']>
  /** The safety rating of a climb based on US movie ratings (see https://github.com/OpenBeta/openbeta-graphql/blob/9c517329db079c922fe7f092a78b658cb295e158/src/graphql/schema/Climb.gql#L177). */
  safety?: InputMaybe<SafetyEnum>
  /** The climb UUID */
  uuid?: InputMaybe<Scalars['ID']['input']>
}

/** Bulk input for adding or updating areas, climbs, and pitches. */
export interface BulkImportInput {
  areas: Array<InputMaybe<BulkImportAreaInput>>
}

/**
 * Bulk input for adding or updating pitches within a climb.
 * Provide `id` to UPDATE an existing pitch.
 * Make sure to update all pitches if the pitchNumber of one pitch is changed.
 */
export interface BulkImportPitchesInput {
  /** The number of bolts (fixed anchors) on the pitch. */
  boltsCount?: InputMaybe<Scalars['Int']['input']>
  /** The description of the pitch. */
  description?: InputMaybe<Scalars['String']['input']>
  /** The climbing disciplines applicable to the pitch (see Climb.disciplines). */
  disciplines?: InputMaybe<DisciplineType>
  /** The difficulty grade of the pitch (see Climb.grade). */
  grade?: InputMaybe<Scalars['String']['input']>
  /** The pitch UUID (if provided, the pitch data will be UPDATED). */
  id?: InputMaybe<Scalars['ID']['input']>
  /** The length of the pitch in meters. */
  length?: InputMaybe<Scalars['Int']['input']>
  /** The number of the pitch in the sequence. */
  pitchNumber?: InputMaybe<Scalars['Int']['input']>
}

export interface BulkImportResult {
  __typename?: 'BulkImportResult'
  addedAreas?: Maybe<Array<Maybe<Area>>>
  addedOrUpdatedClimbs?: Maybe<Array<Maybe<Climb>>>
  updatedAreas?: Maybe<Array<Maybe<Area>>>
}

export interface Change {
  __typename?: 'Change'
  changeId: Scalars['ID']['output']
  dbOp: Scalars['String']['output']
  fullDocument?: Maybe<Document>
  updateDescription?: Maybe<UpdateDescription>
}

/** A climbing route or a boulder problem */
export interface Climb {
  __typename?: 'Climb'
  /**
   * Area UUIDs traversing up the heirarchy from this climbs immediate
   * parent to the root area.
   */
  ancestors?: Maybe<Array<Scalars['String']['output']>>
  /** Metadata about creation & update of this climb */
  authorMetadata: AuthorMetadata
  /** Number of bolts/permanent anchors, if known (-1 otherwise) */
  boltsCount?: Maybe<Scalars['Int']['output']>
  /**
   * Composable attributes for this climb, these are the bread and butter
   * guidebook-like data that make up the bulk of the text beta for this climb
   */
  content: Content
  /** First ascent, if known. Who was the first person to climb this route? */
  fa?: Maybe<Scalars['String']['output']>
  /**
   * Grade systems have minor variations between countries.
   * gradeContext is a short abbreviated string that identifies the
   * context in which the grade was assigned.
   */
  gradeContext?: Maybe<Scalars['String']['output']>
  /** The grade(s) assigned to this climb. See GradeType documentation */
  grades?: Maybe<GradeType>
  id: Scalars['ID']['output']
  /** Total length in meters if known (-1 otherwise) */
  length: Scalars['Int']['output']
  /** Media associated with this climb */
  media?: Maybe<Array<Maybe<MediaWithTags>>>
  metadata: ClimbMetadata
  /** The name that this climb is commonly identified by */
  name: Scalars['String']['output']
  /** The parent area object */
  parent: Area
  /**
   * Area names traversing up the hierarchy from this climbs immediate
   * parent to the root area.
   */
  pathTokens?: Maybe<Array<Scalars['String']['output']>>
  /** List of Pitch objects representing individual pitches of a multi-pitch climb */
  pitches?: Maybe<Array<Maybe<Pitch>>>
  safety?: Maybe<SafetyEnum>
  type: ClimbType
  /**
   * The UUID of the climb is the field used for identification.
   * The id field is used in internal database relations, most GQL
   * queries will use the uuid field.
   */
  uuid: Scalars['ID']['output']
  /** @deprecated Migrating to 'grades' field */
  yds?: Maybe<Scalars['String']['output']>
}

export interface ClimbMetadata {
  __typename?: 'ClimbMetadata'
  climbId: Scalars['ID']['output']
  climb_id: Scalars['ID']['output']
  lat?: Maybe<Scalars['Float']['output']>
  leftRightIndex?: Maybe<Scalars['Int']['output']>
  left_right_index?: Maybe<Scalars['Int']['output']>
  lng?: Maybe<Scalars['Float']['output']>
  /** If this climb originated from Mountain Project, this is the ID */
  mp_id?: Maybe<Scalars['String']['output']>
}

/**
 * What sort of climb is this? Routes can combine these fields, which is why
 * this is not an enumeration.
 *
 * For example, a route may be a sport route, but also a top rope route.
 */
export interface ClimbType {
  __typename?: 'ClimbType'
  /** https://en.wikipedia.org/wiki/Aid_climbing */
  aid?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Alpine_climbing */
  alpine?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Bouldering */
  bouldering?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Deep-water_soloing */
  deepwatersolo?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Ice_climbing */
  ice?: Maybe<Scalars['Boolean']['output']>
  mixed?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Ice_climbing */
  snow?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Sport_climbing */
  sport?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Top_rope_climbing */
  tr?: Maybe<Scalars['Boolean']['output']>
  /** https://en.wikipedia.org/wiki/Traditional_climbing */
  trad?: Maybe<Scalars['Boolean']['output']>
}

export enum CompareType {
  Eq = 'eq',
  Gt = 'gt',
  Lt = 'lt'
}

export interface ComparisonFilter {
  comparison?: InputMaybe<CompareType>
  field?: InputMaybe<Field>
  num?: InputMaybe<Scalars['Float']['input']>
}

/**
 * Composable attributes for this climb, these are the bread and butter
 * guidebook-like data that make up the bulk of the text beta for this climb
 */
export interface Content {
  __typename?: 'Content'
  /**
   * The description of this climb, this is the main text field for this climb.
   * This contains beta, visual descriptors, and any other information useful
   * to identifying and attempting the climb
   */
  description?: Maybe<Scalars['String']['output']>
  /**
   * Information regarding Approach and other location context for this climb.
   * Could also include information about the situation of this specific climb.
   */
  location?: Maybe<Scalars['String']['output']>
  /**
   * What do climbers need to know about making a safe attempt of this climb?
   * What gear do they need, what are the hazards, etc.
   */
  protection?: Maybe<Scalars['String']['output']>
}

export interface CountByDisciplineType {
  __typename?: 'CountByDisciplineType'
  aid?: Maybe<DisciplineStatsType>
  alpine?: Maybe<DisciplineStatsType>
  /** @deprecated Migrating to 'bouldering' */
  boulder?: Maybe<DisciplineStatsType>
  bouldering?: Maybe<DisciplineStatsType>
  deepwatersolo?: Maybe<DisciplineStatsType>
  ice?: Maybe<DisciplineStatsType>
  mixed?: Maybe<DisciplineStatsType>
  snow?: Maybe<DisciplineStatsType>
  sport?: Maybe<DisciplineStatsType>
  tr?: Maybe<DisciplineStatsType>
  trad?: Maybe<DisciplineStatsType>
}

export interface CountByGradeBand {
  __typename?: 'CountByGradeBand'
  advanced?: Maybe<Scalars['Int']['output']>
  beginner?: Maybe<Scalars['Int']['output']>
  expert?: Maybe<Scalars['Int']['output']>
  intermediate?: Maybe<Scalars['Int']['output']>
  unknown?: Maybe<Scalars['Int']['output']>
}

export interface CountByGroupType {
  __typename?: 'CountByGroupType'
  count?: Maybe<Scalars['Int']['output']>
  label?: Maybe<Scalars['String']['output']>
}

export interface CountryInput {
  alpha3ISOCode?: InputMaybe<Scalars['String']['input']>
}

export interface CragsNear {
  __typename?: 'CragsNear'
  _id: Scalars['ID']['output']
  count: Scalars['Int']['output']
  crags?: Maybe<Array<Maybe<Area>>>
  placeId: Scalars['String']['output']
}

export interface DeleteAllTickResult {
  __typename?: 'DeleteAllTickResult'
  deletedCount?: Maybe<Scalars['Int']['output']>
  removed: Scalars['Boolean']['output']
}

export interface DeleteManyClimbsInput {
  idList?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  parentId?: InputMaybe<Scalars['ID']['input']>
}

export interface DeleteSingleTickResult {
  __typename?: 'DeleteSingleTickResult'
  _id: Scalars['ID']['output']
  removed: Scalars['Boolean']['output']
}

export interface DestinationFlagInput {
  flag: Scalars['Boolean']['input']
  id: Scalars['ID']['input']
}

export interface DisciplineStatsType {
  __typename?: 'DisciplineStatsType'
  bands: CountByGradeBand
  total: Scalars['Int']['output']
}

export interface DisciplineType {
  aid?: InputMaybe<Scalars['Boolean']['input']>
  alpine?: InputMaybe<Scalars['Boolean']['input']>
  bouldering?: InputMaybe<Scalars['Boolean']['input']>
  deepwatersolo?: InputMaybe<Scalars['Boolean']['input']>
  ice?: InputMaybe<Scalars['Boolean']['input']>
  mixed?: InputMaybe<Scalars['Boolean']['input']>
  snow?: InputMaybe<Scalars['Boolean']['input']>
  sport?: InputMaybe<Scalars['Boolean']['input']>
  tr?: InputMaybe<Scalars['Boolean']['input']>
  trad?: InputMaybe<Scalars['Boolean']['input']>
}

export interface DisplayNameFilter {
  exactMatch?: InputMaybe<Scalars['Boolean']['input']>
  match: Scalars['String']['input']
}

export type Document = Area | Climb | Organization

export interface EmbeddedEntityInput {
  /** What this tag is pointing to (a climb/area) */
  entityId: Scalars['ID']['input']
  /** 0: climb, 1: area */
  entityType: Scalars['Int']['input']
}

/** A tag target (an area or a climb) */
export interface EntityTag {
  __typename?: 'EntityTag'
  /** ancestors name */
  ancestors: Scalars['String']['output']
  /** Area name */
  areaName: Scalars['String']['output']
  /** Climb name */
  climbName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  /** Latitude */
  lat: Scalars['Float']['output']
  /** Longitude */
  lng: Scalars['Float']['output']
  /** Area or climb ID */
  targetId: Scalars['ID']['output']
  /** Target type: 0: climb, 1: area */
  type: Scalars['Int']['output']
}

/** Input parameters for deleting a tag */
export interface EntityTagDeleteInput {
  mediaId: Scalars['ID']['input']
  tagId: Scalars['ID']['input']
}

/** Filter for organizations that have not excluded themselves from an area. */
export interface ExcludedAreaIdsFilter {
  excludes?: InputMaybe<Array<InputMaybe<Scalars['MUUID']['input']>>>
}

export interface ExperimentalAuthorType {
  displayName: Scalars['String']['input']
  url: Scalars['String']['input']
}

export enum Field {
  Density = 'density',
  TotalClimbs = 'totalClimbs'
}

export interface Filter {
  area_name?: InputMaybe<AreaFilter>
  field_compare?: InputMaybe<Array<InputMaybe<ComparisonFilter>>>
  leaf_status?: InputMaybe<LeafFilter>
  path_tokens?: InputMaybe<PathFilter>
}

/** Input params for getting posts by ID */
export interface GetPostsInput {
  postIds: Array<InputMaybe<Scalars['ID']['input']>>
}

export interface GetPostsResponse {
  __typename?: 'GetPostsResponse'
  posts?: Maybe<Array<Maybe<Post>>>
}

export interface GetTagInput {
  tagIds: Array<InputMaybe<Scalars['ID']['input']>>
}

export interface GetTagResponse {
  __typename?: 'GetTagResponse'
  tag?: Maybe<Array<Maybe<Tag>>>
}

export interface GetXMediaInput {
  xMediaIds: Array<InputMaybe<Scalars['ID']['input']>>
}

export interface GetXMediaResponse {
  __typename?: 'GetXMediaResponse'
  xMedia?: Maybe<Array<Maybe<XMedia>>>
}

/**
 * There are a number of grading systems around the world, this enum
 * specifies the system. Developers will then use the key to best understand
 * its value.
 *
 * https://en.wikipedia.org/wiki/Grade_(climbing)
 */
export interface GradeType {
  __typename?: 'GradeType'
  brazilianCrux?: Maybe<Scalars['String']['output']>
  /**
   * Ewbank grade
   * https://en.wikipedia.org/wiki/Grade_(climbing)#Ewbank
   */
  ewbank?: Maybe<Scalars['String']['output']>
  /**
   * Fontainebleau grading system, the most widely used grading system in Europe.
   * Mostly used for bouldering.
   * https://www.99boulders.com/bouldering-grades#font-scale-aka-fontainebleau-scale
   */
  font?: Maybe<Scalars['String']['output']>
  french?: Maybe<Scalars['String']['output']>
  /**
   * UIAA grading system, typically used in Central Europe (e.g. Germany, Austria, Switzerland).
   * Uses Arabic numerals, e.g. "7-", "7", "7+". (Roman numerals, like "VII-", are not supported).
   * https://en.wikipedia.org/wiki/Grade_(climbing)#UIAA
   */
  uiaa?: Maybe<Scalars['String']['output']>
  /** [read more about vscale](https://www.99boulders.com/bouldering-grades#v-scale) */
  vscale?: Maybe<Scalars['String']['output']>
  /**
   * Yosemite Decimal System
   * https://en.wikipedia.org/wiki/Grade_(climbing)#Yosemite_Decimal_System
   */
  yds?: Maybe<Scalars['String']['output']>
}

export interface GradeTypeInput {
  brazilianCrux?: InputMaybe<Scalars['String']['input']>
  ewbank?: InputMaybe<Scalars['String']['input']>
  font?: InputMaybe<Scalars['String']['input']>
  french?: InputMaybe<Scalars['String']['input']>
  uiaa?: InputMaybe<Scalars['String']['input']>
  vscale?: InputMaybe<Scalars['String']['input']>
  yds?: InputMaybe<Scalars['String']['input']>
}

export interface History {
  __typename?: 'History'
  changes?: Maybe<Array<Maybe<Change>>>
  createdAt: Scalars['Date']['output']
  editedBy: Scalars['ID']['output']
  editedByUser?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  operation: Scalars['String']['output']
}

/** Media object metadata */
export interface IMediaMetadata {
  /** Valid format: jpeg, png, webp, avif */
  format: Scalars['String']['output']
  /** Height in pixels */
  height: Scalars['Int']['output']
  /** Unique id */
  id: Scalars['ID']['output']
  /** File size in bytes */
  size: Scalars['Int']['output']
  /** Upload time */
  uploadTime: Scalars['Date']['output']
  /** Width in pixels */
  width: Scalars['Int']['output']
}

export interface LeafFilter {
  isLeaf: Scalars['Boolean']['input']
}

/** All tags by an author */
export interface MediaByUsers {
  __typename?: 'MediaByUsers'
  mediaWithTags?: Maybe<Array<Maybe<MediaWithTags>>>
  userUuid: Scalars['ID']['output']
  username?: Maybe<Scalars['String']['output']>
}

/**
 * Media connection.
 * See https://graphql.org/learn/pagination/
 */
export interface MediaConnection {
  __typename?: 'MediaConnection'
  edges: MediaEdge[]
  pageInfo: PageInfo
}

/** Input parameters for deleting a media */
export interface MediaDeleteInput {
  mediaId: Scalars['ID']['input']
}

/**
 * Media edge.
 * See https://graphql.org/learn/pagination/
 */
export interface MediaEdge {
  __typename?: 'MediaEdge'
  /** Current node cursor.  The frontend can pass this value to the `after` input parameter to fetch the next page. */
  cursor: Scalars['ID']['output']
  /** Media object */
  node?: Maybe<MediaWithTags>
}

/** Input parameters for creating a new tag */
export interface MediaEntityTagInput {
  /** What this tag is pointing to (a climb/area) */
  entityId: Scalars['ID']['input']
  /** 0: climb, 1: area */
  entityType: Scalars['Int']['input']
  /** Target media id */
  mediaId: Scalars['ID']['input']
}

export interface MediaForFeedInput {
  maxFiles?: InputMaybe<Scalars['Int']['input']>
  maxUsers?: InputMaybe<Scalars['Int']['input']>
}

/** Input parameters for querying a single media object */
export interface MediaInput {
  id: Scalars['ID']['input']
}

/** Represent a media object */
export type MediaWithTags = IMediaMetadata & {
  __typename?: 'MediaWithTags'
  entityTags?: Maybe<Array<Maybe<EntityTag>>>
  format: Scalars['String']['output']
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  mediaUrl: Scalars['String']['output']
  size: Scalars['Int']['output']
  uploadTime: Scalars['Date']['output']
  username?: Maybe<Scalars['String']['output']>
  width: Scalars['Int']['output']
}

export interface Mutation {
  __typename?: 'Mutation'
  /** Add an area */
  addArea?: Maybe<Area>
  /** Add an entity tag to a media. */
  addEntityTag: EntityTag
  /** Add one or more media objects. Each media object may contain one tag. */
  addMediaObjects?: Maybe<Array<Maybe<MediaWithTags>>>
  /** Add an organization */
  addOrganization?: Maybe<Organization>
  addPost?: Maybe<Post>
  /**
   * Adds a tick to the MongoDB
   *
   * NOTE: climbId is created from the hash function on the backend,
   * input the MP id into the function to create it, or just search for the climb on open beta
   *
   * NOTE: source is either MP or OB, which stand for Mountain project and open beta respectively
   * the database will reject anything else. This allows us to determine where the tick was created
   */
  addTick?: Maybe<TickType>
  addXMedia?: Maybe<XMedia>
  /**
   * Add or update an area tree in bulk, including climbs (and their pitches).
   * You can start at any point in the tree given a valid parent area with its uuid.
   * If starting at the root level, the `countryCode` must be provided.
   */
  bulkImport?: Maybe<BulkImportResult>
  /**
   * Deletes all ticks created by a user by the userId,
   * mainly a dev feature for while we are working on getting the schema correct
   */
  deleteAllTicks?: Maybe<DeleteAllTickResult>
  /** Delete one or more climbs */
  deleteClimbs?: Maybe<Scalars['Int']['output']>
  /** Delete one media object. */
  deleteMediaObject: Scalars['Boolean']['output']
  /** Deletes a tick from MongoDB by the _id property created in the database */
  deleteTick?: Maybe<DeleteSingleTickResult>
  editTick?: Maybe<TickType>
  /**
   * Imports a users ticks from mountain project, this feature also deletes all ticks previously imported from mountain project
   * before importing them, allowing users to constantly update their ticks without creating duplicates
   */
  importTicks?: Maybe<Array<Maybe<TickType>>>
  /** Remove an area */
  removeArea?: Maybe<Area>
  /** Remove an entity tag from a media. */
  removeEntityTag: Scalars['Boolean']['output']
  removePost?: Maybe<RemovePostResponse>
  removeXMedia?: Maybe<RemoveXMediaResponse>
  /** Set area destination flag */
  setDestinationFlag?: Maybe<Area>
  /** Update area attributes */
  updateArea?: Maybe<Area>
  /** Update area sorting order in bulk */
  updateAreasSortingOrder?: Maybe<Array<Maybe<Scalars['ID']['output']>>>
  /** Create or update one or more climbs. */
  updateClimbs?: Maybe<Array<Maybe<Scalars['ID']['output']>>>
  /** Update organization attributes */
  updateOrganization?: Maybe<Organization>
  /**
   * Update a user profile or create a new profile if it doesn't exist.
   * Note:  The email field is required when creating a new profile and
   * will be ignore in subsequent update calls to prevent users from
   * changing their email.  The frontend  calls this API whenever a new user
   * logs in; their email therefore should have been verified at this point.
   * When we support email address change in the future, we will need to
   * create a separate update-email mutation to make sure users take the
   * neccessary steps.
   */
  updateUserProfile?: Maybe<Scalars['Boolean']['output']>
}

export interface MutationAddAreaArgs {
  input?: InputMaybe<AreaInput>
}

export interface MutationAddEntityTagArgs {
  input?: InputMaybe<MediaEntityTagInput>
}

export interface MutationAddMediaObjectsArgs {
  input?: InputMaybe<Array<InputMaybe<NewMediaObjectInput>>>
}

export interface MutationAddOrganizationArgs {
  input?: InputMaybe<AddOrganizationInput>
}

export interface MutationAddPostArgs {
  input?: InputMaybe<AddPostInput>
}

export interface MutationAddTickArgs {
  input?: InputMaybe<Tick>
}

export interface MutationAddXMediaArgs {
  input?: InputMaybe<AddXMediaInput>
}

export interface MutationBulkImportArgs {
  input?: InputMaybe<BulkImportInput>
}

export interface MutationDeleteAllTicksArgs {
  userId?: InputMaybe<Scalars['String']['input']>
}

export interface MutationDeleteClimbsArgs {
  input?: InputMaybe<DeleteManyClimbsInput>
}

export interface MutationDeleteMediaObjectArgs {
  input: MediaDeleteInput
}

export interface MutationDeleteTickArgs {
  _id?: InputMaybe<Scalars['ID']['input']>
}

export interface MutationEditTickArgs {
  input?: InputMaybe<TickFilter>
}

export interface MutationImportTicksArgs {
  input?: InputMaybe<Array<InputMaybe<Tick>>>
}

export interface MutationRemoveAreaArgs {
  input?: InputMaybe<RemoveAreaInput>
}

export interface MutationRemoveEntityTagArgs {
  input: EntityTagDeleteInput
}

export interface MutationRemovePostArgs {
  input?: InputMaybe<RemovePostInput>
}

export interface MutationRemoveXMediaArgs {
  input?: InputMaybe<RemoveXMediaInput>
}

export interface MutationSetDestinationFlagArgs {
  input?: InputMaybe<DestinationFlagInput>
}

export interface MutationUpdateAreaArgs {
  input?: InputMaybe<AreEditableFieldsInput>
}

export interface MutationUpdateAreasSortingOrderArgs {
  input?: InputMaybe<Array<InputMaybe<AreaSortingInput>>>
}

export interface MutationUpdateClimbsArgs {
  input?: InputMaybe<UpdateClimbsInput>
}

export interface MutationUpdateOrganizationArgs {
  input?: InputMaybe<OrganizationEditableFieldsInput>
}

export interface MutationUpdateUserProfileArgs {
  input?: InputMaybe<UserProfileInput>
}

export interface NewMediaObjectInput {
  entityTag?: InputMaybe<EmbeddedEntityInput>
  format: Scalars['String']['input']
  height: Scalars['Int']['input']
  mediaUrl: Scalars['String']['input']
  size: Scalars['Int']['input']
  userUuid: Scalars['ID']['input']
  width: Scalars['Int']['input']
}

export interface OrgFilter {
  associatedAreaIds?: InputMaybe<AssociatedAreaIdsFilter>
  displayName?: InputMaybe<DisplayNameFilter>
  excludedAreaIds?: InputMaybe<ExcludedAreaIdsFilter>
}

export interface OrgSort {
  displayName?: InputMaybe<Scalars['Int']['input']>
  updatedAt?: InputMaybe<Scalars['Int']['input']>
}

/** A climbing area, wall or crag */
export interface Organization {
  __typename?: 'Organization'
  associatedAreaIds?: Maybe<Array<Maybe<Scalars['MUUID']['output']>>>
  content?: Maybe<OrganizationContent>
  createdAt?: Maybe<Scalars['Date']['output']>
  createdBy?: Maybe<Scalars['MUUID']['output']>
  /** Name of organization to be displayed on the site. */
  displayName: Scalars['String']['output']
  excludedAreaIds?: Maybe<Array<Maybe<Scalars['MUUID']['output']>>>
  id: Scalars['ID']['output']
  /** We use orgId for identification of organizations. The id field is used in internal database relations. */
  orgId: Scalars['MUUID']['output']
  /**
   * Type of organization. Currently we only support local climbing organizations, which
   * are associated with certain climbing areas. In future there may be advocacy groups
   * like the Access Fund or interest groups like the American Alpine Club that are not
   * associated with any specific climbing areas.
   */
  orgType: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['Date']['output']>
  updatedBy?: Maybe<Scalars['MUUID']['output']>
}

export interface OrganizationContent {
  __typename?: 'OrganizationContent'
  description?: Maybe<Scalars['String']['output']>
  donationLink?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  facebookLink?: Maybe<Scalars['String']['output']>
  hardwareReportLink?: Maybe<Scalars['String']['output']>
  instagramLink?: Maybe<Scalars['String']['output']>
  website?: Maybe<Scalars['String']['output']>
}

export interface OrganizationEditableFieldsInput {
  associatedAreaIds?: InputMaybe<Array<InputMaybe<Scalars['MUUID']['input']>>>
  description?: InputMaybe<Scalars['String']['input']>
  displayName?: InputMaybe<Scalars['String']['input']>
  donationLink?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  excludedAreaIds?: InputMaybe<Array<InputMaybe<Scalars['MUUID']['input']>>>
  facebookLink?: InputMaybe<Scalars['String']['input']>
  hardwareReportLink?: InputMaybe<Scalars['String']['input']>
  instagramLink?: InputMaybe<Scalars['String']['input']>
  orgId: Scalars['MUUID']['input']
  website?: InputMaybe<Scalars['String']['input']>
}

export interface OrganizationHistoryFilter {
  orgId?: InputMaybe<Scalars['MUUID']['input']>
}

export interface PageInfo {
  __typename?: 'PageInfo'
  /** Not yet supported. */
  endCursor?: Maybe<Scalars['String']['output']>
  /** True if there are more data after the last cursor. */
  hasNextPage: Scalars['Boolean']['output']
}

export interface PathFilter {
  exactMatch?: InputMaybe<Scalars['Boolean']['input']>
  size?: InputMaybe<Scalars['Int']['input']>
  tokens: Array<InputMaybe<Scalars['String']['input']>>
}

export interface Pitch {
  __typename?: 'Pitch'
  boltsCount?: Maybe<Scalars['Int']['output']>
  description?: Maybe<Scalars['String']['output']>
  grades?: Maybe<GradeType>
  id: Scalars['ID']['output']
  length?: Maybe<Scalars['Int']['output']>
  parentId: Scalars['ID']['output']
  pitchNumber: Scalars['Int']['output']
  type?: Maybe<ClimbType>
}

export interface PitchInput {
  disciplines?: InputMaybe<DisciplineType>
  grades?: InputMaybe<GradeTypeInput>
  id: Scalars['ID']['input']
  parentId: Scalars['ID']['input']
  pitchNumber: Scalars['Int']['input']
}

export interface Point {
  lat?: InputMaybe<Scalars['Float']['input']>
  lng?: InputMaybe<Scalars['Float']['input']>
}

/** Posts are created by users. They are displayed on the posts page. */
export interface Post {
  __typename?: 'Post'
  _id?: Maybe<Scalars['ID']['output']>
  description?: Maybe<Scalars['String']['output']>
  userId: Scalars['ID']['output']
  xMedia: Array<Maybe<XMedia>>
}

export interface Query {
  __typename?: 'Query'
  area?: Maybe<Area>
  areas?: Maybe<Array<Maybe<Area>>>
  climb?: Maybe<Climb>
  countries?: Maybe<Array<Maybe<Area>>>
  cragsNear?: Maybe<Array<Maybe<CragsNear>>>
  cragsWithin?: Maybe<Array<Maybe<Area>>>
  getAreaHistory?: Maybe<Array<Maybe<History>>>
  getChangeHistory?: Maybe<Array<Maybe<History>>>
  /** Get recent media with tags group by users. */
  getMediaForFeed?: Maybe<Array<Maybe<MediaByUsers>>>
  getOrganizationHistory?: Maybe<Array<Maybe<History>>>
  getPosts?: Maybe<GetPostsResponse>
  getTags?: Maybe<GetTagResponse>
  /** Get a list of users and their tagged photo count. */
  getTagsLeaderboard?: Maybe<TagsLeaderboard>
  /** Get all media belonging to a user (media with or without tags). */
  getUserMedia?: Maybe<Array<Maybe<MediaWithTags>>>
  /**
   * Get media cursor with pagination support.  We only support forward cursor.
   * See
   * - https://graphql.org/learn/pagination/
   * - https://relay.dev/graphql/connections.htm
   */
  getUserMediaPagination?: Maybe<UserMedia>
  getUserPublicPage?: Maybe<UserPublicPage>
  /** Get user public profile */
  getUserPublicProfileByUuid?: Maybe<UserPublicProfile>
  /** Get username object by user uuid */
  getUsername?: Maybe<UsernameDetail>
  getXMedia?: Maybe<GetXMediaResponse>
  /** Get single media object. */
  media?: Maybe<MediaWithTags>
  organization?: Maybe<Organization>
  organizations?: Maybe<Array<Maybe<Organization>>>
  stats?: Maybe<Stats>
  /** Gets all of the users current ticks by their Auth-0 userId or username */
  userTicks?: Maybe<Array<Maybe<TickType>>>
  /**
   * Gets all of the users current ticks for a specific climb by their
   * Auth-0 userId and Open-Beta ClimbId
   */
  userTicksByClimbId?: Maybe<Array<Maybe<TickType>>>
  /** Check to see if a username already exists in the database. */
  usernameExists?: Maybe<Scalars['Boolean']['output']>
}

export interface QueryAreaArgs {
  uuid?: InputMaybe<Scalars['ID']['input']>
}

export interface QueryAreasArgs {
  filter?: InputMaybe<Filter>
  sort?: InputMaybe<Sort>
}

export interface QueryClimbArgs {
  uuid?: InputMaybe<Scalars['ID']['input']>
}

export interface QueryCragsNearArgs {
  includeCrags?: InputMaybe<Scalars['Boolean']['input']>
  lnglat?: InputMaybe<Point>
  maxDistance?: InputMaybe<Scalars['Int']['input']>
  minDistance?: InputMaybe<Scalars['Int']['input']>
  placeId?: InputMaybe<Scalars['String']['input']>
}

export interface QueryCragsWithinArgs {
  filter?: InputMaybe<SearchWithinFilter>
}

export interface QueryGetAreaHistoryArgs {
  filter?: InputMaybe<AreaHistoryFilter>
}

export interface QueryGetChangeHistoryArgs {
  filter?: InputMaybe<AllHistoryFilter>
}

export interface QueryGetMediaForFeedArgs {
  input?: InputMaybe<MediaForFeedInput>
}

export interface QueryGetOrganizationHistoryArgs {
  filter?: InputMaybe<OrganizationHistoryFilter>
}

export interface QueryGetPostsArgs {
  input?: InputMaybe<GetPostsInput>
}

export interface QueryGetTagsArgs {
  input?: InputMaybe<GetTagInput>
}

export interface QueryGetTagsLeaderboardArgs {
  limit?: InputMaybe<Scalars['Int']['input']>
}

export interface QueryGetUserMediaArgs {
  input?: InputMaybe<UserMediaInput>
}

export interface QueryGetUserMediaPaginationArgs {
  input?: InputMaybe<UserMediaInput>
}

export interface QueryGetUserPublicPageArgs {
  input: UsernameInput
}

export interface QueryGetUserPublicProfileByUuidArgs {
  input: UserIdInput
}

export interface QueryGetUsernameArgs {
  input: UserIdInput
}

export interface QueryGetXMediaArgs {
  input?: InputMaybe<GetXMediaInput>
}

export interface QueryMediaArgs {
  input?: InputMaybe<MediaInput>
}

export interface QueryOrganizationArgs {
  muuid?: InputMaybe<Scalars['MUUID']['input']>
}

export interface QueryOrganizationsArgs {
  filter?: InputMaybe<OrgFilter>
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<OrgSort>
}

export interface QueryUserTicksArgs {
  userId?: InputMaybe<Scalars['MUUID']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export interface QueryUserTicksByClimbIdArgs {
  climbId?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['String']['input']>
}

export interface QueryUsernameExistsArgs {
  input: UsernameInput
}

export interface RemoveAreaInput {
  uuid: Scalars['String']['input']
}

/** Input params for removing an existing post */
export interface RemovePostInput {
  postId: Scalars['ID']['input']
}

export interface RemovePostResponse {
  __typename?: 'RemovePostResponse'
  numDeleted?: Maybe<Scalars['String']['output']>
}

export interface RemoveTagInput {
  tagId: Scalars['ID']['input']
}

export interface RemoveTagResponse {
  __typename?: 'RemoveTagResponse'
  numDeleted?: Maybe<Scalars['String']['output']>
}

export interface RemoveXMediaInput {
  xMediaId: Scalars['ID']['input']
}

export interface RemoveXMediaResponse {
  __typename?: 'RemoveXMediaResponse'
  numDeleted?: Maybe<Scalars['String']['output']>
}

/**
 * rating indicates the quality and spacing of a route's available protection for a
 * competent climber. Amusingly, the letter codes associated with the different
 * protection ratings are based on the American system for movie ratings:
 */
export enum SafetyEnum {
  /** Generally good protection with a few sections of poor protection */
  Pg = 'PG',
  /** Fair protection that may result in long, potentially dangerous falls */
  Pg13 = 'PG13',
  /** where there's limited protection and the possibility of serious injury */
  R = 'R',
  Unspecified = 'UNSPECIFIED',
  /** No protection and overall the route is extremely dangerous. */
  X = 'X',
  /**
   * a part of a route where there isn’t any protection for a while below you.
   * It happens when a route is sparsely bolted or there isn’t be anywhere to
   * place a cam. “Running it out” is common on classic routes and
   * sometimes hard sport overhangs.
   * [source](https://www.climbernews.com/what-is-a-runout-in-climbing/)
   */
  Runout = 'runout',
  Terrain = 'terrain'
}

export interface SearchWithinFilter {
  bbox?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  zoom?: InputMaybe<Scalars['Float']['input']>
}

/** Climb change record.  If the climb ID is omitted or does not exist in the database, a new climb will be created. */
export interface SingleClimbChangeInput {
  /** Number of fixed anchors */
  boltsCount?: InputMaybe<Scalars['Int']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  disciplines?: InputMaybe<DisciplineType>
  experimentalAuthor?: InputMaybe<ExperimentalAuthorType>
  /** Legacy FA data */
  fa?: InputMaybe<Scalars['String']['input']>
  grade?: InputMaybe<Scalars['String']['input']>
  /** Climb UUID */
  id?: InputMaybe<Scalars['ID']['input']>
  leftRightIndex?: InputMaybe<Scalars['Int']['input']>
  /** Length in meters */
  length?: InputMaybe<Scalars['Int']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  /** List of Pitch objects representing individual pitches of a multi-pitch climb */
  pitches?: InputMaybe<Array<InputMaybe<PitchInput>>>
  protection?: InputMaybe<Scalars['String']['input']>
}

export interface Sort {
  area_name?: InputMaybe<Scalars['Int']['input']>
  density?: InputMaybe<Scalars['Int']['input']>
  totalClimbs?: InputMaybe<Scalars['Int']['input']>
}

export interface Stats {
  __typename?: 'Stats'
  totalClimbs: Scalars['Int']['output']
  totalCrags: Scalars['Int']['output']
}

/** Tags are what link a post & photo to climb(s) and area(s). XMedia contains an array of TagIds. */
export interface Tag {
  __typename?: 'Tag'
  _id?: Maybe<Scalars['ID']['output']>
  destinationId: Scalars['ID']['output']
  destinationType: Scalars['Int']['output']
  mediaUrl: Scalars['String']['output']
  mediaUuid: Scalars['ID']['output']
}

export interface TagsByUser {
  __typename?: 'TagsByUser'
  total: Scalars['Int']['output']
  userUuid: Scalars['ID']['output']
  username?: Maybe<Scalars['String']['output']>
}

export interface TagsLeaderboard {
  __typename?: 'TagsLeaderboard'
  allTime?: Maybe<AllTimeTags>
}

/**
 * This is our tick type input, containing the name,
 * notes climbId, etc of the ticked climb, all fields are required
 *
 * NOTE: source must either be MP or OB which stand for Mountain Project, or Open Beta respectively
 */
export interface Tick {
  attemptType?: InputMaybe<Scalars['String']['input']>
  climbId: Scalars['String']['input']
  dateClimbed: Scalars['Date']['input']
  grade: Scalars['String']['input']
  name: Scalars['String']['input']
  notes?: InputMaybe<Scalars['String']['input']>
  source: TickSource
  style?: InputMaybe<Scalars['String']['input']>
  userId: Scalars['String']['input']
}

/** Takes in the MongoId and a tick object to replace the old tick object with */
export interface TickFilter {
  _id: Scalars['ID']['input']
  updatedTick?: InputMaybe<Tick>
}

/** The tick sources that openbeta supports. */
export enum TickSource {
  /** MountainProject (imported tick) */
  Mp = 'MP',
  /** OpenBeta (native tick) */
  Ob = 'OB'
}

/**
 * This is our tick type, containing the name, notes climbId,
 * etc of the ticked climb NOTE: source must either be MP or OB
 * which stand for Mountain Project, or Open Beta respectively
 */
export interface TickType {
  __typename?: 'TickType'
  _id?: Maybe<Scalars['ID']['output']>
  /**
   * Describe the type of successful attempt that was made here.
   * Fell/Hung, Flash, Redpoint, Onsight, would be examples of values you might find here.
   * This is again a free-form field. Data of practically any descriptive nature may find
   * itself here.
   */
  attemptType?: Maybe<Scalars['String']['output']>
  /**
   * Which climb is ascociated with this tick? There is weak-relationship between this ID
   * and a climb document in the climbs collection. This is because we support importing
   * climbs from external sources, and we may not have a climb document for every climb
   *
   * When source is OpenBeta, this can be understood as a foreign key to the climbs collection uuid.
   */
  climbId?: Maybe<Scalars['String']['output']>
  /**
   * Not the same as date created. Ticks can be back-filled by the user, and do
   * not need to be logged at the time that the tick is created inside the mongo
   * database.
   * This is a string because we do not enforce any particular date format at this time.
   */
  dateClimbed?: Maybe<Scalars['Date']['output']>
  /**
   * What grade is this tick ascociated with?
   * This exists in the tick document both for easy-fetching and to ensure
   * proper operation when importing ticks for entities that cannot be located
   * within OpenBeta's database.
   */
  grade?: Maybe<Scalars['String']['output']>
  /**
   * The name of this climb.
   *
   * When the tick is imported from an external data source, there is no relational guarentee,
   * and as such we need this field filled out to be able to display the name of the climb.
   *
   * Native ticks may have this field enforced against the climb that it relates to.
   * If the name changes in its related climb document, the value stored here may be back-updated
   * to reflect the new name.
   */
  name?: Maybe<Scalars['String']['output']>
  /**
   * freeform text field that a user fills out as commentary on this tick. This unstructured data
   * is one of the most important ones on the tick, as users may give their human opinion on the
   * climb attempt that they made.
   *
   * Sandbagged, Chipped, bad conditions, may all be examples of notes that a user may submit to accompany
   * the tick.
   */
  notes?: Maybe<Scalars['String']['output']>
  source?: Maybe<TickSource>
  /**
   * Arbitrary string that represents the style of the climb.
   * Lead, toprope, bouldering, would be examples of values you might find here.
   * If this is a native tick, you can enforce updated values here by referencing
   * the climb document (climbId -> climbs:uuid)
   */
  style?: Maybe<Scalars['String']['output']>
  /** User that this tick belongs to  */
  userId?: Maybe<Scalars['String']['output']>
}

/** Create/update climbs input parameter. */
export interface UpdateClimbsInput {
  /** Array of change records */
  changes?: InputMaybe<Array<InputMaybe<SingleClimbChangeInput>>>
  /** Parent area ID */
  parentId: Scalars['ID']['input']
}

export interface UpdateDescription {
  __typename?: 'UpdateDescription'
  updatedFields?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export interface UserIdInput {
  userUuid: Scalars['ID']['input']
}

/**
 * User media cursor with pagination support.
 * See https://graphql.org/learn/pagination/
 */
export interface UserMedia {
  __typename?: 'UserMedia'
  mediaConnection: MediaConnection
  userUuid: Scalars['ID']['output']
}

/** Input parameters for user media queries. */
export interface UserMediaInput {
  /** Returning page data after this cursor (exclusive).  Return the first page if omitted. */
  after?: InputMaybe<Scalars['ID']['input']>
  /** Number of objects per page (Default = 6). */
  first?: InputMaybe<Scalars['Int']['input']>
  /** Max number of objects return.  Ignore when using with pagination query. */
  maxFiles?: InputMaybe<Scalars['Int']['input']>
  /** User UUID.  Ex: a0ca9ebb-aa3b-4bb0-8ddd-7c8b2ed228a5 */
  userUuid: Scalars['ID']['input']
}

export interface UserProfileInput {
  avatar?: InputMaybe<Scalars['String']['input']>
  bio?: InputMaybe<Scalars['String']['input']>
  displayName?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  userUuid: Scalars['ID']['input']
  username?: InputMaybe<Scalars['String']['input']>
  website?: InputMaybe<Scalars['String']['input']>
}

export interface UserPublicPage {
  __typename?: 'UserPublicPage'
  media?: Maybe<UserMedia>
  profile?: Maybe<UserPublicProfile>
}

export interface UserPublicProfile {
  __typename?: 'UserPublicProfile'
  avatar?: Maybe<Scalars['String']['output']>
  bio?: Maybe<Scalars['String']['output']>
  displayName?: Maybe<Scalars['String']['output']>
  userUuid: Scalars['ID']['output']
  username: Scalars['String']['output']
  website?: Maybe<Scalars['String']['output']>
}

/** Username detail object */
export interface UsernameDetail {
  __typename?: 'UsernameDetail'
  lastUpdated?: Maybe<Scalars['Date']['output']>
  userUuid: Scalars['ID']['output']
  username?: Maybe<Scalars['String']['output']>
}

export interface UsernameInput {
  username: Scalars['String']['input']
}

/** XMedia is created as a result of a new Post. They are a child of Post documents. */
export interface XMedia {
  __typename?: 'XMedia'
  _id?: Maybe<Scalars['ID']['output']>
  mediaType: Scalars['Int']['output']
  mediaUrl: Scalars['String']['output']
  tagIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>
  userId: Scalars['ID']['output']
}
