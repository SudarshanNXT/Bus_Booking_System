import jwt from 'jsonwebtoken';
import AccountModel from "../module/accounts.js";

const JWT_SECRET = process.env.JWT_SECRET || 'vsvs'; // Use environment variable or fallback

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user in the database based on decoded token ID
        const user = await AccountModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        // Attach user info to the request object (token data + user details from DB)
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: user.name, // Attach any additional user information from the DB
        };

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

export default authMiddleware;

