import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';

import userRoutes from './routes/userRoutes.js';
import chatRoomRoutes from './routes/chatRoomRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/chatrooms', chatRoomRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${process.env.PORT}`));
