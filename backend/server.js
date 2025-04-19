import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Check if MONGODB_URI exists
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('❌ MONGO_URI is not defined in your .env file.');
  process.exit(1);
}

// Connect to MongoDB and start the server
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => {
    console.log('🚀 Server is running on port 5000');
  });
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
