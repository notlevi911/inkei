import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// In-memory chat state
const chatRooms = {};
const adminRooms = new Set(['admin-lounge', 'ceo-chat']); // 👈 define admin-only rooms

io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on('joinRoom', ({ roomId, user, role }) => {
    // 👮 Admin check
    if (adminRooms.has(roomId) && role !== 'CEO') {
      socket.emit('notification', `Access denied: '${roomId}' is an admin-only room`);
      return;
    }

    socket.join(roomId);
    if (!chatRooms[roomId]) chatRooms[roomId] = [];

    socket.to(roomId).emit('notification', `${user} joined ${roomId}`);
    socket.emit('chatHistory', chatRooms[roomId]);
  });

  socket.on('sendMessage', ({ roomId, user, message }) => {
    // 💥 Ensure room is initialized
    if (!chatRooms[roomId]) {
      chatRooms[roomId] = []; // prevent crash
    }

    const chat = { user, message, timestamp: new Date().toISOString() };
    chatRooms[roomId].push(chat);

    io.to(roomId).emit('receiveMessage', chat);
  });

  socket.on('leaveRoom', ({ roomId, user }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('notification', `${user} left ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI is not defined in your .env file.');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  server.listen(5000, () => {
    console.log('🚀 Server is running on port 5000 with Socket.IO');
  });
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
