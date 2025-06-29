import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =  process.env.MONGODB_URI || 'mongodb://localhost:27017/rental-app';

const allowedOrigins = [
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
});
