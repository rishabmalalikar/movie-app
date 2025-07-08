import React from "react";

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="fflex w-full max-w-md">
      <input type="text"placeholder="Search movies..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyDown={handleKeyDown}className="w-full p-2 border rounded-md outline-none text-black shadow-md"/>
      <button onClick={onSearch}className="bg-blue-600 shadow-md text-white px-4 rounded-md hover:bg-blue-700 transition">Search</button>
    </div>
  );
};

export default SearchBar;
