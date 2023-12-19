import React from 'react';
import IngredientSelect from './IngredientSelect';
import CategorySelect from './CategorySelect';

const RecipeForm = ({ recipe, onInputChange, onIngredientSelect, onCategorySelect, onSubmit }) => {
  // Formulaire pour ajouter ou modifier une recette
  return (
    <div>
      {/* Champs de saisie pour le titre, la description, etc. */}
      <IngredientSelect
        selectedIngredients={recipe.ingredients}
        onIngredientSelect={onIngredientSelect}
      />
      <CategorySelect
        selectedCategory={recipe.category}
        onCategorySelect={onCategorySelect}
      />
      <button onClick={onSubmit}>Enregistrer</button>
    </div>
  );
};

export default RecipeForm;
