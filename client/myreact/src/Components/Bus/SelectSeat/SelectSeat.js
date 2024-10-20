import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Footer from '../../Common/Footer/Footer';
import Header from '../../Common/Header/Header.js';

const SelectSeat = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]); // Reserved seats fetched from the backend
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { bus, from, to, date, ticketPrice, timing } = location.state || {}; 

    const seats = [
        ['1A', '1B', '', '1C', '1D'],
        ['2A', '2B', '', '2C', '2D'],
        ['3A', '3B', '', '3C', '3D'],
        ['4A', '4B', '', '4C', '4D'],
        ['5A', '5B', '', '5C', '5D'],
        ['6A', '6B', '', '6C', '6D'],
        ['7A', '7B', '', '7C', '7D'],
        ['8A', '8B', '', '8C', '8D'],
        ['9A', '9B', '', '9C', '9D'],
        ['10A', '10B', '10C', '10D', '10E'],
    ];

    // Fetch reserved seats for the bus
    useEffect(() => {
        const fetchReservedSeats = async () => {
            try {
                const response = await fetch(`http://localhost:4000/buses/${bus._id}/reserved-seats`); // Call your backend API to get reserved seats
                const data = await response.json();
                setReservedSeats(data.reservedSeats); // Store reserved seats in the state
            } catch (error) {
                console.error('Error fetching reserved seats:', error);
            }
        };

        fetchReservedSeats();
    }, [bus._id]);

    const handleSeatClick = (seat) => {
        if (reservedSeats.includes(seat)) return; // Block reserved seats

        // Limit the selection to 5 seats
        if (selectedSeats.length >= 5 && !selectedSeats.includes(seat)) {
            alert("You can only select up to 5 seats.");
            return;
        }

        setHistory([...history, selectedSeats]);

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const undoSelection = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setSelectedSeats(lastState);
            setHistory(history.slice(0, -1));
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
                undoSelection();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedSeats.length > 0) {
            navigate('/passenger-form', { state: { bus, selectedSeats, from, to, date, ticketPrice, timing } });
        } else {
            alert("Please select at least one seat.");
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Select Seats</h1>

                {/* Adjusted position for Ticket Price */}
                <div className="absolute top-16 left-4 p-4 border rounded-lg bg-white shadow-lg">
                    <span className="font-semibold text-gray-700">Ticket Price: </span>
                    <span className="text-lg font-bold">₹{ticketPrice}</span>
                </div>

                {/* Adjusted position for Seat Status */}
                <div className="absolute top-16 right-4 p-4 border rounded-lg bg-white shadow-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="w-4 h-4 bg-black block rounded"></span>
                        <span className="text-sm">Sold Out</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="w-4 h-4 bg-gray-200 block rounded"></span>
                        <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-green-400 block rounded"></span>
                        <span className="text-sm">Selected</span>
                    </div>
                </div>

                <div className="p-4 border-4 border-gray-500 rounded-lg shadow-md">
                    <div className="grid gap-4 grid-flow-row auto-rows-max mb-6">
                        {seats.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-2">
                                {row.map((seat, seatIndex) => (
                                    <button
                                        key={seatIndex}
                                        onClick={() => seat && handleSeatClick(seat)}
                                        className={`w-12 h-12 p-2 border-2 rounded text-center 
                                            ${reservedSeats.includes(seat) ? 'bg-gray-950 border-gray-600 cursor-not-allowed' : ''} 
                                            ${selectedSeats.includes(seat) ? 'bg-green-400 border-green-600' : 'bg-gray-200 border-gray-400'}
                                            hover:bg-gray-300 transition ${seat === '' ? 'invisible' : ''}`}
                                    >
                                        {seat && <EventSeatRoundedIcon className="text-gray-700" />}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <span className="font-semibold text-gray-700">Selected Seats: </span>
                    <span>{selectedSeats.join(', ') || 'None'}</span>
                </div>

                <button
                    type="button"
                    onClick={undoSelection}
                    className="bg-yellow-500 text-white py-2 px-4 rounded mb-4 hover:bg-yellow-600"
                    disabled={history.length === 0}
                >
                    Undo (Ctrl + Z)
                </button>
                
                <button
                    onClick={handleSubmit}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Confirm Booking
                </button>
               
            </div>
            <Footer />
        </>
    );
};

export default SelectSeat;
