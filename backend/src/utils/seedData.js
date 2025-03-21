import mongoose from 'mongoose';
import Luggage from '../models/Luggage.js';
import dotenv from 'dotenv';

dotenv.config();

// Sample luggage data
const luggageData = [
  {
    type: 'suitcase',
    color: 'black',
    brand: 'Samsonite',
    description: 'Large black suitcase with red tag',
    status: 'lost',
    location: 'Terminal 2, Gate B',
    dateFound: new Date('2025-03-15'),
    contactInfo: {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john@example.com'
    },
    images: ['https://example.com/image1.jpg'],
  },
  {
    type: 'backpack',
    color: 'blue',
    brand: 'North Face',
    description: 'Blue backpack with laptop compartment',
    status: 'found',
    location: 'Terminal 1, Baggage Claim',
    dateFound: new Date('2025-03-18'),
    contactInfo: {
      name: 'Airport Lost & Found',
      phone: '+1987654321',
      email: 'lostandfound@airport.com'
    },
    images: ['https://example.com/image2.jpg'],
  },
  {
    type: 'handbag',
    color: 'brown',
    brand: 'Coach',
    description: 'Brown leather handbag with gold hardware',
    status: 'found',
    location: 'Terminal 3, Food Court',
    dateFound: new Date('2025-03-19'),
    contactInfo: {
      name: 'Airport Security',
      phone: '+1122334455',
      email: 'security@airport.com'
    },
    images: ['https://example.com/image3.jpg'],
  },
  {
    type: 'other',
    color: 'green',
    brand: 'Adidas',
    description: 'Green duffel bag with white stripes',
    status: 'lost',
    location: 'Terminal 1, Gate A',
    dateFound: new Date('2025-03-17'),
    contactInfo: {
      name: 'Jane Smith',
      phone: '+1567890123',
      email: 'jane@example.com'
    },
    images: ['https://example.com/image4.jpg'],
  },
  {
    type: 'other',
    color: 'black',
    brand: 'Tumi',
    description: 'Black leather briefcase with combination lock',
    status: 'found',
    location: 'Terminal 2, Security Checkpoint',
    dateFound: new Date('2025-03-20'),
    contactInfo: {
      name: 'Airport Lost & Found',
      phone: '+1987654321',
      email: 'lostandfound@airport.com'
    },
    images: ['https://example.com/image5.jpg'],
  },
  {
    type: 'suitcase',
    color: 'red',
    brand: 'American Tourister',
    description: 'Red hard-shell suitcase with black wheels',
    status: 'lost',
    location: 'Terminal 3, Baggage Claim',
    dateFound: new Date('2025-03-16'),
    contactInfo: {
      name: 'Michael Brown',
      phone: '+1345678912',
      email: 'michael@example.com'
    },
    images: ['https://example.com/image6.jpg'],
  },
  {
    type: 'backpack',
    color: 'black',
    brand: 'Herschel',
    description: 'Black backpack with leather bottom',
    status: 'found',
    location: 'Terminal 1, Coffee Shop',
    dateFound: new Date('2025-03-21'),
    contactInfo: {
      name: 'Airport Lost & Found',
      phone: '+1987654321',
      email: 'lostandfound@airport.com'
    },
    images: ['https://example.com/image7.jpg'],
  },
  {
    type: 'handbag',
    color: 'beige',
    brand: 'Longchamp',
    description: 'Beige nylon tote bag with brown handles',
    status: 'lost',
    location: 'Terminal 2, Restroom',
    dateFound: new Date('2025-03-22'),
    contactInfo: {
      name: 'Susan Wilson',
      phone: '+1678901234',
      email: 'susan@example.com'
    },
    images: ['https://example.com/image8.jpg'],
  },
  {
    type: 'other',
    color: 'navy',
    brand: 'Nike',
    description: 'Navy blue duffel bag with white logo',
    status: 'found',
    location: 'Terminal 3, Gate C',
    dateFound: new Date('2025-03-23'),
    contactInfo: {
      name: 'Airport Security',
      phone: '+1122334455',
      email: 'security@airport.com'
    },
    images: ['https://example.com/image9.jpg'],
  },
  {
    type: 'suitcase',
    color: 'silver',
    brand: 'Rimowa',
    description: 'Silver aluminum suitcase with TSA lock',
    status: 'lost',
    location: 'Terminal 1, Baggage Claim',
    dateFound: new Date('2025-03-24'),
    contactInfo: {
      name: 'David Johnson',
      phone: '+1890123456',
      email: 'david@example.com'
    },
    images: ['https://example.com/image10.jpg'],
  }
];

// Function to seed the database
const seedLuggageData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete existing luggage data
    const deleteResult = await Luggage.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing luggage items`);
    
    // Insert new luggage data one by one
    console.log('Inserting luggage items:');
    for (let i = 0; i < luggageData.length; i++) {
      const item = luggageData[i];
      try {
        const newLuggage = new Luggage(item);
        await newLuggage.save();
        console.log(`✅ Inserted item ${i+1}: ${item.type} - ${item.color} ${item.brand}`);
      } catch (itemError) {
        console.error(`❌ Error inserting item ${i+1}:`, itemError.message);
      }
    }
    
    // Get count of inserted items
    const count = await Luggage.countDocuments();
    console.log(`Total luggage items in database: ${count}`);
    
    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeding function
seedLuggageData(); 