import React from "react";
import "./SearchBar.css";

const SearchBar = ({ location, setLocation, searchLocation }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
      />
    </div>
  );
};

export default SearchBar;
