import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/Movietypes';
import myImage from '../assets/placeholder.jpg';

interface MovieCardProps {
    movie: Movie;
    onDelete: (id: string) => void;
    onToggleWatchStatus: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete, onToggleWatchStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 border-t-4 rounded shadow-md">

<img
    src={myImage}
    alt="Placeholder"
    className="w-full rounded-md mb-5"
  />  
      <h3 className="mb-4 text-center text-lg font-bold">{movie.title}</h3>
      <button
        className="bg-blue-500 text-white mx-2 px-2 py-1 rounded mt-2"
        onClick={() => navigate(`/description/${movie._id}`)}
      >
        Description
      </button>

      <button
        className="bg-red-500 text-white mx-2 px-2 py-1 rounded"
        onClick={() => onDelete(movie._id)}
      >
        Delete
      </button>
      
      {/* <button
        className={`mt-2 mx-2 px-2 py-1 rounded ${movie.watchstatus ? 'bg-green-500' : 'bg-yellow-500'}`}
        onClick={() => onToggleWatchStatus(movie)}
      >
        {movie.watchstatus ? 'Watched' : 'Unwatched'}
      </button> */}

    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={movie.watchstatus}
        onChange={() => onToggleWatchStatus(movie)}
      />
      <div className="m-2 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring dark:peer-focus:ring rounded-full peer bg-grey peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="text-sm font-medium text-black dark:text-black-600">
        {movie.watchstatus ? 'Watched' : 'Not watched'}
      </span>
    </label>

    </div>
  );
};
