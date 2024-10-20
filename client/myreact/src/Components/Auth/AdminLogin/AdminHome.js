import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminBusList from "./AdminBusList";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import backgroundImage from "./wp12516748-bus-4k-wallpapers.jpg"; // Import image

const AdminHome = () => {
  const [buses, setBuses] = useState([]);
  const [busDetails, setBusDetails] = useState({
    source: '',
    destination: '',
    busType: '',
    date: '',
    timing: '',
    seats: 41, // Default seat count set to 41
    agencyName: '',
    ticketPrice: '' // New field for ticket price
  });

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
    "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", 
    "Patna", "Bhopal", "Coimbatore", "Thane", "Mysore", "Vijayawada", "Chandigarh",
    "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Satara",
    "Tirupati", "Guntur", "Kakinada", "Nellore", "Rajahmundry", "Kurnool",
    "Ongole", "Anantapur", "Eluru", "Chittoor", "Kadapa", "Srikakulam"
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBusDetails({
      ...busDetails,
      [name]: value
    });
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    const newBus = {
      source: busDetails.source,
      destination: busDetails.destination,
      busType: busDetails.busType,
      date: busDetails.date,
      timing: busDetails.timing,
      seats: 41, // Ensure seats are always 41
      agencyName: busDetails.agencyName,
      ticketPrice: busDetails.ticketPrice
    };

    console.log(newBus); // Log to see the object being sent

    try {
      const response = await fetch('http://localhost:4000/buses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBus),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(result.message);
        setBuses([...buses, result.bus]);
      } else {
        alert(result.message);
      }

      // Reset bus details except the seat count (default to 41)
      setBusDetails({
        source: '',
        destination: '',
        busType: '',
        date: '',
        timing: '',
        seats: 41, // Reset seat count to 41
        agencyName: '',
        ticketPrice: '' // Reset ticket price
      });
    } catch (error) {
      console.error('Error adding bus:', error);
      alert('Error adding bus: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('isAdmin'); // Remove admin status
    navigate('/'); // Redirect to login page
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4"
      style={{ 
        backgroundImage: `url(${backgroundImage})`, // Use the imported image here
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Prevent repeating background
      }}
    >
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Bus <DirectionsBusIcon /></h2>
        <form onSubmit={handleAddBus} className="space-y-4">
          {/* Source Input */}
          <input
            list="city-options"
            type="text"
            name="source"
            value={busDetails.source}
            onChange={handleChange}
            placeholder="Source"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {/* Destination Input */}
          <input
            list="city-options"
            type="text"
            name="destination"
            value={busDetails.destination}
            onChange={handleChange}
            placeholder="Destination"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <datalist id="city-options">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>

          <select
            name="busType"
            value={busDetails.busType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select Bus Type</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Ordinary">Ordinary</option>
            <option value="Super Luxury">Super Luxury</option>
          </select>
          <input
            type="date"
            name="date"
            value={busDetails.date}
            onChange={handleChange}
            min={getTodayDate()} // Prevent selecting past dates
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="time"
            name="timing"
            value={busDetails.timing}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="seats"
            value={busDetails.seats}
            readOnly // Make seat count unchangeable
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="agencyName"
            value={busDetails.agencyName}
            onChange={handleChange}
            placeholder="Traveler Agency Name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="ticketPrice"
            value={busDetails.ticketPrice}
            onChange={handleChange}
            placeholder="Ticket Price"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
            Add Bus
          </button>
        </form>
      </div>
      <AdminBusList buses={buses} /> {/* Update component name to AdminBusList */}
    </div>
  );
};

export default AdminHome;
