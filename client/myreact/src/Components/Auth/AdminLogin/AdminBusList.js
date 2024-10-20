import React, { useState, useEffect } from 'react';
import PassengerList from './PassengerList';
import "../../../index.css";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
const AdminBusList = () => { 
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  // Fetch bus data from the server
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('http://localhost:4000/buses');
        const data = await response.json();
        
        if (response.ok) {
          setBuses(data);  // Set the fetched bus data in state
        } else {
          console.error("Error fetching buses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();  // Trigger fetching of buses when component loads
  }, []);

  const handleViewPassengers = (bus) => {
    setSelectedBus(bus);
  };

  // Function to delete a bus
  const handleDeleteBus = async (busId) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        const response = await fetch(`http://localhost:4000/buses/${busId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Filter out the deleted bus from the buses state
          setBuses(buses.filter(bus => bus._id !== busId));
          alert("Bus deleted successfully!");
        } else {
          console.error("Error deleting bus:", await response.json());
        }
      } catch (error) {
        console.error("Error deleting bus:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Bus List <DirectionsBusIcon/></h2>
      {buses.length === 0 ? (
        <p className="text-center">No buses available. Add a new bus!</p>
      ) : (
        <ul className="space-y-4">
          {buses.map(bus => (
            <li key={bus._id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{bus.source} → {bus.destination}</h3>
                <p>
                  {bus.busType}, {bus.timing}, Seats: {bus.seats}
                  <br />
                  <strong>Agency Name:</strong> {bus.agencyName}
                  <br />
                  <strong>Date:</strong> {new Date(bus.date).toLocaleDateString()}
                  <br />
                  <strong>Ticket Price:</strong> ₹{bus.ticketPrice}
                </p>
              </div>
              {/* Centering buttons */}
              <div className="flex flex-col justify-center items-center space-y-2">
                <button
                  onClick={() => handleViewPassengers(bus)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  View Passengers
                </button>
                <button
                  onClick={() => handleDeleteBus(bus._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Passenger List Modal */}
      {selectedBus && <PassengerList bus={selectedBus} onClose={() => setSelectedBus(null)} />}
    </div>
  );
};

export default AdminBusList;
