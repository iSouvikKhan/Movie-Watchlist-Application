import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


interface Errors {
  title?: string;
  description?: string;
  releaseyear?: string;
  genre?: string;
  watchstatus?: string;
  rating?: string;
  review?: string;
}


const AddEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseyear: '',
    genre: '',
    watchstatus: '',
    rating: '',
    review: ''
  });


  const [errors, setErrors] = useState<Errors>({});


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
    if (id) {
      axios.get(`http://localhost:3000/api/v1/movie/${id}`, { headers })
        .then(response => setMovie(response.data))
        .catch(error => console.error('Error fetching movie:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    // const { name, value } = e.target;
    // if(value === 'true' || value === 'false'){
    //   const newValue = value === "true";
    //   setMovie(prevMovie => ({ ...prevMovie, [name]: newValue }));
    // }
    // else{
    //   setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
    // }

    const { name, value } = e.target;
    setMovie(prevMovie => {
      let newValue: string | number | boolean = value;

      if (value === 'true' || value === 'false') {
        newValue = value === 'true';
      } else if (name === 'releaseyear' || name === 'rating') {
        newValue = Number(value);
      }

      return { ...prevMovie, [name]: newValue };
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const newErrors: Errors = {};
    if (!movie.title) newErrors.title = 'minimum 5 characters';
    if (!movie.description) newErrors.description = 'minimum 5 characters';
    if ( typeof movie.releaseyear === 'number' && (movie.releaseyear < 1900 || movie.releaseyear > 2100) ) newErrors.releaseyear = 'Release Year must be between 1900 and 2100';
    if (!movie.genre) newErrors.genre = 'minimum 5 characters';
    if (movie.watchstatus === '') newErrors.watchstatus = 'Watch Status is required';
    if ( typeof movie.rating === 'number' && (movie.rating < 1 || movie.rating > 5) ) newErrors.rating = 'Rating must be between 1 and 5';
    if (!movie.review) newErrors.review = 'minimum 5 characters';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
      console.log('Movie submitted:', movie);
    }


    try {

        if (id) {
          await axios.put(`http://localhost:3000/api/v1/movie/${id}`, movie, { headers });
        } else {
          await axios.post('http://localhost:3000/api/v1/movie', movie, { headers });
        }
        navigate('/');

    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <div className="container mx-auto mt-5 border-t-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Release Year</label>
          <input
            type="number"
            name="releaseyear"
            value={movie.releaseyear}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.releaseyear && <p className="text-red-500 text-sm">{errors.releaseyear}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Watch Status</label>
          <select
            name="watchstatus"
            value={String(movie.watchstatus)}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">--- select ---</option>
            <option value="true">Watched</option>
            <option value="false">Unwatched</option>
          </select>
          {errors.watchstatus && <p className="text-red-500 text-sm">{errors.watchstatus}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Review</label>
          <textarea
            name="review"
            value={movie.review}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
        </div>
        <div className="flex justify-between">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEdit;
