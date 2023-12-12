import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation.jsx'; // Assurez-vous que le chemin est correct

const IngredientsManager = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantite: 0,
    nutritionInfo: {
      calories: 0,
      protein: 0,
      fat: 0
    }
  });
  const [editIngredient, setEditIngredient] = useState(null);
  const APIURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`${APIURL}/api/v1/ingredients`);
      const data = await response.json();
      if (data && data.data && data.data.ingredients) {
        setIngredients(data.data.ingredients);
      } else {
        console.error('Données d\'ingrédients non trouvées dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des ingrédients:', error);
    }
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (name in newIngredient.nutritionInfo) {
      const updatedNutritionInfo = {
        ...isEdit ? editIngredient.nutritionInfo : newIngredient.nutritionInfo,
        [name]: Number(value)
      };
      if (isEdit) {
        setEditIngredient(prev => ({ ...prev, nutritionInfo: updatedNutritionInfo }));
      } else {
        setNewIngredient(prev => ({ ...prev, nutritionInfo: updatedNutritionInfo }));
      }
    } else {
      if (isEdit) {
        setEditIngredient(prev => ({ ...prev, [name]: value }));
      } else {
        setNewIngredient(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  const addIngredient = async () => {
    try {
      const response = await fetch(`${APIURL}/api/v1/ingredients/ingredient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIngredient)
      });
      if (response.ok) {
        setNewIngredient({
          name: '',
          quantite: '',
          nutritionInfo: {
            calories: '',
            protein: '',
            fat: ''
          }
        });
        fetchIngredients();
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'ingrédient:', error);
    }
  };

  const startEdit = (ingredient) => {
    setEditIngredient(ingredient);
  };

  const editIngredientSubmit = async () => {
    try {
      const response = await fetch(`${APIURL}/api/v1/ingredients/ingredient/${editIngredient._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editIngredient)
      });
      if (response.ok) {
        setEditIngredient(null);
        fetchIngredients();
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'ingrédient:', error);
    }
  };

  const deleteIngredient = async (ingredientId) => {
    try {
      const response = await fetch(`${APIURL}/api/v1/ingredients/ingredient/${ingredientId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchIngredients();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ingrédient:', error);
    }
  };

  return (
    
    <div>
      <div>
      <Navigation />    
      </div>
      <h2>Gestion des Ingrédients</h2>              
      <div>
        <input
          type="text"
          name="name"
          value={newIngredient.name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Nom de l'ingrédient"
        />
        {/* Ajoutez des champs pour quantité, calories, protéines, et graisses ici */}
        <input
          type="text"
          name="quantite"
          value={newIngredient.quantite}
          onChange={(e) => handleInputChange(e)}
          placeholder="Quantité"
        />
        <input
          type="text"
          name="calories"
          value={newIngredient.calories}
          onChange={(e) => handleInputChange(e)}
          placeholder="Calories"
        />
        <input
          type="text"
          name="protein"
          value={newIngredient.protein}
          onChange={(e) => handleInputChange(e)}
          placeholder="Protéines"
        />
        <input
          type="text"
          name="fat"
          value={newIngredient.fat}
          onChange={(e) => handleInputChange(e)}
          placeholder="Graisses"
        />
        <button onClick={addIngredient}>Ajouter</button>
      </div>
      {editIngredient && (
        <div>
          <input
            type="text"
            name="name"
            value={editIngredient.name}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Modifier le nom de l'ingrédient"
          />
          {/* Ajoutez des champs pour modifier quantité, calories, protéines, et graisses ici */}
          <input
            type="text"
            name="quantite"
            value={editIngredient.quantite}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Quantité"
          />
          <input
            type="text"
            name="calories"
            value={editIngredient.calories}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Calories"
          />
          <input
            type="text"
            name="protein"
            value={editIngredient.protein}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Protéines"
          />
          <input
            type="text"
            name="fat"
            value={editIngredient.fat}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Graisses"
          />
          <button onClick={editIngredientSubmit}>Modifier</button>
        </div>
      )}
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient._id}>
              {ingredient.name}
              {ingredient.nutritionInfo ? (
                <span>
                  - Calories: {ingredient.nutritionInfo.calories}, 
                  Protéines: {ingredient.nutritionInfo.protein}, 
                  Graisses: {ingredient.nutritionInfo.fat}
                </span>
              ) : (
                <span> - Informations nutritionnelles non disponibles</span>
              )}
              <button onClick={() => startEdit(ingredient)}>Modifier</button>
              <button onClick={() => deleteIngredient(ingredient._id)}>Supprimer</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IngredientsManager;
