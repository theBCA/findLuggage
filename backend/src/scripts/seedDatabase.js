import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Luggage from '../models/luggage.js';
import User from '../models/user.js';

dotenv.config();

const sampleUsers = [
  {
    email: 'john.doe@example.com',
    password: 'password123',
    name: 'John Doe',
    phone: '+1234567890',
    role: 'user'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    phone: '+1987654321',
    role: 'admin'
  },
  {
    email: 'sarah.smith@example.com',
    password: 'password123',
    name: 'Sarah Smith',
    phone: '+1122334455',
    role: 'user'
  },
  {
    email: 'mike.wilson@example.com',
    password: 'password123',
    name: 'Mike Wilson',
    phone: '+1555666777',
    role: 'user'
  }
];

const sampleLuggage = [
  {
    reportNumber: 'LUG-2024-001',
    description: 'Black Samsonite suitcase with red handle',
    color: 'Black',
    brand: 'Samsonite',
    size: 'large',
    lastSeen: {
      location: 'JFK Airport Terminal 4',
      date: new Date('2024-03-01'),
      details: 'Left at baggage claim area'
    },
    images: ['https://example.com/luggage1.jpg'],
    additionalDetails: 'Has a small dent on the right side',
    tags: ['suitcase', 'business', 'black'],
    status: 'lost'
  },
  {
    reportNumber: 'LUG-2024-002',
    description: 'Blue backpack with laptop compartment',
    color: 'Blue',
    brand: 'North Face',
    size: 'medium',
    lastSeen: {
      location: 'LAX Airport Terminal 7',
      date: new Date('2024-03-02'),
      details: 'Forgotten at security checkpoint'
    },
    images: ['https://example.com/luggage2.jpg'],
    additionalDetails: 'Contains MacBook Pro and work documents',
    tags: ['backpack', 'laptop', 'electronics'],
    status: 'found'
  },
  {
    reportNumber: 'LUG-2024-003',
    description: 'Red rolling duffel bag',
    color: 'Red',
    brand: 'Tumi',
    size: 'medium',
    lastSeen: {
      location: 'ORD Airport Terminal 3',
      date: new Date('2024-03-03'),
      details: 'Left at baggage carousel'
    },
    images: ['https://example.com/luggage3.jpg'],
    additionalDetails: 'Has a distinctive yellow tag',
    tags: ['duffel', 'rolling', 'red'],
    status: 'lost'
  },
  {
    reportNumber: 'LUG-2024-004',
    description: 'Green hiking backpack',
    color: 'Green',
    brand: 'Osprey',
    size: 'large',
    lastSeen: {
      location: 'SEA Airport Terminal 2',
      date: new Date('2024-03-04'),
      details: 'Found at lost and found office'
    },
    images: ['https://example.com/luggage4.jpg'],
    additionalDetails: 'Contains camping gear and hiking boots',
    tags: ['backpack', 'hiking', 'outdoor'],
    status: 'found'
  },
  {
    reportNumber: 'LUG-2024-005',
    description: 'Silver hard-shell suitcase',
    color: 'Silver',
    brand: 'Rimowa',
    size: 'large',
    lastSeen: {
      location: 'MIA Airport Terminal 1',
      date: new Date('2024-03-05'),
      details: 'Left at baggage claim'
    },
    images: ['https://example.com/luggage5.jpg'],
    additionalDetails: 'Has a distinctive sticker collection',
    tags: ['suitcase', 'hard-shell', 'silver'],
    status: 'lost'
  },
  {
    reportNumber: 'LUG-2024-006',
    description: 'Brown leather briefcase',
    color: 'Brown',
    brand: 'Coach',
    size: 'small',
    lastSeen: {
      location: 'DFW Airport Terminal D',
      date: new Date('2024-03-06'),
      details: 'Found at security checkpoint'
    },
    images: ['https://example.com/luggage6.jpg'],
    additionalDetails: 'Contains important business documents',
    tags: ['briefcase', 'leather', 'business'],
    status: 'found'
  },
  {
    reportNumber: 'LUG-2024-007',
    description: 'Pink rolling suitcase',
    color: 'Pink',
    brand: 'American Tourister',
    size: 'medium',
    lastSeen: {
      location: 'SFO Airport Terminal 3',
      date: new Date('2024-03-07'),
      details: 'Left at baggage claim area'
    },
    images: ['https://example.com/luggage7.jpg'],
    additionalDetails: 'Has a Hello Kitty sticker',
    tags: ['suitcase', 'rolling', 'pink'],
    status: 'lost'
  },
  {
    reportNumber: 'LUG-2024-008',
    description: 'Black laptop bag',
    color: 'Black',
    brand: 'Targus',
    size: 'small',
    lastSeen: {
      location: 'BOS Airport Terminal A',
      date: new Date('2024-03-08'),
      details: 'Found at gate area'
    },
    images: ['https://example.com/luggage8.jpg'],
    additionalDetails: 'Contains Dell XPS laptop',
    tags: ['laptop', 'electronics', 'black'],
    status: 'found'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lostLuggage');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Luggage.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = await User.create(sampleUsers);
    console.log('Created users:', users.length);

    // Create luggage items with owner references
    const luggageItems = await Luggage.create(
      sampleLuggage.map((item, index) => ({
        ...item,
        owner: users[index % users.length]._id
      }))
    );
    console.log('Created luggage items:', luggageItems.length);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 