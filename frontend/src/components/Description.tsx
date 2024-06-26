import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Description: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    _id: '',
    title: '',
    description: '',
    releaseyear: '',
    genre: '',
    watchstatus: '',
    rating: '',
    review: ''
  });

  const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/movie/${id}`, { headers })
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  return (
    <div className="container mx-auto mt-5 border-t-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold">Title: {movie.title}</h1>
        <p className="mt-2"><strong>Description:</strong> {movie.description}</p>
        <p className="mt-2"><strong>Release Year:</strong> {movie.releaseyear}</p>
        <p className="mt-2"><strong>Genre:</strong> {movie.genre}</p>
        <p className="mt-2"><strong>Watch Status:</strong> {movie.watchstatus ? 'Watched' : 'Unwatched'}</p>
        <p className="mt-2"><strong>Rating:</strong> {movie.rating}</p>
        <p className="mt-2"><strong>Review:</strong> {movie.review}</p>
        <div className="flex justify-between">
        <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate('/')}>
            Cancel
          </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => navigate(`/add/${id}`)}
        >
          Edit
        </button>
          </div>
      </div>
    </div>
  );
};

export default Description;
