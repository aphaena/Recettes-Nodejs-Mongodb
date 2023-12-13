import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation.jsx'; // Assurez-vous que le chemin est correct

const RecipesManager = () => {
  const [recipes, setRecipes] = useState([]);
  

  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', steps: '', prepTime: 0, categories: [] });
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({});
  const [editNewCategory, setEditNewCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]); 

  const [categories, setCategories] = useState([]); // Ajout de l'état pour les catégories
  const [newCategory, setNewCategory] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');

  const APIURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchRecipes();
    fetchIngredients();      
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${APIURL}/api/v1/recipes`);
      const data = await response.json();
      if (data && data.data && data.data.recipes) {
        setRecipes(data.data.recipes);
        //const extractedCategories = new Set(data.data.recipes.map(recipe => recipe.category));
         // Extraire toutes les catégories de toutes les recettes
         const allCategories = data.data.recipes.reduce((acc, recipe) => {
          recipe.category.forEach(category => {
            if (!acc.includes(category)) {
              acc.push(category);
            }
          });
          return acc;
        }, []);

      // Mettre à jour l'état des catégories avec les catégories uniques
      setCategories(allCategories);
      } else {
        console.error('Données de recettes non trouvées dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    }
  };
  
   // Fonction pour récupérer les ingrédients
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
    if (isEdit) {
      setEditRecipe(prev => ({ ...prev, [name]: value }));
    } else {
      setNewRecipe(prev => ({ ...prev, [name]: value }));
    }
  };

 // Fonction pour gérer la sélection d'un ingrédient
 const handleIngredientSelect = (e) => {
  const selectedIngredientId = e.target.value;
  if (!selectedIngredients.includes(selectedIngredientId)) {
    setSelectedIngredients([...selectedIngredients, selectedIngredientId]);
  }
};

  const handleEditCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'other') {
      setEditRecipe(prev => ({ ...prev, category: 'other' }));
      setEditNewCategory(newCategory); // Réinitialiser editNewCategory si 'other' est sélectionné
    } else {
      setEditRecipe(prev => ({ ...prev, category: selectedCategory }));
      setEditNewCategory(''); // Effacer editNewCategory si une catégorie existante est sélectionnée
    }
  };

  const handleEditNewCategoryChange = (e) => {
    setEditNewCategory(e.target.value);
  };

  const cancelEdit = () => {
    setEditRecipe(null);
  };
  


  // const handleCategorySelectChange = (e) => {
  //   const value = e.target.value;
  //   console.log("Catégorie sélectionnée:", value);
  //   setSelectedCategory(value);
  //   if (value === 'other') {
  //     setNewCategory('');
  //   }
  // };

  const handleCategorySelectChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value !== 'other') {
      addSelectedCategory(value);
    }
  };
  
  const addSelectedCategory = (category) => {
    if (category && !newRecipe.categories.includes(category)) {
      setNewRecipe(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };
  
  const handleAddNewCategory = () => {
    if (newCategory && !newRecipe.categories.includes(newCategory)) {
      setNewRecipe(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  // Fonction pour afficher les catégories sélectionnées
  const renderSelectedCategories = () => {
    return newRecipe.categories.map((category, index) => (
      <li key={index}>{category}</li>
    ));
  };


  const addRecipe = async () => {
    try {
      // Vérifier si les champs requis sont remplis
      if (!newRecipe.title || !newRecipe.description || !newRecipe.steps || newRecipe.prepTime === 0) {
        console.error("Tous les champs requis doivent être remplis.");
        return;
      }
  
      // Déterminer les catégories à envoyer
      let categoriesToSend;
      if (selectedCategory === 'other' && newCategory) {
        categoriesToSend = [newCategory];
      } else if (selectedCategory && selectedCategory !== 'other') {
        categoriesToSend = [selectedCategory];
      } else {
        console.error("Catégorie non spécifiée.");
        return;
      }
  
      // Préparer les données de la recette
      const recipeData = { ...newRecipe, categories: categoriesToSend, 
        ingredients: selectedIngredients.map(id => ({ ingredient: id, quantity: '1' })) 
      };
  
      // Envoyer la requête
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
  
      if (response.ok) {
        fetchRecipes();
        setNewRecipe({ title: '', description: '', steps: '', prepTime: 0, categories: [] });
        setSelectedIngredients([]);
        setNewCategory('');
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de la recette:', errorData);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
    }
  };
  

  const startEdit = (recipe) => {
    setEditRecipeId(recipe._id);
    setEditRecipe({ ...recipe });
    const recipeIngredientIds  = recipe.ingredients.map(ing => ing.ingredient._id);
    setSelectedIngredients(recipeIngredientIds );
  };

  // Fonction pour ajouter une nouvelle catégorie
  const addCategory = () => {
    if (newCategory && !newRecipe.categories.includes(newCategory)) {
      setNewRecipe(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  const editRecipeSubmit = async () => {
    try {
      let recipeData = { ...editRecipe };
      if (recipeData.category === 'other' && editNewCategory) {
        recipeData.category = editNewCategory;
        if (!categories.includes(editNewCategory)) {
          setCategories([...categories, editNewCategory]);
        }
      }
  
      // Assurez-vous que la catégorie est définie
      // if (!recipeData.category) {
      //   console.error("La catégorie est requise.");
      //   return;
      // }
  
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${editRecipeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
  
      if (response.ok) {
        setEditRecipeId(null);
        setEditRecipe({});
        fetchRecipes();
        setSelectedIngredients([]);
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la modification de la recette:', errorData.message);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la recette:', error);
    }
  };
  
  

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${recipeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchRecipes();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
    }
  };



  return (
    <div>
      <div>
      <Navigation />    
      </div>
      <h2>Gestion des Recettes</h2>
      {!editRecipeId && (
      <div>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Titre de la recette"
        />
        <textarea
          name="description"
          value={newRecipe.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <textarea
          name="steps"
          value={newRecipe.steps}
          onChange={handleInputChange}
          placeholder="Étapes (séparées par des virgules)"
        />
        <input
          type="number"
          name="prepTime"
          value={newRecipe.prepTime}
          onChange={handleInputChange}
          placeholder="Temps de préparation (en minutes)"
        />
         <label htmlFor="ingredient">Ingrédient :</label>
        <select name="ingredient" onChange={handleIngredientSelect}>
          {ingredients.map(ingredient => (
            <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
          ))}
        </select>
        {/* Afficher les ingrédients sélectionnés */}
        <ul>
          {selectedIngredients.map(id => (
            <li key={id}>{ingredients.find(ingredient => ingredient._id === id)?.name || id}</li>
          ))}
        </ul>
{/*      
        <label htmlFor="category">Catégorie :</label>
        <select name="category" value={selectedCategory} onChange={handleCategorySelectChange}>
        {categories.map(category => <option key={category} value={category}>{category}</option>)}
        <option value="other">Autre</option>
      </select>
    {selectedCategory  === 'other' && (
      <div>
    <input 
      type="text" 
      value={newCategory} 
      onChange={(e) => setNewCategory(e.target.value)} 
      placeholder="Nouvelle catégorie" />    
      <ul>{renderSelectedCategories()}</ul>
    <button onClick={addSelectedCategory}>Ajouter Catégorie</button>
    </div>
    )} */}

<select name="category" value={selectedCategory} onChange={handleCategorySelectChange}>
  {categories.map(category => <option key={category} value={category}>{category}</option>)}
  <option value="other">Autre</option>
</select>
{selectedCategory === 'other' && (
  <div>
    <input 
      type="text" 
      value={newCategory} 
      onChange={(e) => setNewCategory(e.target.value)} 
      placeholder="Nouvelle catégorie" 
    />
    <button onClick={handleAddNewCategory}>Ajouter Catégorie</button>
  </div>
)}
     
     

  {/* Afficher les catégories existantes */}
  <ul>
    {newRecipe.categories.map((category, index) => (
      <li key={index}>{category}</li>
    ))}
  </ul>
        <button onClick={addRecipe}>Ajouter une recette</button>
      </div>
      )}
      {editRecipeId && (
        <div>
          <input
            type="text"
            name="title"
            value={editRecipe.title}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Titre de la recette"
          />
          <textarea
            name="description"
            value={editRecipe.description}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Description"
          />
          <textarea
            name="steps"
            value={editRecipe.steps}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Étapes (séparées par des virgules)"
          />
          <input
            type="number"
            name="prepTime"
            value={editRecipe.prepTime}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Temps de préparation (en minutes)"
          />
        <label htmlFor="ingredient">Ingrédient :</label>
        <select name="ingredient" onChange={handleIngredientSelect}>
          {ingredients.map(ingredient => (
            <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
          ))}
        </select>
        {/* Afficher les ingrédients sélectionnés */}
        <ul>
          {selectedIngredients.map(id => {
            const ingredient = ingredients.find(ing => ing._id === id);
            return <li key={id}>{ingredient ? ingredient.name : id}</li>;
          })}
        </ul>
        <label htmlFor="category">Catégorie :</label>
        <select name="category" value={selectedCategory} onChange={handleCategorySelectChange}>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
          <option value="other">Autre</option>
        </select>
        {selectedCategory === 'other' && (
          <input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="Nouvelle catégorie" 
          />
        )}
          <button onClick={editRecipeSubmit}>Modifier la recette</button>
          <button onClick={cancelEdit}>Annuler la modification</button>
        </div>
                
      )}
      
     
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            {recipe.title}
            <button onClick={() => startEdit(recipe)}>Modifier</button>
            <button onClick={() => deleteRecipe(recipe._id)}>Supprimer</button>
          </li>
        ))}
      </ul>


    </div>
    
  );
};

export default RecipesManager;
