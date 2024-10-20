import express from 'express';
import Bus from '../module/Bus.js';
import Booking from "../module/Booking.js";
import cors from "cors";
const router = express.Router();

// Add a new bus
router.post('/add', async (req, res) => {
    const { source, destination, busType, date, timing, seats, agencyName, ticketPrice } = req.body;

    try {
        const newBus = new Bus({ source, destination, busType, date, timing, seats, agencyName, ticketPrice });
        await newBus.save();
        res.status(201).json({ message: 'Bus added successfully!', bus: newBus });
    } catch (error) {
        res.status(400).json({ message: 'Error adding bus', error: error.message });
    }
});

// Get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buses', error: error.message });
    }
});

// Delete a bus
router.delete('/:id', async (req, res) => {
    try {
        const busId = req.params.id;
        const deletedBus = await Bus.findByIdAndDelete(busId);

        if (!deletedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.status(200).json({ message: 'Bus deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bus', error: error.message });
    }
});

// Get passengers for a specific bus
router.get('/:busId/passengers', async (req, res) => {
    try {
      const bookings = await Booking.find({ busId: req.params.busId });
      
      if (!bookings.length) {
        return res.status(404).json({ message: 'No passengers found for this bus.' });
      }
  
      // Map over bookings to extract passenger information
      const passengers = bookings.map(booking => ({
        name: booking.passengerName,
        seatNumber: booking.selectedSeats.join(', '), // Join selectedSeats array
        phoneNumber: booking.phone,
      }));
  
      res.status(200).json(passengers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching passengers', error: error.message });
    }
  });
  

export default router;
