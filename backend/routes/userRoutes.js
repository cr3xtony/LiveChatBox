import express from 'express';

import {
  authUser,
  registerUser,
  getAllUsers,
  getUserById,
} from '../controller/userController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.route('/').post(registerUser).get(protect, getAllUsers);

router
  .route('/:id')

  .get(protect, getUserById);

export default router;
