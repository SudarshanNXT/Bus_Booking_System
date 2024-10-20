import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { name, email, phone, selectedSeats = [], bus, from, to, date, ticketPrice, timing } = location.state || {};
  
  const taxPercentage = 0.18; // 18% tax
  const reservationFee = 20; // Reservation fee
  const totalSeats = selectedSeats.length;

  const totalTicketPrice = ticketPrice * totalSeats; 
  const taxAmount = totalTicketPrice * taxPercentage; 
  const totalPrice = totalTicketPrice + taxAmount + reservationFee;

  const handleProceedToTicket = async () => {
    try {
      const response = await fetch('http://localhost:4000/buses/booked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          busId: bus._id,
          passengerName: name,
          email,
          phone,
          selectedSeats,
          totalPrice // New field to send total price
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Booking failed');
      }
  
      const data = await response.json();
      alert(data.message);
      alert("Go to 'My Tickets' to view your tickets.");
  
      // After successful booking, navigate to the home page instead of the ticket page
      navigate('/show-ticket', { replace: true }); // Redirects to home page
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your booking. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="bg-red-500 text-center text-white py-2 rounded-md mb-6 text-lg font-bold">
        Payment Confirmation Page
      </h2>
      
      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-3">Passenger Details:</h3>
        <div className="space-y-2">
          <p>Name: <strong>{name}</strong></p>
          <p>Email: <strong>{email}</strong></p>
          <p>Phone: <strong>{phone}</strong></p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-3">Selected Seats:</h3>
        <div className="space-y-2">
          <p>{selectedSeats.join(', ')}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-3">BUS SERVICE DETAILS:</h3>
        <div className="space-y-2">
          <p>Bus: <strong>{bus?.agencyName}</strong></p>
          <p>From: <strong>{from}</strong></p>
          <p>To: <strong>{to}</strong></p>
          <p>Date and Time: <strong>{date} at {timing}</strong></p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-3">FARE DETAILS:</h3>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-2">TICKET PRICE (per seat)* {totalSeats}</td>
              <td className="p-2">₹ {ticketPrice}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2">Total Ticket Price</td>
              <td className="p-2">₹ {totalTicketPrice.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2">Tax 18%</td>
              <td className="p-2">₹ {taxAmount.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2">RESERVATION</td>
              <td className="p-2">₹ {reservationFee}</td>
            </tr>
            <tr className="font-bold border-t border-gray-400">
              <td className="p-2">Total</td>
              <td className="p-2">₹ {totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button 
        className="bg-red-500 text-white py-3 px-6 rounded-md w-full text-center hover:bg-red-600"
        onClick={handleProceedToTicket}
      >
        PROCEED TO TICKET
      </button>
    </div>
  );
}

export default PaymentConfirmation;

