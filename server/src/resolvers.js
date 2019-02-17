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
    getUser: () => null
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
