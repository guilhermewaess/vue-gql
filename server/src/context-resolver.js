import { UserService } from './services/user-service'
import { Post, User } from './models'

export async function contextResolver({ req }) {
  const token = req.headers['authorization']
  let currentUser = null

  if (token) {
    currentUser = await UserService.getUserFromToken(token)
  }

  return {
    User,
    Post,
    currentUser
  }
}
