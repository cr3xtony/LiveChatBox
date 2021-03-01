import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const chatRoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;
