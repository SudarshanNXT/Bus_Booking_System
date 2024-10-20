import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Footer from '../Components/Common/Footer/Footer.js';
import Header from '../Components/Common/Header/Header.js';
const ShowTicket = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  // Fetch tickets for the logged-in user
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:4000/buses/my-tickets', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        setTickets(data.tickets); // Assuming the API returns an array of tickets in "tickets"
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const viewTicket = (ticket) => {
    navigate(`/view-ticket/${ticket._id}`, {
      state: {
        bookingId: ticket._id,
        passengerName: ticket.passengerName,
        email: ticket.email,
        phone: ticket.phone,
        selectedSeats: ticket.selectedSeats,
        ticketPrice: ticket.ticketPrice,
      }
    });
  };
  
  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">My Tickets</h1>
        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">No tickets available</p>
        ) : (
          <ul className="space-y-4">
            {tickets.map(ticket => (
              <li key={ticket._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                <span className="font-medium text-lg">Ticket ID: {ticket._id}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => viewTicket(ticket)} // Pass the full ticket object
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                  >
                    View Ticket
                  </button>
                  {/* You can add functionality for cancelling a ticket if needed */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ShowTicket;
