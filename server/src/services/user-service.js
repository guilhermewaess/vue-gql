import firebase from 'firebase-admin'
import { User } from '../models'

export class UserService {
  static async getUser(userProperties) {
    return User.findOne(userProperties).populate({
      path: 'favorites',
      model: 'Post'
    })
  }

  static async createNewUserFromFirebase(userObject) {
    return new User(userObject).save()
  }

  static transformFirebaseUserInUserModel(fbUser) {
    return {
      userId: fbUser.user_id,
      userName: fbUser.name,
      email: fbUser.email,
      emailVerified: fbUser.emailVerified,
      password: null,
      avatar: fbUser.picture
    }

    /* fbUser
     name picture https iss aud auth_time user_id sub iat exp email email_verified
     firebase { identities: { 'google.com': [Array], email: [Array] }, sign_in_provider uid
    */
  }

  static async getUserFromToken(token) {
    try {
      const fbUser = await firebase.auth().verifyIdToken(token, true)
      const user = await UserService.getUser({ userId: fbUser.user_id })
      return user
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static async createOrGetUserFromSocial(token) {
    const fbUser = await firebase.auth().verifyIdToken(token, true)
    const userModel = UserService.transformFirebaseUserInUserModel(fbUser)
    const user = await UserService.getUser({ userId: userModel.userId })

    if (user) {
      return user
    }

    const newUser = await UserService.createNewUser(userModel)
    return newUser
  }

  static async changeFavorite(postId, currentUser, isNewFavorite) {
    const operation = isNewFavorite
      ? { $addToSet: { favorites: postId } }
      : { $pull: { favorites: postId } }

    return User.findOneAndUpdate({ userId: currentUser.userId }, operation, {
      new: true
    }).populate({ path: 'favorites', model: 'Post' })
  }
}
