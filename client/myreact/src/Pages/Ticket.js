import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Components/Common/Footer/Footer';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import backgroundImage from './Account/ticket_670a1ba342b219cc01c2a1be (1).pdf.png';

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  const { bookingId } = location.state || {};

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (bookingId) {
        try {
          const response = await fetch(`http://localhost:4000/buses/view-ticket/my/${bookingId}`, {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch booking details');
          }

          const data = await response.json();
          setBookingDetails(data);
        } catch (error) {
          console.error('Error fetching booking details:', error);
        }
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleDownloadTicket = async () => {
    if (bookingDetails) {
      const { passengerName, email, phone, selectedSeats, ticketPrice, totalPrice, busId } = bookingDetails;
      const { source, destination, timing, busType, date } = busId || {};

      const doc = new jsPDF();
      doc.addImage(backgroundImage, 'PNG', 0, 0, 210, 297); // A4 size background (210x297 mm)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('E-Ticket Confirmation', 105, 30, { align: 'center' });

      const qrCodeData = `Booking ID: ${bookingId}\nPassenger Name: ${passengerName}\nSelected Seats: ${selectedSeats.join(', ')}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
      doc.addImage(qrCodeImage, 'PNG', 160, 40, 40, 40); // Right corner

      doc.setFontSize(14);
      doc.text('Passenger Details:', 20, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${passengerName}`, 20, 70);
      doc.text(`Email: ${email}`, 20, 80);
      doc.text(`Phone: ${phone}`, 20, 90);

      doc.setFont('helvetica', 'bold');
      doc.text('Bus Service Details:', 20, 110);
      doc.setFont('helvetica', 'normal');
      doc.text(`Source: ${source}`, 20, 120);
      doc.text(`Destination: ${destination}`, 20, 130);
      doc.text(`Date: ${date}`, 20, 140);
      doc.text(`Timing: ${timing}`, 20, 150);
      doc.text(`Bus Type: ${busType}`, 20, 160);

      doc.setFont('helvetica', 'bold');
      doc.text('Selected Seats:', 20, 180);
      doc.setFont('helvetica', 'normal');
      doc.text(`${selectedSeats.join(', ')}`, 20, 190);

      doc.setFont('helvetica', 'bold');
      doc.text('Fare Details:', 20, 210);
      doc.setFont('helvetica', 'normal');
      doc.text(`Ticket Price: Rs ${ticketPrice}`, 20, 220);
      doc.text(`Total Paid: Rs ${totalPrice}`, 20, 230);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 128, 0); // Green color
      doc.text('Payment Status: Payment Successful', 105, 250, { align: 'center' });

      doc.save(`ticket_${bookingId}.pdf`);
    } else {
      alert('No booking details available.');
    }
  };

  const handleEmailTicket = async () => {
    if (bookingDetails) {
      const { passengerName, email, selectedSeats, ticketPrice, totalPrice, busId } = bookingDetails;
      const { source, destination, timing, busType, date } = busId || {};

      const ticketDetails = `
        Dear ${passengerName},

        Your bus ticket details are as follows:

        Source: ${source}
        Destination: ${destination}
        Date: ${date}
        Timing: ${timing}
        Bus Type: ${busType}
        Selected Seats: ${selectedSeats.join(', ')}

        Fare Details:
        Ticket Price: Rs ${ticketPrice}
        Total Paid: Rs ${totalPrice}

        NXTBooking Safe travels!
      `;

      try {
        const response = await fetch('http://localhost:4000/email/send-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            subject: 'Your Bus Ticket',
            ticketDetails: ticketDetails,  // Send ticket info
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          alert(`Failed to send email: ${result.message}`);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Error sending email');
      }
    }
  };

  const handleCancelTicket = async () => {
    if (bookingId) {
      try {
        const response = await fetch(`http://localhost:4000/buses/cancel-ticket/${bookingId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to cancel booking');
        }

        const result = await response.json();
        alert(result.message); // Show success message
        navigate('/'); // Navigate to home or another page after cancellation
      } catch (error) {
        console.error('Error cancelling ticket:', error);
        alert('Error cancelling ticket. Please try again later.');
      }
    }
  };

  // Destructure required details from bookingDetails and busId
  const { passengerName, email, phone, selectedSeats, ticketPrice, totalPrice, busId } = bookingDetails || {};
  const { source, destination, timing, busType, date } = busId || {};

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="bg-green-500 text-center text-white py-2 rounded-md mb-6 text-lg font-bold">
          Ticket Confirmation
        </h2>

        {/* Passenger Details */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold mb-3">Passenger Details:</h3>
          <div className="space-y-2">
            <p>Name: <strong>{passengerName}</strong></p>
            <p>Email: <strong>{email}</strong></p>
            <p>Phone: <strong>{phone}</strong></p>
          </div>
        </div>

        {/* Selected Seats */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold mb-3">Selected Seats:</h3>
          <p>{selectedSeats?.join(', ')}</p>
        </div>

        {/* Bus Service Details */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold mb-3">Bus Service Details:</h3>
          <p>Source: <strong>{source}</strong></p>
          <p>Destination: <strong>{destination}</strong></p>
          <p>Date: <strong>{date}</strong></p>
          <p>Timing: <strong>{timing}</strong></p>
          <p>Bus Type: <strong>{busType}</strong></p>
        </div>

        {/* Fare Details */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold mb-3">Fare Details:</h3>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2">Ticket Price:</td>
                <td className="text-right">Rs {ticketPrice}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2">Total Paid:</td>
                <td className="text-right">Rs {totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download, Email, and Cancel Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleDownloadTicket}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Download Ticket
          </button>
          <button
            onClick={handleEmailTicket}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Email Ticket
          </button>
          <button
            onClick={handleCancelTicket}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Cancel Ticket
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Ticket;
