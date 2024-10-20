import express from 'express';
import Bus from '../module/Bus.js';
import cors from 'cors';
const router = express.Router();

// Apply CORS Middleware
router.use(cors());

// Route for searching buses
router.get('/search', async (req, res) => {
  const { from, to, date } = req.query;
  try {
    const queryDate = new Date(date).toISOString().split('T')[0]; // Format the date

    const buses = await Bus.find({
      source: from,
      destination: to,
      date: queryDate,
    });

    if (buses.length === 0) {
      return res.status(404).json({ message: 'No buses found' });
    }

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buses', error: error.message });
  }
});

// Route for filtering buses
router.post('/filter', async (req, res) => {
    const { busType, minPrice, maxPrice, timeFilter } = req.body;
  
    try {
      let query = {};
  
      if (busType) {
        query.busType = busType;
      }
      if (minPrice) {
        query.price = { ...query.price, $gte: minPrice };
      }
      if (maxPrice) {
        query.price = { ...query.price, $lte: maxPrice };
      }
      if (timeFilter === 'before12pm') {
        query.departureTime = { $lt: '12:00:00' };
      }
      if (timeFilter === 'after12pm') {
        query.departureTime = { $gte: '12:00:00' };
      }
  
      const buses = await Bus.find(query);
  
      if (buses.length === 0) {
        return res.status(404).json({ message: 'No buses found' });
      }
  
      res.status(200).json(buses);
    } catch (error) {
      res.status(500).json({ message: 'Error filtering buses', error: error.message });
    }
  });
  

export default router;
