import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesDisplay from './RecipesDisplay.jsx';



const RecipeDetailsDisplay = () => {
  const [recipe, setRecipe] = useState(null);
  const userEmail = localStorage.getItem('userEmail') || ''; // Récupérer l'email
  const [newComment, setNewComment] = useState({ text: '', rating: 0, email: userEmail });
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

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.text.trim()) {
      alert("Veuillez entrer du texte pour le commentaire.");
      return;
    }
  
    try {
      const response = await fetch(`${APIURL}/api/v1/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${YourAuthToken}` // Remplacez par le token réel
        },
        body: JSON.stringify(newComment)
      });
  
      if (response.headers.get("content-type").includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          setRecipe({ ...recipe, comments: [...recipe.comments, data.comment] });
          setNewComment({ text: '', rating: 0 }); // Réinitialiser le formulaire
        } else {
          console.error('Erreur lors de l\'ajout du commentaire:', data.message);
        }
      } else {
        console.log('Réponse non-JSON reçue:', await response.text());
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  


  if (!recipe) {
    return <div>Chargement des détails de la recette...</div>;
  }
  <RecipesDisplay></RecipesDisplay>
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

          {/* Affichage des images */}
          <h3>Images</h3>
          <div className="image-display">
            {recipe.images.map((image, index) => (
              <img key={index} src={`${APIURL}/${image}`} alt={`Image ${index}`} />
            ))}
          </div>

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

          {/* Affichage des catégories */}
          <h3>Catégories</h3>
          <ul>
            {recipe.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>

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

      {/* Formulaire pour ajouter un commentaire */}
      <div><h3>Ajouter un commentaires</h3></div>
      <form onSubmit={submitComment}>
        <span>Texte:</span>
        <textarea name="text" value={newComment.email +': '+ newComment.text} onChange={handleCommentChange} />
        <span>Note:</span>
        <input type="number" name="rating" value={newComment.rating} onChange={handleCommentChange} />
        <button type="submit">Poster le commentaire</button>
      </form>

      {/* Affichage des commentaires */}
      <h3>Commentaires</h3>
      <ul>
        {recipe.comments.map((comment, index) => (
          comment && <li key={index}>{comment.text} - Note: {comment.rating}/5</li>
        ))}
      </ul>
      <RecipesDisplay />
    </div>
  );
};

export default RecipeDetailsDisplay;
