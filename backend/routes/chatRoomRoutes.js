import express from 'express';
import {
  createChatRoom,
  getAllChatRoom,
} from '../controller/chatRoomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createChatRoom);
router.get('/', protect, getAllChatRoom);

export default router;
