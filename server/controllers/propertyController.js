import Property from '../models/Property.js';
import User from '../models/User.js';
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
    const user = await User.findById(req.user.id); // assuming req.user from auth middleware
      res.json({
        properties,
        userBookmarks: user.bookmarks || [],
      });
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

export const bookMarkProperty = async (req, res) => {
 const user = await User.findById(req.user.id);
  const propertyId = req.params.id;

  const index = user.bookmarks.indexOf(propertyId);
  if (index === -1) {
    user.bookmarks.push(propertyId);
  } else {
    user.bookmarks.splice(index, 1);
  }

  await user.save();
  res.json({ bookmarks: user.bookmarks });
};

export const giveRatingToProperty = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const userId = req.user._id?.toString(); // Ensure this is a string

  const property = await Property.findById(id);
  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }

  const existing = property.ratings.find(
    (r) => r.user?.toString() === userId
  );

  if (existing) {
    existing.value = value;
  } else {
    property.ratings.push({ user: req.user._id, value });
  }

  await property.save();

  const totalRatings = property.ratings.length;
  const averageRating =
    property.ratings.reduce((sum, r) => sum + r.value, 0) / totalRatings;

  res.json({
    message: 'Rating submitted',
    property: {
      _id: property._id,
      averageRating,
      totalRatings,
    },
  });
};



