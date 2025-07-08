import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white-600">🎬 MovieApp</Link>
        <a href="https://www.themoviedb.org/"target="_blank"rel="noreferrer"className="text-sm text-gray-500 hover:text-gray-700 transition">Powered by TMDb</a>
      </div>
    </nav>
  );
};

export default Navbar;
