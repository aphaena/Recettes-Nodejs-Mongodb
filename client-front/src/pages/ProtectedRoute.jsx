// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
//         return <Navigate to="/" />;
//     }
//     else {
//         console.log("le token est trouvé dans localstorage");
//     }

//     // Si l'utilisateur est connecté, afficher le composant enfant
//     return children;
// };

// export default ProtectedRoute; 
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState(null);
    const token = localStorage.getItem('token');
    const APIURL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`${APIURL}/api/v1/auth/verifyToken`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    console.log("le token est valide sur le serveur");
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du token:', error);
                setIsValidToken(false);
            }
        };

        if (token) {
            verifyToken();
        } else {
            setIsValidToken(false);
        }
    }, [token, APIURL]);

    if (isValidToken === null) {
        // Afficher un indicateur de chargement ou retourner null pendant la vérification
        return <div>Chargement...</div>;
    }

    if (!isValidToken) {
        // Si le token n'est pas valide ou absent, rediriger vers la page de connexion
        return <Navigate to="/" />;
    }

    // Si le token est valide, afficher le composant enfant
    return children;
};

export default ProtectedRoute;
