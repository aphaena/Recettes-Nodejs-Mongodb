import React from 'react';

const IngredientSelect = ({ ingredients, selectedIngredients, onIngredientSelect }) => {
  return (
    <div>
      <label htmlFor="ingredient">Ingrédient :</label>
      <select name="ingredient" onChange={onIngredientSelect}>
        {ingredients.map(ingredient => (
          <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
        ))}
      </select>

      {/* Afficher les ingrédients sélectionnés */}
      <ul>
        {selectedIngredients.map(id => {
          const ingredient = ingredients.find(ing => ing._id === id);
          return ingredient ? <li key={id}>{ingredient.name}</li> : null;
        })}
      </ul>
    </div>
  );
};

export default IngredientSelect;
