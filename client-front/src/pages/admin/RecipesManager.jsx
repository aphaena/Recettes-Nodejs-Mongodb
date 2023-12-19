import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation.jsx'; // Assurez-vous que le chemin est correct

const RecipesManager = () => {
  const [recipes, setRecipes] = useState([]);
  

  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', steps: '', prepTime: 5, category: [] });
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


// Définition de la fonction handleInputChange avec deux paramètres : 
// e (l'événement) et isEdit (un booléen qui indique si l'on est en train de modifier une recette existante).
const handleInputChange = (e, isEdit = false) => {
  
  // Extraction des propriétés 'name' et 'value' de l'objet 'target' de l'événement 'e'.
  // 'name' correspond au nom de l'input (par exemple, 'title', 'description', etc.),
  // et 'value' correspond à la valeur saisie dans cet input.
  const { name, value } = e.target;

  // Vérification si on est en mode édition d'une recette existante.
  if (isEdit) {
    // Si on est en mode édition, on met à jour l'état 'editRecipe' en utilisant la fonction 'setEditRecipe'.
    // 'prev' représente l'état précédent de 'editRecipe'.
    // On utilise l'opérateur de propagation '...' pour copier toutes les propriétés existantes de 'editRecipe',
    // puis on met à jour la propriété correspondant au 'name' de l'input avec la nouvelle 'value'.
    setEditRecipe(prev => ({ ...prev, [name]: value }));
  } else {
    // Si on n'est pas en mode édition (c'est-à-dire en mode ajout d'une nouvelle recette),
    // on met à jour l'état 'newRecipe' en utilisant la fonction 'setNewRecipe'.
    // Le processus est similaire à celui décrit ci-dessus pour 'editRecipe'.
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  }
};

const handleIngredientSelect = (e) => {
  const selectedIngredientId = e.target.value;
  if (editRecipeId) {
    // En mode édition, mettre à jour editRecipe
    setEditRecipe(prev => {
      const updatedIngredients = prev.ingredients ? [...prev.ingredients] : [];
      if (!updatedIngredients.some(ing => ing.ingredient === selectedIngredientId)) {
        updatedIngredients.push({ ingredient: selectedIngredientId, quantity: '1' });
      }
      return { ...prev, ingredients: updatedIngredients };
    });
  } else {
    // En mode ajout, mettre à jour selectedIngredients
    if (!selectedIngredients.includes(selectedIngredientId)) {
      setSelectedIngredients([...selectedIngredients, selectedIngredientId]);
    }
  }
};


  const cancelEdit = () => {
    setEditRecipe(null);
  };
   
const handleCategorySelectChangeEditMode = (e) => {
  const value = e.target.value;
  setSelectedCategory(value);
  if (value !== 'other') {
    setEditRecipe(prev => {
      const updatedCategory = prev.category ? [...prev.category] : [];
      if (!updatedCategory.includes(value)) {
        updatedCategory.push(value);
        // Mettre à jour les catégories globales si la catégorie n'est pas déjà présente
        if (!categories.includes(value)) {
          setCategories(currentCategories => [...currentCategories, value]);
        }
      }
      return { ...prev, category: updatedCategory };
    });
  }
};


// Définition de la fonction handleCategorySelectChange avec un paramètre : 
// e (l'événement), qui est déclenché lorsqu'une catégorie est sélectionnée dans le menu déroulant.
const handleCategorySelectChangeAddMode = (e) => {
  const value = e.target.value;
  setSelectedCategory(value);
  if (value !== 'other') {
    setNewRecipe(prev => {
      // Assurez-vous que prev.category est initialisé comme un tableau
      const updatedCategory = prev.category ? [...prev.category] : [];
      if (!updatedCategory.includes(value)) {
        updatedCategory.push(value);
         // Mettre à jour les catégories globales si la catégorie n'est pas déjà présente
         if (!categories.includes(value)) {
          setCategories(currentCategories => [...currentCategories, value]);
        }
      }
      return { ...prev, category: updatedCategory };
    });
  }
};
  
// Définition de la fonction 'handleAddNewCategory' qui ne prend aucun paramètre.
// Cette fonction est appelée lorsqu'un utilisateur souhaite ajouter une nouvelle catégorie à la recette.
const handleAddNewCategory = () => {
  if (newCategory && !newRecipe.category.includes(newCategory)) {
    setNewRecipe(prev => ({
      ...prev,
      category: [...prev.category,  newCategory]
    }));
    setNewCategory('');
  }
};


  // Définition de la fonction asynchrone 'addRecipe'.
const addRecipe = async () => {
  try {
    // Vérifier si tous les champs requis pour une nouvelle recette sont remplis.
    if (!newRecipe.title || !newRecipe.description || !newRecipe.steps || newRecipe.prepTime === 0) {
      console.error("Tous les champs requis doivent être remplis.");
      return; // Arrêter l'exécution de la fonction si un champ requis est manquant.
    }

    // Déterminer les catégories à envoyer avec la nouvelle recette.
    let categoriesToSend;
    if (selectedCategory === 'other' && newCategory) {
      // Si l'utilisateur a sélectionné 'other' et a entré une nouvelle catégorie.
      categoriesToSend = [newCategory];
    } else if (selectedCategory && selectedCategory !== 'other') {
      // Si une catégorie existante est sélectionnée.
      categoriesToSend = [selectedCategory];
    } else {
      // Si aucune catégorie n'est spécifiée.
      console.error("Catégorie non spécifiée.");
      return; // Arrêter l'exécution de la fonction.
    }

    // Préparer les données de la nouvelle recette.
    const recipeData = {
      ...newRecipe, // Copier toutes les propriétés de 'newRecipe'.
      category: newRecipe.category, // Utiliser les catégories sélectionnées.
      ingredients: selectedIngredients.map(id => ({ ingredient: id, quantity: '1' })) // Mapper les ingrédients sélectionnés avec leur quantité.
    };

    console.log("newCategory:" , newCategory);
    console.log("recipeData.category:" , recipeData.category);
    console.log("newRecipe:" , newRecipe);

    // Envoyer une requête POST pour ajouter la nouvelle recette.
    const response = await fetch(`${APIURL}/api/v1/recipes/recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData) // Convertir les données de la recette en JSON.
    });

    console.log(" JSON.stringify(recipeData):",  JSON.stringify(recipeData));

    // Vérifier si la requête a réussi.
    if (response.ok) {
      const updatedGlobalCategories = [...new Set([...categories, ...newRecipe.category])];
      setCategories(updatedGlobalCategories);
      fetchRecipes(); // Récupérer la liste mise à jour des recettes.
      // Réinitialiser les états pour les champs de saisie de la recette.
      setNewRecipe({ title: '', description: '', steps: '', prepTime: 0, category: [] });
      setSelectedIngredients([]);
      setNewCategory('');
    } else {
      // Gérer les erreurs de réponse.
      const errorData = await response.json();
      console.error('Erreur lors de l\'ajout de la recette:', errorData);
    }
  } catch (error) {
    // Gérer les erreurs de la requête.
    console.error('Erreur lors de l\'ajout de la recette:', error);
  }
};

  
// Définition de la fonction 'startEdit' qui prend en paramètre une recette.
const startEdit = (recipe) => {
  // Définir l'ID de la recette en cours de modification.
  setEditRecipeId(recipe._id);

  // Mettre à jour l'état 'editRecipe' avec les données de la recette sélectionnée.
  setEditRecipe({ ...recipe });

  // Filtrer et extraire les IDs des ingrédients de la recette qui ne sont pas nuls.
  const recipeIngredientIds = recipe.ingredients
    .filter(ing => ing.ingredient != null) // Filtrer pour ne garder que les ingrédients non nuls.
    .map(ing => ing.ingredient._id); // Extraire les IDs des ingrédients.

  // Mettre à jour l'état 'selectedIngredients' avec les IDs des ingrédients de la recette.
  setSelectedIngredients(recipeIngredientIds);

  // Mettre à jour l'état 'selectedCategory' avec les catégories de la recette.
  setSelectedCategory(recipe.categories);
};



 // Définition de la fonction asynchrone 'editRecipeSubmit'.
const editRecipeSubmit = async () => {
  try {
    // Copie de l'état actuel de 'editRecipe' dans 'recipeData'.
    let recipeData = { ...editRecipe };
    console.log("recipeData:" , recipeData);

    // Préparation des données des ingrédients pour la requête
    recipeData.ingredients = recipeData.ingredients.map(ing => ({
      ingredient: ing.ingredient,
      quantity: ing.quantity || '1' // Assurez-vous que la quantité est définie
    }));

   // Préparation des catégories
   let categoriesToUpdate = selectedCategory === 'other' && newCategory
   ? [...recipeData.category, newCategory]
   : recipeData.category;

    // Ajout de la catégorie sélectionnée si elle n'est pas déjà présente.
    // if (selectedCategory !== 'other' && selectedCategory && !categoriesToUpdate.includes(selectedCategory)) {
    //   categoriesToUpdate.push(selectedCategory);
    // }

    // console.log("selectedCategory: ", selectedCategory);
    
    // // Ajout de la nouvelle catégorie si 'other' est sélectionné.
    // if (selectedCategory === 'other' && newCategory) {
    //   if (!categoriesToUpdate.includes(newCategory)) {
    //     categoriesToUpdate.push(newCategory);        
    //   }
    // }

    console.log("newCategory:" , newCategory);
    console.log("recipeData.category:" , recipeData.category);
    console.log("categoriesToUpdate:" , categoriesToUpdate);
    // Mise à jour des catégories dans recipeData
    categoriesToUpdate = [...new Set(categoriesToUpdate)];

    

    recipeData.category = categoriesToUpdate;

    console.log("recipeData:" , recipeData);
    console.log("recipeData.category:" , recipeData.category);

    // Vérification si au moins une catégorie est définie.
    if (!recipeData.category.length) {
      console.error("Au moins une catégorie est requise.");
      return;
    }

    console.log("JSON.stringify(recipeData):",JSON.stringify(recipeData));

    // Envoi de la requête de mise à jour de la recette.
    const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${editRecipeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });

    // Traitement de la réponse.
    if (response.ok) {
      // Réinitialisation des états après la mise à jour réussie.
      const updatedGlobalCategories = [...new Set([...categories, ...editRecipe.category])];
      setCategories(updatedGlobalCategories);
      setEditRecipeId(null);
      setEditRecipe({});
      fetchRecipes();
      setSelectedIngredients([]);
      setNewCategory('');
      setSelectedCategory('');
    } else {
      // Gestion des erreurs de la réponse.
      const errorData = await response.json();
      console.error('Erreur lors de la modification de la recette:', errorData.message);
    }
  } catch (error) {
    // Gestion des erreurs lors de l'exécution de la requête.
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
    {/* Champ de saisie pour le titre de la recette */}
    <input
      type="text"
      name="title"
      value={newRecipe.title}
      onChange={handleInputChange}
      placeholder="Titre de la recette"
    />

    {/* Zone de texte pour la description de la recette */}
    <textarea
      name="description"
      value={newRecipe.description}
      onChange={handleInputChange}
      placeholder="Description"
    />

    {/* Zone de texte pour les étapes de la recette */}
    <textarea
      name="steps"
      value={newRecipe.steps}
      onChange={handleInputChange}
      placeholder="Étapes (séparées par des virgules)"
    />

    {/* Champ de saisie pour le temps de préparation */}
    <input
      type="number"
      name="prepTime"
      value={newRecipe.prepTime}
      onChange={handleInputChange}
      placeholder="Temps de préparation (en minutes)"
    />

    {/* Sélection des ingrédients */}
    <div>
      <label htmlFor="ingredient">Ingrédient :</label>
      <select name="ingredient" onChange={handleIngredientSelect}>
        {ingredients.map(ingredient => (
          <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
        ))}
      </select>

      {/* Affichage des ingrédients sélectionnés */}
      <ul>
        {selectedIngredients.map(id => (
          <li key={id}>{ingredients.find(ingredient => ingredient._id === id)?.name || id}</li>
        ))}
      </ul>         
    </div>    

    {/* Sélection des catégories */}
    <label htmlFor="category">Catégorie :</label>
    <select name="category" value={selectedCategory} onChange={handleCategorySelectChangeAddMode}>
      {categories.map(category => <option key={category} value={category}>{category}</option>)}     
      <option value="other">Autre</option>
    </select>

    {/* Ajout d'une nouvelle catégorie si 'other' est sélectionné */}
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

      {/* Affichage des catégories existantes en mode édition */}
      {console.log("selectedCategory:",selectedCategory)}    
      {console.log("newCategory:",newCategory)}   
      <ul>
      {newRecipe && newRecipe.category && newRecipe.category.map((category, index) => (
        <li key={index}>{category}</li>
      ))}      
      </ul>


    {/* Bouton pour ajouter une nouvelle recette */}
    <button onClick={addRecipe}>Ajouter une recette</button>
  </div>
)}


{editRecipeId && (
  <div>
    {/* Champ de saisie pour le titre de la recette en mode édition */}
    <input
      type="text"
      name="title"
      value={editRecipe ? editRecipe.title : ''}
      onChange={(e) => handleInputChange(e, true)}
      placeholder="Titre de la recette"
    />

    {/* Zone de texte pour la description de la recette en mode édition */}
    <textarea
      name="description"
      value={editRecipe ?editRecipe.description : ''}
      onChange={(e) => handleInputChange(e, true)}
      placeholder="Description"
    />

    {/* Zone de texte pour les étapes de la recette en mode édition */}
    <textarea
      name="steps"
      value={editRecipe ? editRecipe.steps : ''}
      onChange={(e) => handleInputChange(e, true)}
      placeholder="Étapes (séparées par des virgules)"
    />

    {/* Champ de saisie pour le temps de préparation en mode édition */}
    <input
      type="number"
      name="prepTime"
      value={editRecipe ? editRecipe.prepTime : ''}
      onChange={(e) => handleInputChange(e, true)}
      placeholder="Temps de préparation (en minutes)"
    />

    {/* Sélection des ingrédients en mode édition */}
    <div>
      <label htmlFor="ingredient">Ingrédient :</label>
      <select name="ingredient" onChange={handleIngredientSelect}>
        {ingredients.map(ingredient => (
          <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
        ))}
      </select>

      {/* Affichage des ingrédients de la recette en cours de modification */}
      <ul>
        {editRecipe && editRecipe.ingredients && editRecipe.ingredients.map(ing => {
          const ingredient = ingredients.find(ingredient => ingredient._id === ing.ingredient);          
          return ingredient ? <li key={ing.ingredient}>{ingredient.name}</li> : null;
        })}
      </ul>

      {/* Affichage des ingrédients sélectionnés en mode édition */}
      <ul>
        {selectedIngredients.map(id => {
          const ingredient = ingredients.find(ing => ing._id === id);
          return ingredient ? <li key={id}>{ingredient.name}</li> : null;
        })}            
      </ul>
    </div>

    {/* Sélection des catégories en mode édition */}
    <div>
      <label htmlFor="category">Catégorie :</label>
      <select name="category" value={selectedCategory} onChange={handleCategorySelectChangeEditMode }>
   
        {categories.map(category => <option key={category} value={category}>{category}</option>)}
        <option value="other">Autre</option>
      </select>

      {/* Affichage des catégories existantes en mode édition */}
      {console.log("selectedCategory:",selectedCategory)}    
      <ul>
      {editRecipe && editRecipe.category && editRecipe.category.map((category, index) => (
        <li key={index}>{category}</li>
      ))}      
      </ul>

      {/* Ajout d'une nouvelle catégorie si 'other' est sélectionné en mode édition */}
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
    </div>

    {/* Boutons pour soumettre les modifications ou annuler l'édition */}
    <div>
      <button onClick={editRecipeSubmit}>Modifier la recette</button>
      <button onClick={cancelEdit}>Annuler la modification</button>
    </div>
  </div>
)}

           
      <div>
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

    </div>
    
  );
};

export default RecipesManager;
