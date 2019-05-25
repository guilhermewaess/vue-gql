import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Post'
  }
})

export const User = model('User', UserSchema)
