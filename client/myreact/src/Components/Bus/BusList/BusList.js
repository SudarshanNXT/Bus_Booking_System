import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../Common/Footer/Footer.js';
import Filter from '../Filter/Filter.js';
import './BusList.css';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import NearMeIcon from '@mui/icons-material/NearMe';
import PinDropIcon from '@mui/icons-material/PinDrop';

function BusList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { buses = [], from = '', to = '', date = '' } = location.state || {};

    const [filteredBuses, setFilteredBuses] = useState(buses); 
    const [filters, setFilters] = useState({
        busType: '',
        minPrice: 0,
        maxPrice: 5000,
        timeFilter: '',
    });

    useEffect(() => {
        applyFilters(filters);
    }, [buses, filters]);

    const handleSelectBus = (bus) => {
        // Pass the ticket price and timing when navigating to seat selection
        navigate('/seat-selection', { 
            state: { 
                bus, 
                from, 
                to, 
                date, 
                ticketPrice: bus.ticketPrice, // Pass the ticket price
                timing: bus.timing, // Pass the bus timing
            } 
        });
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (filters) => {
        if (!buses || buses.length === 0) return;

        const filtered = buses.filter((bus) => {
            const isTypeMatch = filters.busType === '' || bus.busType === filters.busType;
            const isPriceMatch = bus.ticketPrice >= filters.minPrice && bus.ticketPrice <= filters.maxPrice;
            const busTime24h = convertTo24Hour(bus.timing);
            let isTimeMatch = true;

            if (filters.timeFilter === 'before12pm') {
                isTimeMatch = busTime24h < '12:00';
            } else if (filters.timeFilter === 'after12pm') {
                isTimeMatch = busTime24h >= '12:00';
            }

            return isTypeMatch && isPriceMatch && isTimeMatch;
        });

        setFilteredBuses(filtered);
    };

    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (modifier === 'PM' && hours !== '12') {
            hours = (parseInt(hours, 10) + 12).toString();
        }
        if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }
        return `${hours.padStart(2, '0')}:${minutes}`;
    };

    return (
        <div className="bus-list">
            <h2>Select a Bus from {from} to {to} on {date}</h2>
            <Filter filters={filters} onFilterChange={handleFilterChange} />
            {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                    <div key={bus.id} className="bus-item">
                        <h3 className="traveler-agency-name">
                            <DirectionsBusIcon /> {bus.agencyName}
                        </h3>
                        <div className="info">
                            <p className="source">Source: {bus.source} <NearMeIcon /></p>
                            <p className="destination">Destination: {bus.destination} <PinDropIcon /></p>
                            <p>Price: <CurrencyRupeeIcon />{bus.ticketPrice}</p>
                        </div>
                        <div className="details">
                            <p>Departure: {bus.timing}</p>
                            <p>Bus Type: {bus.busType}</p>
                            <p>Seats Available: {bus.seats - bus.reservedSeats.length}</p> {/* Update seats dynamically */}
                            <button onClick={() => handleSelectBus(bus)}>
                                Proceed to Seat Selection <AirlineSeatReclineExtraIcon />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No buses match your filters. Try adjusting the filter settings.</p>
            )}
            <Footer />
        </div>
    );
}

export default BusList;
