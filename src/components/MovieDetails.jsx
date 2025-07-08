import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            const data = await res.json();
            setMovie(data);
        } 
        catch (err) {
            console.error("Failed to fetch movie details:", err);
        }
    };
    fetchMovieDetails();
    }, [id, API_KEY]);
    
    if (!movie) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/"className="inline-block mb-4 text-white-600 hover:underline font-semibold">← Back</Link>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
            <img
            src={imageUrl}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-xl object-cover"/>

            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-gray-800">{movie.title}</h2>
                <p className="text-gray-700 leading-relaxed">{movie.overview}</p>

                <div className="flex flex-wrap gap-3 mt-2">
                    {movie.genres.map((genre) => (<span key={genre.id}className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{genre.name}</span>))}
                </div>

                <div className="mt-4 text-gray-600 text-sm space-y-1">
                    <p>📅 <strong>Release Date:</strong> {movie.release_date}</p>
                    <p>⭐ <strong>Rating:</strong> {movie.vote_average}</p>
                    <p>🎬 <strong>Runtime:</strong> {movie.runtime} mins</p>
                    <p>💰 <strong>Budget:</strong> ${movie.budget?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MovieDetails;
