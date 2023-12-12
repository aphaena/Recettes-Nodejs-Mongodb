
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import IngredientsManager from './pages/admin/IngredientsManager.jsx'; // Assurez-vous que ce composant existe
import RecipesManager from './pages/admin/RecipesManager.jsx'; // Assurez-vous que ce composant existe

import './App.css';
import './style.css';

function App() {
return (  
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/ingredients" element={<IngredientsManager />} />
        <Route path="/admin/recipes" element={<RecipesManager />} />
    </Routes>
  );
}

export default App
