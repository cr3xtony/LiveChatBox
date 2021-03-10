import express from 'express';

import {
  createChatRoom,
  getAllChatRoom,
  getChatRoomById,
} from '../controller/chatRoomController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createChatRoom);
router.get('/', protect, getAllChatRoom);
router.get('/:id', protect, getChatRoomById);

export default router;
