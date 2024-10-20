import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Auth from "./routes/auth.js";  
import busRoutes from "./controller/busRoutes.js";
import userbusRoutes from "./controller/userbusRoutes.js";
import Seat from "./controller/Seat.js";
import bookingRoutes from "./controller/bookingRoutes.js";
import emailRoutes from "./routes/MailRoutes.js";  // Import the email routes

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Bus", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));

// Use routes
app.use("/", Auth);
app.use('/buses', busRoutes);
app.use('/buses', userbusRoutes);
app.use('/buses', Seat);
app.use('/buses', bookingRoutes);
app.use('/email', emailRoutes);  // Use the email routes for sending emails

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
