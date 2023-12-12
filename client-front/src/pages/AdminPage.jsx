import React from 'react';
import { Link , Outlet } from 'react-router-dom'; // Importez Link ici

function AdminPage() {
  return (
    <div>
      <h1>Page d'Administration</h1>
      <nav>
        <Link to="ingredients"> Gérer les Ingrédients </Link>
        <Link to="recipes"> Gérer les Recettes </Link>
      </nav>
      <Outlet /> {/* Ici, les composants enfants seront rendus */}
    </div>
  );
}

export default AdminPage;
