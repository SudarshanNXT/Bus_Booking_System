import express from "express";
import jwt from "jsonwebtoken";
import AccountModel from "../module/accounts.js";
import AdminModel from "../module/admin.js"; // Import AdminModel for admin login
import authMiddleware from "./authMiddleware.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "vsvs";

// Registration Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existing = await AccountModel.findOne({ email });
        if (existing) {
            return res.status(401).json({ error: "User already exists" });
        }

        

        // Create a new account
        const account = await AccountModel.create({
            name,
            email,
            password
        });

    

        // Send response with token
       return  res.status(201).json({ success:true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error during registration" });
    }
});

// Login Route (User)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        const account = await AccountModel.findOne({ email });
        if (!account) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid=(password==account.password) ? 1 : 0;
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: account._id, email }, 
            JWT_SECRET, 
            { expiresIn: "15m" }
        );
        
      
        const name=account.name;
        // Send response with token
       return  res.status(200).json({ message:"Login Successfully",success:true,email,token ,name});

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"error"});
    }
});

// Admin Login Route
router.post("/admin-login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the admin in the database
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Compare the provided password (simplified)
        if (password !== admin.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token for admin
        const token = jwt.sign(
            { id: admin._id, email, isAdmin: true }, 
            JWT_SECRET, 
            { expiresIn: "15m" }
        );

        // Send back token with admin status
        res.status(200).json({ message: "Admin login successful", token, isAdmin: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error during admin login" });
    }
});

router.put("/profile-update", authMiddleware, async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id; // Get the user ID from the middleware

        // Update the user information in the database
        const updatedUser = await AccountModel.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, message: "Profile updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating profile" });
    }
});

export default router;
