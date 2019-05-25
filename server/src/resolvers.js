import firebase from 'firebase-admin'
import { UserService } from './services/user-service'

export const resolvers = {
  Query: {
    getPosts: async (_, __, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        })

      return posts
    },
    getUser: () => null,
    validateToken: async (_, { token }) => {
      try {
        const fbUser = await firebase.auth().verifyIdToken(token, true)
        const userModel = UserService.transformFirebaseUserInUserModel(fbUser)
        const user = await UserService.GetUser({ userId: userModel.userId })
        return user
      } catch (error) {
        throw new Error('Fail on token verification')
      }
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imgUrl, categories, description, createdBy },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imgUrl,
        categories,
        description,
        createdBy
      }).save()

      return newPost
    },
    signInWithSocial: async (_, { token }) => {
      try {
        const fbUser = await firebase.auth().verifyIdToken(token, true)
        const userModel = UserService.transformFirebaseUserInUserModel(fbUser)
        const user = await UserService.GetUser({ userId: userModel.userId })

        if (user) {
          return user
        }

        const newUser = await UserService.createNewUser(userModel)
        return newUser
      } catch (error) {
        console.error(error)
        throw new Error('Failed on get user information')
      }
    },
    signUpUser: async (_, { userName, email, password }, { User }) => {
      const user = await User.findOne({ userName })
      if (user) {
        throw new Error('User already exists')
      }

      const newUser = await new User({
        userName,
        email,
        password
      }).save()

      return newUser
    }
  }
}
