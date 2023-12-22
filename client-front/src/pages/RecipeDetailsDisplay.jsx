import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesDisplay from './RecipesDisplay.jsx';

const RecipeDetailsDisplay = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const APIURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${recipeId}`);
        const data = await response.json();
        if (response.ok) {
          setRecipe(data.data.recipe);
        } else {
          console.error('Erreur lors de la récupération des détails de la recette');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, APIURL]);

  if (!recipe) {
    return <div>Chargement des détails de la recette...</div>;
  }

  return (
    <div>
      {recipe ? (
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <p>Temps de préparation: {recipe.prepTime} minutes</p>

          <h3>Ingrédients</h3>
        <ul>
          {recipe.ingredients.map((item, index) => (
            item.ingredient && <li key={index}>{item.quantity} g - {item.ingredient.name}  </li>
          ))}
        </ul>
        <h3>Informations Nutritionnelles</h3>
        <p>Calories totales: {
          recipe.ingredients && recipe.ingredients.reduce((totalCalories, item) => {
            const ingredientCaloriesPerUnit = item.ingredient && item.ingredient.nutritionInfo.calories;
            const ingredientQuantityRatio = item.ingredient && item.quantity / item.ingredient.quantite;
            return totalCalories + (ingredientCaloriesPerUnit * ingredientQuantityRatio);
          }, 0).toFixed(2) + " "
        } calories</p>
          <h3>Étapes</h3>
          <ol>
          {recipe.steps.length > 0 && recipe.steps[0].includes(',') ? 
           recipe.steps && recipe.steps[0].split(',').map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))
            :
            recipe.steps && recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))
          }
        </ol>
          <h3>Commentaires</h3>
          <ul>
            {recipe.comments.map((comment, index) => (
            comment && <li key={index}>{comment.text} - Note: {comment.rating}/5</li>
            ))}
          </ul>
          {/* Affichez d'autres détails si nécessaire */}
        </div>
      ) : (
        <p>Chargement des détails de la recette...</p>
      )}
      <RecipesDisplay/>
    </div>
  );
};

export default RecipeDetailsDisplay;
