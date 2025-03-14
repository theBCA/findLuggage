import express from 'express';
import { auth } from '../middleware/auth.js';
import Luggage from '../models/Luggage.js';

const router = express.Router();

// Get all luggage with filters
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/luggage - Starting request');
    const { status, type, color, date, location, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (color) filter.color = color;
    if (date) filter.dateFound = new Date(date);
    if (location) filter.location = location;

    console.log('Filter object:', filter);

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    // Get total count for pagination
    const total = await Luggage.countDocuments(filter);
    console.log('Total documents:', total);
    const totalPages = Math.ceil(total / limitValue);

    // Get filtered luggage with pagination
    const luggage = await Luggage.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitValue);

    console.log('Found luggage items:', luggage.length);

    res.json({
      luggage,
      total,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error in GET /api/luggage:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single luggage by ID
router.get('/:id', async (req, res) => {
  try {
    const luggage = await Luggage.findById(req.params.id);
    if (!luggage) {
      return res.status(404).json({ message: 'Luggage not found' });
    }
    res.json(luggage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new luggage report (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const luggage = new Luggage({
      ...req.body,
      createdBy: req.user.userId
    });
    const newLuggage = await luggage.save();
    res.status(201).json(newLuggage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update luggage status (protected route)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const luggage = await Luggage.findById(req.params.id);
    if (!luggage) {
      return res.status(404).json({ message: 'Luggage not found' });
    }
    
    luggage.status = req.body.status;
    const updatedLuggage = await luggage.save();
    res.json(updatedLuggage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a luggage report
router.delete('/:id', auth, async (req, res) => {
  try {
    const luggage = await Luggage.findById(req.params.id);
    
    if (!luggage) {
      return res.status(404).json({ message: 'Luggage not found' });
    }

    if (luggage.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await luggage.remove();
    res.json({ message: 'Luggage report deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 