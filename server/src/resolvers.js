import { UserService } from './services/user-service'
import { Post } from './models'
import { PostService } from './services/post.service'

export const resolvers = {
  Query: {
    getPosts: (_, __) => {
      return PostService.getAllPosts()
    },
    getPost: (_, { postId }) => {
      return PostService.getPost({ _id: postId })
    },
    getUser: (_, __, { currentUser }) => {
      return currentUser
    },
    getUserPosts: (_, __, { currentUser }) => {
      return PostService.getAllFromUserId(currentUser._id)
    },
    infiniteScrollPosts: async (_, { pagination: { pageNum, pageSize } }) => {
      let posts
      if (pageNum === 1) {
        posts = await PostService.getAllPosts().limit(pageSize)
      } else {
        const skips = pageSize * (pageNum - 1)
        posts = await PostService.getAllPosts()
          .skip(skips)
          .limit(pageSize)
      }
      const totalDocs = await Post.countDocuments()

      const hasMore = totalDocs > pageSize * pageNum

      return { posts, hasMore }
    },
    searchPosts: async (_, { searchTerm }) => {
      return PostService.searchPosts(searchTerm)
    }
  },
  Mutation: {
    addPost: (_, { post }, { currentUser }) => {
      return PostService.createPost({
        title: post.title,
        imgUrl: post.imgUrl,
        categories: post.categories,
        description: post.description,
        createdBy: currentUser._id
      })
    },
    addPostMessage: (_, { postMessage }, { currentUser }) => {
      const newMessage = {
        messageBody: postMessage.messageBody,
        messageUser: currentUser._id
      }

      return PostService.addMessageOnPost(postMessage.postId, newMessage)
    },
    updatePost: async (_, { post }, { currentUser }) => {
      const result = await PostService.updatePost(post, currentUser)
      return result
    },
    likePost: async (_, { postId }, { currentUser }) => {
      const post = await PostService.changeLikesCount(postId, 1)
      const user = await UserService.changeFavorite(postId, currentUser, true)

      return { likes: post.likes, favorites: user.favorites }
    },
    unlikePost: async (_, { postId }, { currentUser }) => {
      const post = await PostService.changeLikesCount(postId, -1)
      const user = await UserService.changeFavorite(postId, currentUser, false)

      return { likes: post.likes, favorites: user.favorites }
    },
    deletePost: async (_, { postId }) => {
      return PostService.deletePost(postId)
    },
    signInWithSocial: async (_, { token }) => {
      try {
        const user = await UserService.createOrGetUserFromSocial(token)
        return user
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
