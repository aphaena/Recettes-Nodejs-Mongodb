import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation.jsx'; // Assurez-vous que le chemin est correct

const RecipesManager = () => {
  const [recipes, setRecipes] = useState([]);

  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', steps: '', prepTime: 30, categories: [] });
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({});

  const [recipeSteps, setRecipeSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  // Si vous utilisez un état séparé pour les étapes
  const [editRecipeSteps, setEditRecipeSteps] = useState([]);
  const [newEditStep, setNewEditStep] = useState('');

  const [imageUrls, setImageUrls] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  const [existingImages, setExistingImages] = useState(editRecipe?.images || []);

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedIngredientsEdit, setSelectedIngredientsEdit] = useState([]);
  const [ingredientFilter, setIngredientFilter] = useState('');

  const [categories, setCategories] = useState([]); // Ajout de l'état pour les catégories
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editNewCategory, setEditNewCategory] = useState('');

  const APIURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchRecipes();
    fetchIngredients();
  }, []);

  const fetchRecipes = async () => {
    console.log("start fetchRecipes");
    try {
      const response = await fetch(`${APIURL}/api/v1/recipes`);
      const data = await response.json();
      if (data && data.data && data.data.recipes) {
        setRecipes(data.data.recipes);

        // todo  verifier si c'est utile !
        const allCategories = data.data.recipes.reduce((acc, recipe) => {
          // Vérifiez si la propriété categories existe et est un tableau
          if (Array.isArray(recipe.categories)) {
            recipe.categories.forEach(category => {
              if (!acc.includes(category)) {
                acc.push(category);
              }
            });
          }
          return acc;
        }, []);

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




  const addStep = () => {
    if (newStep) {
      setRecipeSteps([...recipeSteps, newStep]);
      setNewStep(''); // Réinitialiser le champ après l'ajout
    }
  };

  const addEditStep = () => {
    if (newEditStep) {
      setEditRecipeSteps([...editRecipeSteps, newEditStep]);
      setNewEditStep('');
    }
  };

  const removeStep = (index) => {
    setRecipeSteps(currentSteps => currentSteps.filter((_, i) => i !== index));
  };

  const removeEditStep = (index) => {
    setEditRecipeSteps(currentSteps => currentSteps.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (newImageUrl) {
      setImageUrls([...imageUrls, newImageUrl]);
      setNewImageUrl(''); // Réinitialiser après l'ajout
    }
  };

  const handleImageChange = (e) => {
    // Cette fonction mettra à jour l'état avec les fichiers sélectionnés.
    setImageFiles([...e.target.files]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageFiles) return;

    const formData = new FormData();
    formData.append('image', imageFiles);

    try {
      const response = await fetch(`${APIURL}/api/v1/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Traitez la réponse, par exemple, enregistrez l'URL de l'image renvoyée par le serveur
      } else {
        console.error('Erreur lors du téléchargement de l\'image');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleRemoveImage = (imageIndex) => {
    setExistingImages((currentImages) =>
      currentImages.filter((_, index) => index !== imageIndex));
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
    const alreadySelected = selectedIngredients.some(item => item.ingredientId === selectedIngredientId);

    if (!alreadySelected) {
      setSelectedIngredients([...selectedIngredients, { ingredientId: selectedIngredientId, quantity: 100 }]);
    }
  };

  const handleIngredientSelectEdit = (e) => {
    const selectedIngredientId = e.target.value;
    const alreadySelected = selectedIngredientsEdit.some(item => item.ingredientId === selectedIngredientId);

    if (!alreadySelected) {
      // Trouver l'ingrédient complet dans la liste des ingrédients
      const ingredient = ingredients.find(ing => ing._id === selectedIngredientId);

      if (ingredient) {
        // Ajouter l'ingrédient sélectionné avec son nom et une quantité initiale
        setSelectedIngredientsEdit([...selectedIngredientsEdit, {
          ingredientId: selectedIngredientId,
          ingredientName: ingredient.name, // Ajouter le nom de l'ingrédient
          quantity: '1' // Quantité initiale, ajustez selon vos besoins
        }]);
      }
    }
  };


  const handleQuantityChange = (ingredientId, quantity) => {
    setSelectedIngredients(selectedIngredients.map(item =>
      item.ingredientId === ingredientId ? { ...item, quantity } : item
    ));
  };

  // Gestion des changements de quantité pour chaque ingrédient
  const handleQuantityChangeEdit = (ingredientId, newQuantity) => {
    setSelectedIngredientsEdit(prevIngredients =>
      prevIngredients.map(item =>
        item.ingredientId === ingredientId ? { ...item, quantity: newQuantity } : item
      )
    );
    //console.log("const handleQuantityChangeEdit: ", handleQuantityChangeEdit);
  };


  const cancelEdit = () => {
    setEditRecipe(null);
  };

  const handleCategorySelectChangeEditMode = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value !== 'other') {
      setEditRecipe(prev => {
        const updatedCategories = prev.categories
          ? [...prev.categories]
          : [...prev.categories, value];
        if (!updatedCategories.includes(value)) {
          updatedCategories.push(value);
          // Mettre à jour les catégories globales si la catégorie n'est pas déjà présente
          if (!categories.includes(value)) {
            setCategories(currentCategory => [...currentCategory, value]);
          }
        }
        return { ...prev, categories: updatedCategories };
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
        const updatedCategories = prev.categories ? [...prev.categories] : [];
        if (!updatedCategories.includes(value)) {
          updatedCategories.push(value);
          // Mettre à jour les catégories globales si la catégorie n'est pas déjà présente
          if (!categories.includes(value)) {
            setCategories(currentCategories => [...currentCategories, value]);
          }
        }
        return { ...prev, categories: updatedCategories };
      });
    }
  };

  // const handleCategorySelectChangeAddMode = (e) => {
  //   const value = e.target.value;
  //   setSelectedCategory(value);
  //   if (value !== 'other') {
  //     setNewRecipe(prev => ({
  //       ...prev,
  //       category: [...prev.category, value]
  //     }));
  //   }
  // };


  // Définition de la fonction 'handleAddNewCategory' qui ne prend aucun paramètre.
  // Cette fonction est appelée lorsqu'un utilisateur souhaite ajouter une nouvelle catégorie à la recette.
  const handleAddNewCategory = () => {
    if (newCategory && !newRecipe.categories.includes(newCategory)) {
      setNewRecipe(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  const handleAddNewCategoryEdit = () => {
    if (newCategory) {
      if (editRecipeId) {
        // Mode édition
        setEditRecipe(prev => ({
          ...prev,
          categories: prev.categories.includes(newCategory) ? prev.categories : [...prev.categories, newCategory]
        }));
      }
      setNewCategory('');
    }
  };

  const removeCategory = (categoryIndex) => {
    setEditRecipe(prevRecipe => {
      // Créer une nouvelle liste de catégories sans la catégorie à supprimer
      const updatedCategories = prevRecipe.categories.filter((_, index) => index !== categoryIndex);
      return { ...prevRecipe, categories: updatedCategories };
    });
  };

  // Définition de la fonction asynchrone 'addRecipe'.
  const addRecipe = async () => {
    try {
      // Vérifier si tous les champs requis pour une nouvelle recette sont remplis.
      if (!newRecipe.title || !newRecipe.description || !recipeSteps || newRecipe.prepTime === 0) {
        console.error("Tous les champs requis doivent être remplis.");
        return;
      }

      // Préparation du FormData
      const formData = new FormData();
      formData.append('title', newRecipe.title);
      formData.append('description', newRecipe.description);
      formData.append('prepTime', newRecipe.prepTime);
      recipeSteps.forEach((step, index) => formData.append(`steps[${index}]`, step));

      // ***************************************************************************************************
      selectedIngredients.forEach((selectedItem, index) => {
        // Trouver l'ingrédient correspondant dans la liste complète des ingrédients
        const ingredient = ingredients.find(ing => ing._id === selectedItem.ingredientId);
        console.log("addRecipe ingredient", ingredient);
        console.log("addRecipe ingredient", ingredient._id);
        if (ingredient) {
          // Ajouter l'identifiant et la quantité de l'ingrédient au FormData
          formData.append(`ingredients[${index}][ingredientId]`, ingredient._id);
          formData.append(`ingredients[${index}][quantity]`, selectedItem.quantity);
        } else {
          console.warn(`Ingrédient non trouvé pour l'ID: ${selectedItem.ingredientId}`);
        }
      });

      // Ajout des fichiers d'image, si disponibles
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append('images', file);
        });
      }


      // Si l'utilisateur a sélectionné 'other' et a entré une nouvelle catégorie.
      let categoriesToSend = newRecipe.categories || [];
      if (selectedCategory === 'other' && newCategory) {
        categoriesToSend = [newCategory];
      } else if (selectedCategory && selectedCategory !== 'other') {
        // Si une catégorie existante est sélectionnée.
        categoriesToSend = [selectedCategory];

      }


      // Vérifiez si au moins une catégorie est spécifiée
      if (categoriesToSend.length === 0) {
        console.error("Catégorie non spécifiée.");
        return;
      }

      console.log("categoriesToSend", categoriesToSend);

      // Convertir le tableau des catégories en chaîne JSON
      categoriesToSend.forEach((categories, index) => formData.append(`categories[${index}]`, categories));
      //recipeSteps.forEach((step, index) => formData.append(`steps[${index}]`, step));


      // Envoyer une requête POST pour ajouter la nouvelle recette.
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe`, {
        method: 'POST',
        body: formData // Utiliser FormData
      });

      // Vérifier si la requête a réussi.
      if (response.ok) {
        // Mise à jour de l'état et réinitialisation des formulaires
        const updatedGlobalCategories = [...new Set([...categories, ...newRecipe.categories])];
        setCategories(updatedGlobalCategories);
        fetchRecipes(); // Récupérer la liste mise à jour des recettes.
        // Réinitialiser les états pour les champs de saisie de la recette.
        setNewRecipe({ title: '', description: '', steps: '', prepTime: 0, categories: [] });
        setSelectedIngredients([]);
        setNewCategory('');
        setExistingImages([]);
        setImageFiles([]);
        setImageUrls([]);
      } else {
        // Gérer les erreurs de réponse
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de la recette:', errorData);
      }
    } catch (error) {
      // Gérer les erreurs de la requête
      console.error('Erreur lors de l\'ajout de la recette:', error);
    }
  };


  // Définition de la fonction 'startEdit' qui prend en paramètre une recette.
  const startEdit = (recipe) => {
    console.log("startEdit recipe:", recipe);
    // Définir l'ID de la recette en cours de modification.
    setEditRecipeId(recipe._id);

    // Mettre à jour l'état 'editRecipe' avec les données de la recette sélectionnée.
    setEditRecipe({ ...recipe });


    setEditRecipeSteps(recipe.steps || []);

    // Filtrer et extraire les IDs des ingrédients de la recette qui ne sont pas nuls.
    // .filter(ing => ing.ingredient != null) // Filtrer pour ne garder que les ingrédients non nuls.
    console.log("startEdit ingredients: ", ingredients);
    console.log("startEdit recipe.ingredients: ", recipe.ingredients);

    const recipeIngredientIds = recipe.ingredients.map(ing => {
      const ingredientId = ing.ingredient._id;
      // Trouver l'ingrédient correspondant dans la liste complète des ingrédients
      const ingredient = ingredients.find(ingredient => ingredient._id === ing.ingredient._id);
      console.log("startEdit ing._id", ing.ingredient._id);
      console.log("startEdit ingredient", ingredient);
      return {
        ingredientId: ing.ingredient._id,
        ingredientName: ingredient ? ingredient.name : "Ingrédient inconnu",
        quantity: ing.quantity
      };
    });

    // Mettre à jour les images existantes
    setExistingImages(recipe.images || []);

    console.log("startEdit recipeIngredientIds: ", recipeIngredientIds);

    // Mettre à jour l'état 'selectedIngredients' avec les IDs des ingrédients de la recette.
    // setSelectedIngredients(recipeIngredientIds);
    setSelectedIngredientsEdit(recipeIngredientIds);

    // Mettre à jour l'état 'selectedCategories' avec les catégories de la recette.
    setSelectedCategory(recipe.categories);
  };



  const handleEditStepChange = (index, newStep) => {
    const updatedSteps = editRecipeSteps.map((step, i) => i === index ? newStep : step);
    setEditRecipeSteps(updatedSteps);
  };


  // Définition de la fonction asynchrone 'editRecipeSubmit'.
  const editRecipeSubmit = async () => {
    try {
      // Création d'une instance de FormData pour gérer les données de formulaire
      const formData = new FormData();
      formData.append('title', editRecipe.title);
      formData.append('description', editRecipe.description);
      formData.append('prepTime', editRecipe.prepTime);

      // Ajout des étapes de la recette
      editRecipeSteps.forEach((step, index) => formData.append(`steps[${index}]`, step));

      // Ajout des ingrédients
      selectedIngredientsEdit.forEach((item, index) => {
        if (item.ingredientId) {
          formData.append(`ingredients[${index}][ingredientId]`, item.ingredientId);
          formData.append(`ingredients[${index}][quantity]`, item.quantity);
        }
      });

      // Ajout des images
      //imageFiles.forEach(file => formData.append('images', file));

      // Ajout des fichiers d'image, si disponibles
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append('images', file);
        });
      }

      console.log("EditRecipeSubmit existingImages:", existingImages);
      // Ajout des images existantesconsole.log("EditRecipeSubmit existingImages:",existingImages);
      formData.append('existingImages', JSON.stringify(existingImages));

      // Ajout des catégories
      const categoriesToUpdate = selectedCategory === 'other' && newCategory
        ? [...editRecipe.categories, newCategory]
        : editRecipe.categories;
      categoriesToUpdate.forEach(category => formData.append('categories', category));
      console.log("EditRecipeSubmit editRecipeId:", editRecipeId);
      console.log("EditRecipeSubmit formData:", formData);
      // Envoi de la requête de mise à jour de la recette
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${editRecipeId}`, {
        method: 'PATCH',
        body: formData  // Envoyer FormData
      });

      // Traitement de la réponse
      if (response.ok) {
        // Réinitialisation des états après la mise à jour réussie
        // (ajustez ces états en fonction de votre application)
        const updatedGlobalCategories = [...new Set([...categories, ...categoriesToUpdate])];
        setCategories(updatedGlobalCategories);
        setEditRecipeId(null);
        setEditRecipe({});
        fetchRecipes(); // Mettez à jour la liste des recettes
        setSelectedIngredients([]);
        setNewCategory('');
        setSelectedCategory('');
        setExistingImages([]);
        setImageFiles([]);
        setImageUrls([]);
      } else {
        // Gestion des erreurs de la réponse
        const errorData = await response.json();
        console.error('Erreur lors de la modification de la recette:', errorData.message);
      }
    } catch (error) {
      // Gestion des erreurs lors de l'exécution de la requête
      console.error('Erreur lors de la modification de la recette:', error);
    }
  };


  const removeIngredientEdit = (index) => {
    // Créer une nouvelle liste en excluant l'ingrédient à l'index spécifié
    const updatedIngredients = selectedIngredientsEdit.filter((_, i) => i !== index);

    // Mettre à jour l'état avec la nouvelle liste d'ingrédients
    setSelectedIngredientsEdit(updatedIngredients);
  };

  const removeIngredient = (index) => {
    setSelectedIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index));
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
    <div className="container">
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

          {/* Champ de saisie pour les images */}

          <input
            type="file"
            multiple
            onChange={(e) => setImageFiles([...e.target.files])}
            accept="image/*"
          />
          <div className="image-container">
            <div>
              {imageFiles.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Aperçu ${index}`} />
              ))}
            </div>
          </div>
          <div>
            {existingImages && existingImages.map((imageUrl, index) => (
              <div key={index} className="image-container">
                <img key={index} src={APIURL + "/" + imageUrl.replace(/\\/g, '/')} alt={`Image existante ${index}`} />
                <button onClick={() => handleRemoveImage(index)} className="delete-btn">X</button>
              </div>
            ))}
          </div>

          {/* Champ de saisie pour une nouvelle étape */}
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Ajouter une nouvelle étape"
          />

          {/* Bouton pour ajouter une étape */}
          <button onClick={addStep}>Ajouter une étape</button>


          {/* Affichage des étapes ajoutées */}
          <ul>
            {recipeSteps.map((step, index) => (
              <li key={index}>{step}
                <button onClick={() => removeStep(index)}>Supprimer</button>
              </li>

            ))}
          </ul>

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

            {/* Champ de saisie pour le filtre d'ingrédients */}
            <input
              type="text"
              placeholder="Rechercher un ingrédient"
              value={ingredientFilter}
              onChange={(e) => setIngredientFilter(e.target.value)}
            />

            <select name="ingredient" onChange={handleIngredientSelect} value="">
              <option value="" disabled>Ajouter un ingrédient</option>
              {ingredients
                .filter(ingredient => ingredient.name.toLowerCase().includes(ingredientFilter.toLowerCase()))
                .map(ingredient => (
                  <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
                ))}
              {ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(ingredientFilter.toLowerCase())).length === 0 && (
                <option disabled>Aucun ingrédient trouvé</option>
              )}
            </select>

            <ul>
              {selectedIngredients.map((item, index) => (
                <li key={item.ingredientId}>
                  {ingredients.find(ingredient => ingredient._id === item.ingredientId)?.name || item.ingredientId}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.ingredientId, e.target.value)}
                    placeholder="Quantité (en grammes)"
                  />
                  <div>gr.</div>
                  <button onClick={() => removeIngredient(index)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sélection des catégories */}
          <label htmlFor="categories">Catégorie :</label>
          <select name="categories" value={selectedCategory} onChange={handleCategorySelectChangeAddMode}>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
            <option value="choose">Choisir une categorie</option>
            <option value="other">Créer une Autre catégorie</option>
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

          <ul>
            {newRecipe && newRecipe.categories && newRecipe.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>


          {/* Bouton pour ajouter une nouvelle recette */}
          <button onClick={addRecipe}>Ajouter une recette</button>
        </div>
      )}

      {/* ************************************************************************************** */}
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
            value={editRecipe ? editRecipe.description : ''}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Description"
          />

          {/* Champ de saisie pour les images */}
          <input
            type="file"
            multiple
            onChange={(e) => setImageFiles([...e.target.files])}
            accept="image/*"
          />
          <div className="image-container">
            <div>
              {imageFiles.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Aperçu ${index}`} />
              ))}
            </div>
          </div>
          <div>
            {existingImages && existingImages.map((imageUrl, index) => (
              <div key={index} className="image-container">
                <img key={index} src={APIURL + "/" + imageUrl.replace(/\\/g, '/')} alt={`Image existante ${index}`} />
                <button onClick={() => handleRemoveImage(index)} className="delete-btn">X</button>
              </div>
            ))}
          </div>

          {/* Champ de saisie pour une nouvelle étape en mode édition */}
          <input
            type="text"
            value={newEditStep}
            onChange={(e) => setNewEditStep(e.target.value)}
            placeholder="Ajouter une nouvelle étape"
          />

          {/* Bouton pour ajouter une étape en mode édition */}
          <button onClick={addEditStep}>Ajouter une étape</button>

          {/* Affichage et modification des étapes ajoutées en mode édition */}
          <ul>
            {editRecipeSteps.map((step, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleEditStepChange(index, e.target.value)}
                />
                {/* Bouton pour supprimer l'étape */}
                <button onClick={() => removeEditStep(index)}>Supprimer</button>
              </li>

            ))}
          </ul>

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
            {/* Champ de saisie pour le filtre d'ingrédients */}
            <input
              type="text"
              placeholder="Rechercher un ingrédient"
              value={ingredientFilter}
              onChange={(e) => setIngredientFilter(e.target.value)}
            />
            <select name="ingredient" onChange={handleIngredientSelectEdit} value="">
              <option value="" disabled>Ajouter un ingrédient</option>
              {ingredients
                .filter(ingredient => ingredient.name.toLowerCase().includes(ingredientFilter.toLowerCase()))
                .map(ingredient => (
                  <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
                ))}
            </select>
          </div>

          {/* Affichage des ingrédients sélectionnés en mode édition */}
          <div>
            <ul>
              {selectedIngredientsEdit.map((item, index) => (
                <li key={index}>
                  {item.ingredientName} - Quantité :
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChangeEdit(item.ingredientId, e.target.value)}

                  />
                  <div>gr.</div>
                  <button onClick={() => removeIngredientEdit(index)}>Supprimer</button>
                </li>
              ))}
            </ul>


          </div>

          {/* Sélection des catégories en mode édition */}
          <div>
            <label htmlFor="categories">Catégorie :</label>
            <select name="categories" value={selectedCategory} onChange={handleCategorySelectChangeEditMode}>

              {categories.map(category => <option key={category} value={category}>{category}</option>)}
              <option value="other">Créer une Autre catégorie</option>
            </select>

            {/* Affichage des catégories existantes en mode édition */}

            <ul>
              {editRecipe && editRecipe.categories && editRecipe.categories.map((category, index) => (
                <li key={index}>
                  {category}
                  {/* Bouton pour supprimer la catégorie */}
                  <button onClick={() => removeCategory(index)}>Supprimer</button>
                </li>
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
                <button onClick={handleAddNewCategoryEdit}>Ajouter Catégorie</button>
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
