import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const PassengerList = ({ bus, onClose }) => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch passengers from the API when the component mounts
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/buses/${bus._id}/passengers`);
        const data = await response.json();

        if (response.ok) {
          setPassengers(data);
        } else {
          setError(data.message || 'Failed to fetch passengers');
        }
      } catch (err) {
        setError('Error fetching passengers');
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, [bus._id]);

  if (loading) {
    return <div>Loading passengers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Default when no passengers are found
  const passengersToDisplay = passengers.length > 0 
    ? passengers 
    : [{ name: 'No passengers yet', seatNumber: '', phoneNumber: '' }];

  // Function to handle CSV download
  const handleDownloadCSV = () => {
    // Prepare CSV data
    const csvData = passengersToDisplay.map((passenger) => ({
      name: passenger.name,
      seatNumber: passenger.seatNumber || 'N/A',
      phoneNumber: passenger.phoneNumber || 'N/A',
    }));

    // Convert JSON to CSV format using PapaParse
    const csv = Papa.unparse(csvData);

    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Use FileSaver to download the file
    saveAs(blob, `passengers_${bus.source}_to_${bus.destination}.csv`);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Passengers for {bus.source} → {bus.destination}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Passenger Name</th>
                <th className="border px-4 py-2 text-left">Seat No.</th>
                <th className="border px-4 py-2 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {passengersToDisplay.map((passenger, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{passenger.name}</td>
                  <td className="border px-4 py-2">{passenger.seatNumber || 'N/A'}</td>
                  <td className="border px-4 py-2">{passenger.phoneNumber || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
  onClick={onClose}
  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-4" // Added margin-right of 4
>
  Close
</button>

<button
  onClick={handleDownloadCSV}
  className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
>
  Export to Excel
</button>


    
      </div>
    </div>
  );
};

export default PassengerList;
