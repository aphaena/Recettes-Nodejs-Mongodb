// Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="../">Page Connexion</Link> 
      <Link to="../admin">Page Admin</Link> 
      <Link to="../admin/users">Gérer les Users</Link>
      <Link to="../admin/ingredients">Gérer les Ingrédients</Link>
      <Link to="../admin/recipes">Gérer les Recettes</Link>
      {/* Ajoutez d'autres liens si nécessaire */}
    </nav>
  );
};

export default Navigation;
