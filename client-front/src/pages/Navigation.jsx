// Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="../">page Connexion</Link> 
      <Link to="../admin">page Admin</Link> 
      <Link to="../admin/ingredients">Gérer les Ingrédients</Link>
      <Link to="../admin/recipes">Gérer les Recettes</Link>
      {/* Ajoutez d'autres liens si nécessaire */}
    </nav>
  );
};

export default Navigation;
