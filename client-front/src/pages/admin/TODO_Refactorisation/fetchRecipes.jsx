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