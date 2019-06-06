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
    getUser: (_, __, { currentUser }) => {
      return currentUser
    },
    infiniteScrollPosts: async (
      _,
      { pagination: { pageNum, pageSize } },
      { Post }
    ) => {
      console.log('TCL: pageNum, pageSize', { pageNum, pageSize })
      console.log('===============================================')
      let posts
      if (pageNum === 1) {
        posts = Post.find({})
          .sort({ createdDate: 'desc' })
          .populate({
            path: 'createdBy',
            model: 'User'
          })
          .limit(pageSize)
      } else {
        const skips = pageSize * (pageNum - 1)
        posts = Post.find({})
          .sort({ createdDate: 'desc' })
          .populate({
            path: 'createdBy',
            model: 'User'
          })
          .skip(skips)
          .limit(pageSize)
      }
      const totalDocs = await Post.countDocuments()

      const hasMore = totalDocs > pageSize * pageNum

      return { posts, hasMore }
    }
  },
  Mutation: {
    addPost: async (_, { post }, { Post, currentUser }) => {
      console.log('Post', { post })
      const newPost = await new Post({
        title: post.title,
        imgUrl: post.imgUrl,
        categories: post.categories,
        description: post.description,
        createdBy: currentUser._id
      }).save()

      return newPost
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
