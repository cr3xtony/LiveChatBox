import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
    message: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
