import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    await pool.query(`
      SELECT FROM pg_database WHERE datname = 'lost_luggages';
    `).then(async (result) => {
      if (result.rowCount === 0) {
        // Database doesn't exist, create it
        await pool.query('CREATE DATABASE lost_luggages');
      }
    });

    // Connect to the lost_luggages database
    const dbPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: 'lost_luggages',
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432'),
    });

    // Read and execute schema.sql
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );

    await dbPool.query(schemaSQL);
    console.log('Database and tables created successfully');

    await dbPool.end();
    await pool.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 