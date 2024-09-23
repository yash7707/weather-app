import { useState } from "react";

const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Nagpur",
  "Surat",
  "Visakhapatnam",
  "Patna",
  "Kochi",
  "Bhopal",
  "London",
  "Manchester",
  "Birmingham",
  "Glasgow",
  "Liverpool",
  "Edinburgh",
  "Cardiff",
  "Dublin",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Amsterdam",
  "Brussels",
  "Vienna",
  "Zurich",
  "Copenhagen",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington D.C.",
  "Boston",
  // Add more locations as needed
];

const Search = ({ data, location, setLocation, search }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleLocChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);

    if (inputValue) {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setFilteredSuggestions([]);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      search(location);
    }
  };

  return (
    <div className="top-part">
      <div className="location-pin">
        <p>
          <i className="fa-solid fa-location-arrow"></i> {data.name}
        </p>
      </div>
      <div className="search-blk">
        <input
          type="text"
          placeholder="Enter a place"
          value={location}
          onKeyDown={handleEnter}
          onChange={handleLocChange}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={() => search(location)}
        ></i>
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
