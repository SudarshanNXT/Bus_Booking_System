// Update User Profile Route
router.put("/profile-update", async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id; // Assuming you're using middleware to get user ID from the token

        // Update the user information in the database
        const updatedUser = await AccountModel.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating profile" });
    }
});
