import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import User from './models/userModel.js';
import Conversation from './models/conversationModel.js';

import userRoutes from './routes/userRoutes.js';
import chatRoomRoutes from './routes/chatRoomRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/chatrooms', chatRoomRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

///////////////////////////////////////////////////////////////////
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  try {
    const userId = socket.handshake.query.userId;

    socket.userId = userId;
    next();
  } catch (err) {}
});

// io.on('connection', (socket) => {
//   socket.broadcast.emit('message', 'A user has joined the chat');
//   socket.on('disconnect', () => {
//     io.emit('message', 'A user just disconnected');
//   });

//   socket.on('chatMessage', async (newMessage, chatRoomId) => {
//     if (newMessage) {
//       const user = await User.findById(socket.userId);

//       const message = new Conversation({
//         user: user,
//         chatRoom: newMessage.chatRoomId,
//         message: newMessage.newMessage,
//       });
//       io.emit('newMessage', {
//         message: newMessage.newMessage,
//         name: user.name,
//         userId: socket.userId,
//       });
//       await message.save();
//     }
//   });
// });

io.on('connection', (socket) => {
  socket.on('join', ({ roomId }) => {
    socket.emit('message', {
      user: 'admin',
      text: `Welcome to the room ${socket.userName}`,
    });
    socket.broadcast.to(roomId).emit('message', {
      user: 'admin',
      text: `${socket.userName}, has joined`,
    });
    socket.join(roomId);
  });
  socket.on('sendMessage', (message, callback) => {
    io.to(roomId).emit('message', { user: socket.userName, text: message });
    callback();
  });
  socket.on('disconnect', () => {
    console.log('user had left');
  });
});

httpServer.listen(PORT);
