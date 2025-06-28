import Property from '../models/Property.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const createProperty = async (req, res) => {
  try {
    const image = await uploadToCloudinary(req.file.path);
    const property = new Property({ ...req.body, images: [image], createdBy: req.user.id });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const image = req.file ? await uploadToCloudinary(req.file.path) : null;
    const updateData = { ...req.body };
    if (image) updateData.images = [image];
    const property = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};