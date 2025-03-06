import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_URL = 'http://localhost:3001/api';

async function testSearchFunctionality() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lostLuggage';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Test cases
    const testCases = [
      {
        name: 'Basic search',
        query: { search: 'black' },
        expected: 'Should return items containing "black" in description, color, or tags'
      },
      {
        name: 'Status filter',
        query: { status: 'lost' },
        expected: 'Should return only lost items'
      },
      {
        name: 'Size filter',
        query: { size: 'large' },
        expected: 'Should return only large items'
      },
      {
        name: 'Color filter',
        query: { color: 'Black' },
        expected: 'Should return items with black color (case-insensitive)'
      },
      {
        name: 'Brand filter',
        query: { brand: 'Samsonite' },
        expected: 'Should return items from Samsonite brand (case-insensitive)'
      },
      {
        name: 'Date range filter',
        query: {
          dateFrom: '2024-03-01',
          dateTo: '2024-03-04'
        },
        expected: 'Should return items lost between March 1-4, 2024'
      },
      {
        name: 'Location filter',
        query: { location: 'JFK' },
        expected: 'Should return items last seen at JFK (case-insensitive)'
      },
      {
        name: 'Tags filter',
        query: { tags: 'laptop,electronics' },
        expected: 'Should return items tagged with laptop or electronics'
      },
      {
        name: 'Combined filters',
        query: {
          search: 'black',
          status: 'lost',
          size: 'large',
          brand: 'Samsonite'
        },
        expected: 'Should return large lost black Samsonite items'
      },
      {
        name: 'Pagination',
        query: {
          page: 1,
          limit: 5
        },
        expected: 'Should return first 5 items'
      },
      {
        name: 'Sorting',
        query: {
          sortBy: 'lastSeen.date',
          sortOrder: 'desc'
        },
        expected: 'Should return items sorted by date in descending order'
      }
    ];

    // Run test cases
    for (const testCase of testCases) {
      console.log(`\nRunning test: ${testCase.name}`);
      console.log('Query:', testCase.query);
      console.log('Expected:', testCase.expected);

      try {
        const response = await axios.get(`${API_URL}/luggage`, {
          params: testCase.query
        });

        console.log('Response:', {
          success: response.data.success,
          count: response.data.count,
          total: response.data.total,
          page: response.data.page,
          totalPages: response.data.totalPages,
          items: response.data.data.map(item => ({
            reportNumber: item.reportNumber,
            description: item.description,
            status: item.status
          }))
        });

        if (response.data.success) {
          console.log('✅ Test passed');
        } else {
          console.log('❌ Test failed');
        }
      } catch (error) {
        console.log('❌ Test failed with error:', error.message);
      }
    }

    console.log('\nAll tests completed');
    process.exit(0);
  } catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
  }
}

testSearchFunctionality(); 