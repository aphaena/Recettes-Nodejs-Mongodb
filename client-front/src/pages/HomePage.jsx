import React from 'react';
import { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

    
    function HomePage() {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const navigate = useNavigate();
        const [error, setError] = React.useState('');
        const APIURL = import.meta.env.VITE_APP_API_URL;
        
        const handleLogin = async () => {
            try {
              console.log('Email:', email, 'Password:', password);
              console.log('URL:', `${APIURL}/api/v1/auth/login`);
              
              const response = await fetch(`${APIURL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
              });

              if (response.ok) {
                // ... Connexion réussie
                console.log('Connexion réussie');
              } else {
                // Afficher un message d'erreur
                setError('Erreur de connexion : Email ou mot de passe incorrect.');
              }
        
              const data = await response.json();
        
              if (response.ok) {
                // Gérer la sauvegarde du token, la gestion de l'état d'authentification, etc.
                console.log('Connexion réussie:', data);
                navigate('/admin');
              } else {
                // Gérer les erreurs de connexion
                console.error('Erreur de connexion:', data.message);
              }
            } catch (error) {
              console.error('Erreur:', error);
            }
          };
        
          return (
            <div>
              <h1>Bienvenue sur l'Application</h1>
              {error && <p className="error">{error}</p>}
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
              <button onClick={handleLogin}>Connexion</button>
            </div>
          );
    }
    
    export default HomePage;
     