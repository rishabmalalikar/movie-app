import { createContext, useState } from "react";

export const MovieContext = createContext(null); // Make sure this is exported

export const MovieProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  
  return (
    <MovieContext.Provider
      value={{
        query,
        setQuery,
        selectedGenre,
        setSelectedGenre,
        selectedYear,
        setSelectedYear,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
