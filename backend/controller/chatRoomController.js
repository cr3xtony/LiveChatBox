import asyncHandler from 'express-async-handler';
import ChatRoom from '../models/chatRoomModel.js';

const createChatRoom = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const nameExist = await ChatRoom.findOne({ name });
  if (nameExist) {
    res.status(400);
    throw new Error('Chat Room Name Already Exist');
  }

  try {
    const chatRoom = await ChatRoom.create({
      name,
    });
    if (chatRoom) {
      res.status(201).json({
        message: 'Chat Room Created SuccessFully',
      });
    } else {
      res.status(400);
      throw new Error('Invalid Chat Room');
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

const getAllChatRoom = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.find({});
  res.json(chatRoom);
});

const getChatRoomById = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.findById(req.params.id);
  res.json(chatRoom);
});

export { getAllChatRoom, createChatRoom, getChatRoomById };
