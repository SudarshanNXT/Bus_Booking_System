import express from 'express';
import Booking from '../module/Booking.js';
import Bus from '../module/Bus.js';
import authenticate from '../routes/authMiddleware.js';
import mongoose from 'mongoose';
const router = express.Router();
import cors from 'cors';


const app = express();

// Use CORS middleware
app.use(cors());


// Route for booking a ticket
router.post('/booked', authenticate, async (req, res) => {
  try {
    const { busId, passengerName, email, phone, selectedSeats, totalPrice } = req.body; // Include totalPrice

    // Fetch the bus details
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    // Check for conflicting seat reservations
    const conflictingSeats = selectedSeats.filter(seat => bus.reservedSeats.includes(seat));
    if (conflictingSeats.length > 0) {
      return res.status(400).json({ error: 'Some seats are already reserved', conflictingSeats });
    }

    // Create a new booking
    const booking = new Booking({
      busId,
      passengerName,
      email,
      phone,
      selectedSeats,
      ticketPrice: bus.ticketPrice, // Store ticket price per seat
      totalPrice, // Store total price
      paymentStatus: true // Assume payment is successful for the booking
    });

    // Save booking and update reserved seats and available seats count
    await booking.save();
    bus.reservedSeats.push(...selectedSeats);
    bus.seats -= selectedSeats.length; // Update available seats count
    await bus.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Endpoint to get reserved seats for a bus
router.get('/:busId/reserved-seats', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    res.json({ reservedSeats: bus.reservedSeats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Route to get tickets for a specific user (based on the token)
router.get('/my-tickets', authenticate, async (req, res) => {
  try {
    // Fetch tickets where the logged-in user's email matches
    const tickets = await Booking.find({ email: req.user.email }).populate('busId'); // Populate bus details
    res.json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/view-ticket/my/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by ID and populate bus details
    const ticket = await Booking.findOne({ _id: bookingId }).populate('busId'); // Populating bus details

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket); // Return the populated ticket data
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    res.status(500).json({ error: 'Error fetching ticket details' });
  }
});
router.delete('/cancel-ticket/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the booking by ID
    const booking = await Booking.findById(id).populate('busId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Release the reserved seats
    const bus = booking.busId;
    bus.reservedSeats = bus.reservedSeats.filter(seat => !booking.selectedSeats.includes(seat));
    bus.seats += booking.selectedSeats.length; // Increment available seats count
    await bus.save(); // Save the updated bus information

    // Delete the booking
    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



export default router;
