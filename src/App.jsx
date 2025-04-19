import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/chat' element={<Teams />} />
      </Routes>
    </Router>
  );
}

export default App;