import { Router } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lost_luggages',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Create a new luggage report
router.post('/report', async (req, res) => {
  const {
    brand,
    color,
    size,
    weight,
    airportLocation,
    dateLost,
    distinctiveFeatures,
    contentsDescription,
  } = req.body;

  try {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // First create the luggage report
      const reportResult = await client.query(
        `INSERT INTO luggage_reports (status, airport_location, date_lost)
         VALUES ($1, $2, $3)
         RETURNING id`,
        ['pending', airportLocation, dateLost]
      );

      const reportId = reportResult.rows[0].id;

      // Then create the luggage details
      await client.query(
        `INSERT INTO luggage_details 
         (report_id, brand, color, size, weight, distinctive_features, contents_description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [reportId, brand, color, size, weight, distinctiveFeatures, contentsDescription]
      );

      await client.query('COMMIT');
      res.status(201).json({ message: 'Luggage report created successfully', reportId });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating luggage report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search for luggage reports
router.get('/search', async (req, res) => {
  const { brand, color, airportLocation, dateLost } = req.query;
  
  try {
    let query = `
      SELECT lr.*, ld.*
      FROM luggage_reports lr
      JOIN luggage_details ld ON lr.id = ld.report_id
      WHERE 1=1
    `;
    const values: any[] = [];
    let valueIndex = 1;

    if (brand) {
      query += ` AND ld.brand ILIKE $${valueIndex}`;
      values.push(`%${brand}%`);
      valueIndex++;
    }

    if (color) {
      query += ` AND ld.color ILIKE $${valueIndex}`;
      values.push(`%${color}%`);
      valueIndex++;
    }

    if (airportLocation) {
      query += ` AND lr.airport_location ILIKE $${valueIndex}`;
      values.push(`%${airportLocation}%`);
      valueIndex++;
    }

    if (dateLost) {
      query += ` AND lr.date_lost = $${valueIndex}`;
      values.push(dateLost);
      valueIndex++;
    }

    query += ' ORDER BY lr.created_at DESC';

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching luggage reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 