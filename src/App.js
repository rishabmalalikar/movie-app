import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { MovieProvider } from "./context/MovieContext";
import Navbar from "./components/Navbar";


function App() {
  return (
    <MovieProvider>
      <Router>
      <Navbar />
      <div className="min-h-screen w-full bg-black text-white">
          <h1 className="text-3xl font-bold text-center p-6 text-white-600">
            Movie App 
          </h1>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
