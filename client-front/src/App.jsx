
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import HomePage from './pages/HomePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import IngredientsManager from './pages/admin/IngredientsManager.jsx'; // Assurez-vous que ce composant existe
import RecipesManager from './pages/admin/RecipesManager.jsx'; // Assurez-vous que ce composant existe
import UsersManager from './pages/admin/UsersManager.jsx';
import RecipesDisplay from './pages/RecipesDisplay.jsx';
import RecipeDetailsDisplay from './pages/RecipeDetailsDisplay.jsx';


import './App.css';
import './style.css';


const App = () => {
  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recettes" element={<RecipesDisplay />} />
      <Route path="/recipe-details/:recipeId" element={<RecipeDetailsDisplay />} />

      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      } />

      <Route path="/admin/ingredients" element={
        <ProtectedRoute>
          <IngredientsManager />
        </ProtectedRoute>
      } />
      <Route path="/admin/recipes" element={
        <ProtectedRoute>
          <RecipesManager />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <UsersManager />
        </ProtectedRoute>
      } />

    </Routes>

  );
};

export default App;
