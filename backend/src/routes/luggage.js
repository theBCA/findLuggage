import express from 'express';
import { auth } from '../middleware/auth.js';
import Luggage from '../models/luggage.js';

const router = express.Router();

// Get all luggage reports (with advanced search and filter)
router.get('/', async (req, res) => {
  try {
    const {
      search,
      status,
      size,
      color,
      brand,
      dateFrom,
      dateTo,
      location,
      tags,
      sortBy = 'lastSeen.date',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Text search across multiple fields
    if (search) {
      query.$text = { $search: search };
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Size filter
    if (size) {
      query.size = size;
    }

    // Color filter (case-insensitive)
    if (color) {
      query.color = new RegExp(color, 'i');
    }

    // Brand filter (case-insensitive)
    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }

    // Date range filter
    if (dateFrom || dateTo) {
      query['lastSeen.date'] = {};
      if (dateFrom) {
        query['lastSeen.date'].$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query['lastSeen.date'].$lte = new Date(dateTo);
      }
    }

    // Location filter (case-insensitive)
    if (location) {
      query['lastSeen.location'] = new RegExp(location, 'i');
    }

    // Tags filter (multiple tags supported)
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination and sorting
    const luggage = await Luggage.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('owner', 'name email phone');

    // Get total count for pagination
    const total = await Luggage.countDocuments(query);

    res.json({
      success: true,
      count: luggage.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: luggage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create a new luggage report
router.post('/', auth, async (req, res) => {
  try {
    const luggage = new Luggage({
      ...req.body,
      owner: req.user._id,
      reportNumber: `LUG${Date.now()}`,
    });

    const savedLuggage = await luggage.save();
    res.status(201).json(savedLuggage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific luggage report
router.get('/:id', async (req, res) => {
  try {
    const luggage = await Luggage.findById(req.params.id)
      .populate('owner', 'name email');
    
    if (!luggage) {
      return res.status(404).json({ message: 'Luggage not found' });
    }
    
    res.json(luggage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a luggage report
router.patch('/:id', auth, async (req, res) => {
  try {
    const luggage = await Luggage.findById(req.params.id);
    
    if (!luggage) {
      return res.status(404).json({ message: 'Luggage not found' });
    }

    if (luggage.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(luggage, req.body);
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