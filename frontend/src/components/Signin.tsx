import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Errors {
  username?: string;
  password?: string;
}

const Signin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Errors>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if(!username) newErrors.username = 'username is required';
    if(!password) newErrors.password = 'password is required';
    if(Object.keys(newErrors).length > 0){
      setError(newErrors);
      return;
    } else {
      setError({});
      console.log('Login successful');
    }

    try {
      const response = await axios.post('https://movie-watchlist-application-hf26.onrender.com/api/v1/user/signin', {
        username,
        password,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
      else{
        console.log("Signin token error");
      }
    } catch (error: any) {
      if(error.response.status === 411){
        newErrors.password = error.response.data.message;
        setError(newErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
            />
            {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-indigo-600">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
