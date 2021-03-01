import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
      required: true,
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
