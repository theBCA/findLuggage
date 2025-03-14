import mongoose from 'mongoose';

const luggageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['suitcase', 'backpack', 'handbag', 'other']
  },
  color: {
    type: String,
    required: true
  },
  brand: String,
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['lost', 'found', 'claimed'],
    default: 'lost'
  },
  location: {
    type: String,
    required: true
  },
  dateFound: {
    type: Date,
    required: true
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  images: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a text index for search functionality
luggageSchema.index({
  description: 'text',
  color: 'text',
  brand: 'text',
  location: 'text',
});

export default mongoose.model('Luggage', luggageSchema); 