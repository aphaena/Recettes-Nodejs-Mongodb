import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return <Navigate to="/" />;
    }
    else {
        console.log("le token est trouvé dans localstorage");
    }

    // Si l'utilisateur est connecté, afficher le composant enfant
    return children;
};

export default ProtectedRoute; 
