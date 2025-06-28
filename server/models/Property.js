import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  images: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Property', propertySchema);