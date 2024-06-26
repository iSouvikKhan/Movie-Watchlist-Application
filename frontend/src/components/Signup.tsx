import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Errors {
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [error, setError] = useState<Errors>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if(!username) newErrors.username = 'provide an email';
    if(!password || password.length < 6) newErrors.password = 'minimum 6 characters';
    if(!firstname) newErrors.firstname = 'minimum 5 characters';
    if(!lastname) newErrors.lastname = 'minimum 5 characters';
    if(Object.keys(newErrors).length > 0){
      setError(newErrors);
      return;
    } else {
      setError({});
      console.log('User submitted');
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        username,
        password,
        firstname,
        lastname,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
      else {
        console.log("Signup token error");
      }
    } catch (error: any) {
      if(error.response.status === 411){
        newErrors.username = error.response.data.message;
        setError(newErrors);
      }
      console.log("Signup catch error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
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
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
            />
            {error.firstname && <p className="text-red-500 text-sm">{error.firstname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
            />
            {error.lastname && <p className="text-red-500 text-sm">{error.lastname}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/" className="text-indigo-600">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
