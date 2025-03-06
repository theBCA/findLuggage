import mongoose from 'mongoose';

const luggageSchema = new mongoose.Schema({
  reportNumber: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['lost', 'found', 'claimed'],
    default: 'lost',
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  brand: String,
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  lastSeen: {
    location: String,
    date: Date,
  },
  images: [{
    type: String, // URL to the image
  }],
  additionalDetails: String,
  tags: [String],
}, {
  timestamps: true,
});

// Create a text index for search functionality
luggageSchema.index({
  description: 'text',
  color: 'text',
  brand: 'text',
  'lastSeen.location': 'text',
  tags: 'text',
});

export default mongoose.model('Luggage', luggageSchema); 