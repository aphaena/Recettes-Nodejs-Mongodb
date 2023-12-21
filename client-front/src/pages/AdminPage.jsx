import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Importez Link ici
import Navigation from './Navigation.jsx';

function AdminPage() {
  return (
    <div className="container">
      <div>
        <Navigation />
      </div>
      <h1>Page d'Administration</h1>

      <nav>
        <Link to="users"> Gérer les Users </Link>
        <Link to="ingredients"> Gérer les Ingrédients </Link>
        <Link to="recipes"> Gérer les Recettes </Link>
      </nav>
      <Outlet /> {/* Ici, les composants enfants seront rendus */}
    </div>
  );
}

export default AdminPage;
