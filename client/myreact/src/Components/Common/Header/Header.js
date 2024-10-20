import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "./logo.jpg"; // Ensure the correct path for your logo
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        localStorage.removeItem('userEmail'); // Optionally, remove other stored items
        localStorage.removeItem('userName');
        alert('Logged out successfully');
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <nav className="bg-red-600 p-4 fixed top-0 left-0 w-full z-50 shadow-lg flex justify-between items-center">
            {/* Logo and Title Section */}
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-12 mr-4" /> {/* Your logo */}
                <h1 className="text-white font-bold text-2xl font-sans">NXTBooking.com</h1> {/* Site title */}
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6 items-center">
                {/* Home Button */}
                <Link 
                    to="/home" 
                    className="hover:bg-white hover:text-red-500 px-4 py-2 rounded transition flex items-center text-white"
                >
                    <HomeIcon className="mr-2" /> Home
                </Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="hover:bg-white hover:text-red-500 px-4 py-2 rounded transition flex items-center text-white"
                >
                    <LogoutIcon className="mr-2" /> Sign Out
                </button>
            </div>
        </nav>
    );
}

export default Header;
