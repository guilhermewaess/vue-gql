import { Post } from '../models'

export class PostService {
  static getAllPosts() {
    return Post.find({})
      .sort({ createdDate: 'desc' })
      .populate({
        path: 'createdBy',
        model: 'User'
      })
  }

  static getPost(filter) {
    return Post.findOne(filter).populate({
      path: 'messages.messageUser',
      model: 'User'
    })
  }

  static createPost(post) {
    return new Post(post).save()
  }

  static addMessageOnPost(postId, message) {
    return Post.findOneAndUpdate(
      { _id: postId },
      // prepend new message
      { $push: { messages: { $each: [message], $position: 0 } } },
      // return updated document
      { new: true }
    ).populate({
      path: 'messages.messageUser',
      model: 'User'
    })[0]
  }

  static changeLikesCount(postId, count) {
    return Post.findByIdAndUpdate(
      { _id: postId },
      { $inc: { likes: count } },
      { new: true }
    )
  }
}
