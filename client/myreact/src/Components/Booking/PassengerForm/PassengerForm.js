import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../index.css";

function PassengerForm() {
  const location = useLocation();
  const { bus, selectedSeats, from, to, date, ticketPrice, timing } = location.state || { selectedSeats: [] }; // Retrieve ticketPrice and timing
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  // Set email from local storage when component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleProceed = () => {
    // Check if all fields are filled
    if (name === '' || email === '' || phone === '') {
      alert('Please fill in all the fields.');
      return;
    }

    // Navigate to the Payment Confirmation page with passenger and trip details
    navigate('/payment-confirmation', { state: { name, email, phone, selectedSeats, bus, from, to, date, ticketPrice, timing } });
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white bg-opacity-80 p-8 rounded-md w-96 mx-auto mt-12 shadow-lg">
        <h2 className="mb-6 text-xl font-bold">Passenger Information</h2>

        <div className="mb-4">
          <p className="font-semibold">Bus: <span>{bus?.agencyName}</span></p>
          <p className="font-semibold">From: <span>{from}</span></p>
          <p className="font-semibold">To: <span>{to}</span></p>
          <p className="font-semibold">Date: <span>{date}</span></p>
          <p className="font-semibold">Ticket Price: <span>₹ {ticketPrice}</span></p> {/* Display Ticket Price */}
          <p className="font-semibold">Departure Time: <span>{timing}</span></p> {/* Display Bus Timing */}
        </div>

        <table className="w-full mb-6">
          <tbody>
            <tr>
              <td className="py-2"><label htmlFor="name" className="font-semibold">Name:</label></td>
              <td className="py-2">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="py-2"><label htmlFor="email" className="font-semibold">Email:</label></td>
              <td className="py-2">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  readOnly  // Set the email input field to read-only
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2"><label htmlFor="phone" className="font-semibold">Phone Number:</label></td>
              <td className="py-2">
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-left w-full mb-6">
          <p className="font-semibold">Selected Seats: <span>{selectedSeats.join(', ')}</span></p>
        </div>

        <button 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full text-center"
          onClick={handleProceed}
        >
          Proceed to Payment Confirmation
        </button>
      </div>
    </>
  );
}

export default PassengerForm;

