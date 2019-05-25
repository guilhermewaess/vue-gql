import { User } from '../models'

export class UserService {
  static async GetUser(userProperties) {
    return User.findOne(userProperties)
  }

  static async createNewUser(userObject) {
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

    // fbUser
    // name picture https iss aud auth_time user_id sub iat exp email email_verified
    // firebase { identities: { 'google.com': [Array], email: [Array] }, sign_in_provider uid
  }
}
