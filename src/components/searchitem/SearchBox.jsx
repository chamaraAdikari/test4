import React, { useState } from "react";
import "./searchbox.css";

const categories = [
  "Select Category",
  "Hotel",
  "Home Stay",
  "Restaurant",
  "Bar",
  "Tour Company",
  // Add more categories as needed
];

const SearchBox = ({ initialDestination = "", initialCategory = "Select Category", onSearch }) => {
  const [destination, setDestination] = useState(initialDestination);
  const [category, setCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ destination, category, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit} className="searchbox-form">
      <div className="searchbox-title">Search</div>
      <label className="searchbox-label">Destination</label>
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        className="searchbox-input"
      />
      <label className="searchbox-label">Category</label>
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="searchbox-input"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <label className="searchbox-label">Price Range</label>
      <div className="searchbox-price-range-box">
        <div className="searchbox-price-row">
          <span className="searchbox-price-label">Min price per night</span>
          <input
            type="number"
            placeholder="Min in LKR"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="searchbox-input searchbox-price-input"
          />
        </div>
        <div className="searchbox-price-row">
          <span className="searchbox-price-label">Max price per night</span>
          <input
            type="number"
            placeholder="Max in LKR"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="searchbox-input searchbox-price-input"
          />
        </div>
      </div>
      <button type="submit" className="searchbox-btn searchbox-btn-gradient">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
