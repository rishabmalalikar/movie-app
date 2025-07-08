import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-81 object-cover rounded-t-xl"
      />
      <div className="p-4 flex flex-col justify-between h-full">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{movie.title}</h2>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <span>📅 {movie.release_date || "N/A"}</span>
          <span className="text-yellow-500 font-bold">⭐ {movie.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
