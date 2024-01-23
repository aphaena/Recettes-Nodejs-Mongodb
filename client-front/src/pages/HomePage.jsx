import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipesDisplay from './RecipesDisplay.jsx';


function HomePage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const APIURL = import.meta.env.VITE_APP_API_URL;
  const [isLoginMode, setIsLoginMode] = useState(true); // État pour suivre le mode actuel
  // ... Autres états ...
  console.log("HomePage");

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
        // Enregistrer le token dans le localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email); // Stocker l'email

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

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${APIURL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inscription réussie:', data);
        navigate('/'); // Rediriger vers la page de connexion ou autre page appropriée
        toggleMode();
      } else {
        setError(data.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); // Basculer entre les modes
    setError(''); // Réinitialiser les messages d'erreur
};


  return (
    <div className = "container">
      <h1>Bienvenue sur l'Application Recettes</h1>      

      {error && <p className="error">{error}</p>}

      {isLoginMode ? (
                // Formulaire de connexion
                <>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                    <button onClick={handleLogin}>Connexion</button>
                </>
            ) : (
                // Formulaire d'inscription
                <>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" />
                    
                    <button onClick={handleSignUp}>S'inscrire</button>
                  
                </>
            )}

            {/* Bouton pour basculer entre les modes */}
            <div>
              <button onClick={toggleMode}>
                  {isLoginMode ? "S'inscrire" : "Se connecter"}
              </button>
            </div>
            <RecipesDisplay />

    </div>
    
  );
  
}

export default HomePage;
