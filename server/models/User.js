import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

export default mongoose.model('User', userSchema);