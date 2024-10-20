import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BackgroundVD from "./2950082-uhd_38430fps.mp4"; // Imported video

function HomeSearchBus() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    // Updated city list from AdminHome
    const cities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
        "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", 
        "Patna", "Bhopal", "Coimbatore", "Thane", "Mysore", "Vijayawada", "Chandigarh",
        "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Satara",
        "Tirupati", "Guntur", "Kakinada", "Nellore", "Rajahmundry", "Kurnool",
        "Ongole", "Anantapur", "Eluru", "Chittoor", "Kadapa", "Srikakulam"
    ];

    // Set the date input to today's date and prevent past dates
    useEffect(() => {
        const today = new Date();
        const currentDate = today.toISOString().split('T')[0];
        setDate(currentDate);
        document.getElementById("dateInput").setAttribute("min", currentDate);
    }, []);

    const handleSearch = async () => {
        if (!from || !to || !date) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/buses/search?from=${from}&to=${to}&date=${date}`);
            const buses = await response.json();

            if (response.ok) {
                navigate('/buses', { state: { buses, from, to, date } });
            } else {
                alert(buses.message || 'No buses found');
            }
        } catch (error) {
            alert('Error fetching buses');
            console.error('Fetch Error:', error);
        }
    };

    const handleReset = () => {
        setFrom('');
        setTo('');
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    };

    return (
        <>
            <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
                {/* Background Video */}
                <video 
                    className="absolute top-0 left-0 w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted
                >
                    <source src={BackgroundVD} type="video/mp4" /> {/* Use imported video */}
                    Your browser does not support the video tag.
                </video>

                <Navbar />
                {/* Updated background color for transparency */}
                <div className="flex flex-col items-center justify-center p-10 bg-white bg-opacity-40 rounded-lg shadow-md z-10 mt-16">
                    <h1 className="text-4xl text-black mb-8 text-center">Let's begin the journey..!</h1>
                    <div className="w-full">
                        {/* From City */}
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full p-3 mb-4 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="" disabled>Select From</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>

                        {/* To City */}
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full p-3 mb-4 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="" disabled>Select To</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>

                        {/* Date Selection */}
                        <input
                            type="date"
                            id="dateInput"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 mb-4 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />

                        <div className="flex justify-between w-full pt-4">
                            <button onClick={handleReset} className="w-1/2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 mr-2">
                                Reset <RestartAltIcon />
                            </button>
                            <button onClick={handleSearch} className="w-1/2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 ml-2">
                                Check Availability <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomeSearchBus;
