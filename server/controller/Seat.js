import express from 'express';
import Bus from '../module/Bus.js'; // Ensure you have the correct path and extension

const router = express.Router();

// Get available seats for a specific bus
router.get('/seats', async (req, res) => {
    const { busId } = req.query;

    try {
        const bus = await Bus.findById(busId);
        
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Assuming you have a way to get reserved seats
        const reservedSeats = bus.reservedSeats || [];
        const availableSeats = bus.totalSeats.filter(seat => !reservedSeats.includes(seat));

        res.status(200).json({ availableSeats, reservedSeats });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seats', error });
    }
});

export default router;
