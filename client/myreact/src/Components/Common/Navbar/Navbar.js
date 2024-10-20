import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "./logo.jpg"; // Ensure correct path for your logo
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

function Navbar() {
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
      <ul className="flex space-x-6 text-white font-bold items-center">
        {/* Ticket Link */}
        <li className="flex items-center">
          <Link to="/show-ticket" className="hover:bg-white hover:text-red-500 px-4 py-2 rounded transition flex items-center">
            <AirplaneTicketIcon className="mr-2" /> My Ticket
          </Link>
        </li>

        {/* Profile Link */}
        <li className="flex items-center">
          <Link to="/profile" className="hover:bg-white hover:text-red-500 px-4 py-2 rounded transition flex items-center">
            <AccountCircleIcon className="mr-2" /> My Profile
          </Link>
        </li>

        {/* Logout Link */}
        <li className="flex items-center">
          <button
            onClick={handleLogout}
            className="hover:bg-white hover:text-red-500 px-4 py-2 rounded transition flex items-center text-white"
          >
            <LogoutIcon className="mr-2" /> Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
