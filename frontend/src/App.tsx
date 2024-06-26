import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import Signin from './components/Signin';
import AddEdit from './components/AddOrEdit';
import Description from './components/Description';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddEdit /></PrivateRoute>} />
        <Route path="/add/:id" element={<PrivateRoute><AddEdit /></PrivateRoute>} />
        <Route path="/description/:id" element={<PrivateRoute><Description /></PrivateRoute>} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
