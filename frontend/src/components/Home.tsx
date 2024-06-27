import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { MovieCard } from './MovieCard';
import { Movie } from '../model/Movietypes';


const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://movie-watchlist-application-hf26.onrender.com/api/v1/movie/', { headers });
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://movie-watchlist-application-hf26.onrender.com/api/v1/movie/${id}`, { headers });
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleToggleWatchStatus = async (movie: Movie) => {
    try {
      const updatedMovie = { ...movie, watchstatus: !movie.watchstatus };
      await axios.put(`https://movie-watchlist-application-hf26.onrender.com/api/v1/movie/${movie._id}`, updatedMovie, { headers });
      setMovies(movies.map(m => m._id === movie._id ? updatedMovie : m));
    } catch (error) {
      console.error('Error toggling watch status:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate('/add')}
        >
          Add Movie
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onDelete={handleDelete}
              onToggleWatchStatus={handleToggleWatchStatus}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
