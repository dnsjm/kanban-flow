import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('token');

    // Although we have the user in context, a page refresh clears it.
    // A robust solution would involve a "me" endpoint to verify the token
    // on app load. For now, we'll just check for the token's existence.
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
