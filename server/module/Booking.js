import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  passengerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  selectedSeats: { type: [String], required: true },
  bookingDate: { type: Date, default: Date.now },
  ticketPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true } // New field for total price
});

// Use mongoose.model instead of model.mongoose
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
