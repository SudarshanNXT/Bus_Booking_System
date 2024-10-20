import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method is card
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get passenger details and other necessary info from state
  const { name, email, phone, selectedSeats = [], totalPrice, bookingId } = location.state || {};

  const handlePayment = () => {
    let paymentStatus = false;

    if (paymentMethod === 'card') {
      // Simulate card payment processing
      if (cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv) {
        paymentStatus = true; // Assume payment is successful
        console.log('Processing card payment:', cardDetails);
      } else {
        alert('Please fill in card details');
        return;
      }
    } else if (paymentMethod === 'upi') {
      // Simulate UPI payment processing
      if (upiId) {
        paymentStatus = true; // Assume payment is successful
        console.log('Processing UPI payment:', upiId);
      } else {
        alert('Please fill in UPI ID');
        return;
      }
    }

    // Now you can use the bookingId here if needed
    console.log('Booking ID:', bookingId); // For reference

    // Simulate a successful payment (you might want to make an actual API call here)
    // Navigate to Ticket after payment is done
    navigate('', {
      state: { 
        bookingId, // Pass the bookingId to Ticket
        name, 
        email, 
        phone, 
        selectedSeats, 
        paymentStatus, 
        totalPrice 
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-center bg-red-500 text-white py-2 rounded-md mb-6 text-lg font-bold">
        Payment Page
      </h2>

      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-3">Choose Payment Method</h3>
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 rounded-md font-semibold ${
              paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            Card
          </button>
          <button
            className={`py-2 px-4 rounded-md font-semibold ${
              paymentMethod === 'upi' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setPaymentMethod('upi')}
          >
            UPI
          </button>
        </div>

        {/* Card Payment Section */}
        {paymentMethod === 'card' && (
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Card Details</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded-md"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-full p-2 border rounded-md"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded-md"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* UPI Payment Section */}
        {paymentMethod === 'upi' && (
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">UPI ID</h3>
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="w-full p-2 border rounded-md"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        <div className="mt-6">
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-md w-full text-center hover:bg-red-600"
            onClick={handlePayment}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
