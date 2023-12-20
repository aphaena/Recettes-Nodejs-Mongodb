import React from 'react';

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  // Liste des recettes avec options de modification et suppression
  return (
    <ul>
      {recipes.map(recipe => (
        <li key={recipe._id}>
          {recipe.title}
          <button onClick={() => onEdit(recipe)}>Modifier</button>
          <button onClick={() => onDelete(recipe._id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
