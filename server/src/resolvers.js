import firebase from 'firebase-admin'

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
    signInWithSocial: async (_, { token }, { User }) => {
      try {
        const fbUser = await firebase.auth().verifyIdToken(token)
        const userModel = transformFbUser(fbUser)
        const dbUser = await User.findOne({ userId: userModel.userId })

        if (dbUser) {
          console.log('TCL: dbUser', {
            ...dbUser.toObject(),
            token,
            banana: 'Banana'
          })
          return {
            ...dbUser.toObject(),
            token,
            banana: 'Banana'
          }
        }

        const newUser = await new User(userModel).save()
        console.log('TCL: newUser', { ...newUser.toObject(), token })

        return { ...newUser.toOject(), token, banana: 'banana' }
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

function transformFbUser(fbUser) {
  return {
    userId: fbUser.user_id,
    userName: fbUser.name,
    email: fbUser.email,
    emailVerified: fbUser.emailVerified,
    password: null,
    avatar: fbUser.picture
  }

  // name: 'Guilherme Waess',
  // picture:
  //  'https://lh4.googleusercontent.com/-sqjrYSm_5Do/AAAAAAAAAAI/AAAAAAAAAqw/NBWr1a4cDPI/photo.jpg',
  // iss: 'https://securetoken.google.com/vue-gql-guiwaess',
  // aud: 'vue-gql-guiwaess',
  // auth_time: 1558626982,
  // user_id: 'sSUrLYbfTISNLPpAzDZLOH0AnsX2',
  // sub: 'sSUrLYbfTISNLPpAzDZLOH0AnsX2',
  // iat: 1558626982,
  // exp: 1558630582,
  // email: 'guilherme.waess@gmail.com',
  // email_verified: true,
  // firebase:
  //  { identities: { 'google.com': [Array], email: [Array] },
  //    sign_in_provider: 'google.com' },
  // uid: 'sSUrLYbfTISNLPpAzDZLOH0AnsX2'
}
