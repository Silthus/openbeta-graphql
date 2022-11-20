import muid from 'uuid-mongodb'
import { UserInputError } from 'apollo-server'

// import { MediaType, RefModelType } from '../../db/MediaTypes.js'
import { getPostModel, getClimbModel } from '../../db/index.js'
import { PostType, PostInputType } from '../../db/PostTypes.js'

const isValidClimb = async (destinationId: muid.MUUID): Promise<Boolean> => {
  const climb = await getClimbModel().exists({
    _id: muid.from(destinationId)
  })
  if (climb == null) {
    throw new UserInputError(
      `Climb with id: ${destinationId.toString()} doesn't exist`
    )
  }
  return true
}

const PostMutations = {
  createPost: async (_, { input }) => {
    // console.log('input from createPost', input)
    const {
      media,
      createdAt,
      description,
      userId,
      destinationIds
    }: PostInputType = input

    // initially updatedAt is same as creation time
    const updatedAt = createdAt

    // 1) Ensure each photo's destination exists
    // 2) Ensure userId exists
    // 3) add to DB

    const doc: PostType = {
      media,
      description,
      createdAt,
      updatedAt,
      userId,
      comments: [],
      destinationIds
    }
    // console.log('new doc', doc)

    const PostModel = getPostModel()

    try {
      // Check whether the climb referenced this tag exists before we allow
      // the tag to be added
      if (destinationIds != null) {
        for (const item of destinationIds) {
          await isValidClimb(item)
        }
      }

      const res = await PostModel.create({ ...doc }, function (err) {
        if (err !== null) {
          console.error(err)
        } else {
          console.log('SAVED NEW POST')
        }
        // saved!
      })
      console.log('res', res)
      return res
    } catch (e) {
      if (e.code === 11000) {
        throw new UserInputError('Duplicated mediaUuid and destinationId')
      }
      throw e
    }
  }

  // removeTag: async (_, { mediaUuid, destinationId }) => {
  //   const rs = await getMediaModel().deleteOne({
  //     mediaUuid: muid.from(mediaUuid),
  //     destinationId: muid.from(destinationId)
  //   })
  //   if (rs?.deletedCount === 1)
  //     return { mediaUuid, destinationId, removed: true }
  //   return { mediaUuid, destinationId, removed: false }
  // }
}

export default PostMutations
