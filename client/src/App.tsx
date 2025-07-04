import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PropertyDetail from './pages/PropertyDetail';
import AdminDashboard from './pages/AdminDashboard';
import CreateProperty from './pages/CreateProperty';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProperty from './pages/EditProperty';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
     <div className="font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
        />
        <Route
          path="/admin/create"
          element={<ProtectedRoute element={<CreateProperty />} requiredRole="admin" />}
        />
        <Route
          path="/admin/edit/:id"
          element={<ProtectedRoute element={<EditProperty />} requiredRole="admin" />}
        />
      </Routes>
    </div>
    );  
}

export default App;
