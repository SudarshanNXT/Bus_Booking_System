import React, { useState } from 'react';
import './Filter.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


function Filter({ filters, onFilterChange }) {
  const [busType, setBusType] = useState(filters.busType);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [timeFilter, setTimeFilter] = useState(filters.timeFilter || '');

  const handleApplyFilter = () => {
    onFilterChange({
      busType,
      minPrice,
      maxPrice,
      timeFilter,
    });
  };

  return (
    <div className="filter-container">
      <h3>Filter Buses</h3>
      <div className="filter-item">
        <label>Bus Type: </label>
        <select value={busType} onChange={(e) => setBusType(e.target.value)}>
          <option value="">All</option>
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
          <option value="Super Luxury">Super Luxury</option>
          <option value="Ordinary">Ordinary</option>
        </select>
      </div>

      <div className="filter-item">
        <label>Departure Time: </label>
        <div>
          <input
            type="radio"
            name="timeFilter"
            value="before12pm"
            checked={timeFilter === 'before12pm'}
            onChange={(e) => setTimeFilter(e.target.value)}
          />
          <label>Before 12 PM</label>
        </div>
        <div>
          <input
            type="radio"
            name="timeFilter"
            value="after12pm"
            checked={timeFilter === 'after12pm'}
            onChange={(e) => setTimeFilter(e.target.value)}
          />
          <label>After 12 PM</label>
        </div>
        <div>
          <input
            type="radio"
            name="timeFilter"
            value=""
            checked={timeFilter === ''}
            onChange={(e) => setTimeFilter('')}
          />
          <label>Anytime</label>
        </div>
      </div>

      <div className="filter-item">
        <label>Min Price: </label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </div>

      <div className="filter-item">
        <label>Max Price: </label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <button onClick={handleApplyFilter}>Apply Filter <FilterAltIcon/></button>
    </div>
  );
}

export default Filter;
