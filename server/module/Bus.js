import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    busType: { type: String, required: true },
    date: { type: String, required: true }, // Ensure date is defined here
    timing: { type: String, required: true },
    seats: { type: Number, required: true },
    agencyName: { type: String, required: true },
    ticketPrice: { type: Number, required: true } ,
    reservedSeats: { type: [String], default: [] }
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
