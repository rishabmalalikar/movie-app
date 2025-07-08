
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { MovieContext } from "../context/MovieContext";
import { useContext, useEffect, useState } from "react";

const MovieList = () => {
    const {query,setQuery,selectedGenre,setSelectedGenre,selectedYear,setSelectedYear,sortBy,setSortBy,} = useContext(MovieContext);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, [API_KEY]);

  // Fetch movies
  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, selectedYear]);

  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;
  
    if (selectedGenre) url += `&with_genres=${selectedGenre}`;
    if (selectedYear) url += `&primary_release_year=${selectedYear}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error("Failed to fetch filtered movies:", err);
    }
  };
  

  const searchMovies = async () => {
    if (!query.trim()) {
      fetchMovies();
      return;
    }
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i); // Last 30 years
  const clearFilters = () => {
    setQuery("");
    setSelectedGenre("");
    setSelectedYear("");
    setSortBy("popularity.desc");
  };
  
  return (
    <div className="px-4">
        <div className="max-w-5xl mx-auto bg-white pt-5 pl-1 pr-1 rounded-xl shadow mb-6">
            <div className="p-1 flex flex-wrap gap-4 mb-6 justify-center">
                <SearchBar query={query} setQuery={setQuery} onSearch={searchMovies} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}className="ppl-9 pr-8 p-2 border bg-black rounded-md">
                    <option value="popularity.desc">Top Popularity</option>
                    <option value="popularity.asc">Least Popularity</option>
                    <option value="vote_average.desc">Top 5 Rating</option>
                    <option value="vote_average.asc">least Rated</option>
                    <option value="release_date.desc">Release Date</option>
                    <option value="release_date.asc">Date</option>
                </select>

                    {/* FILTERS */}
        
                <select value={selectedGenre}onChange={(e) => setSelectedGenre(e.target.value)}className="pl-9 pr-8 p-2 border bg-black rounded-md">
                    <option value="">All Genres</option>
                        {genres.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>))}
                </select>
        
                <select value={selectedYear}onChange={(e) => setSelectedYear(e.target.value)}className="pl- pr-5 p-2 border bg-black rounded-md" >
                    <option value="">All Years</option>
                        {years.map((y) => (
                    <option key={y} value={y}>{y}</option>))}
                </select>
                <button onClick={clearFilters}className="pl-9 pr-8 p-2 max-w-50xl bg-red-500 text-white rounded-md hover:bg-red-600 transition">Clear</button>
            </div>
        </div>
        {/* MOVIE GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.length > 0 ? (movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)):(<p className="text-center col-span-full text-gray-500">No results found.</p>)}
        </div>
    </div>
  );
};


export default MovieList;
