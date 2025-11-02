const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(express.json());
app.use(cors());

// Database connection


// Example route
app.get('/', (req, res) => {
    res.send('Chatroom server is running');
});
// Auth routes
const authRoutes = require('./routes/authroutes');
app.use('/api/v1/auth', authRoutes);

// User routes
const userRoutes = require('./routes/userroutes');
app.use('/api/v1/user', userRoutes);

// Room routes
const roomRoutes = require('./routes/roomroutes');
app.use('/api/v1/room', roomRoutes);

// Message routes
const messageRoutes = require('./routes/messageroutes');
app.use('/api/v1/message', messageRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  // console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    // Broadcast to all users in the room
    io.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    // console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});