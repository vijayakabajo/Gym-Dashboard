import React from 'react'
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    // Render the component if the user is authenticated
    return <Component />;
}

export default ProtectedRoute;
