import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipesDisplay = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const APIURL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`${APIURL}/api/v1/recipes`);
            const data = await response.json();
            if (data && data.data && data.data.recipes) {
                setRecipes(data.data.recipes);
            } else {
                console.error('Données de recettes non trouvées dans la réponse');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des recettes:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Recettes</h2>
            <input
                type="text"
                placeholder="Rechercher une recette"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="recipe-list">
                {filteredRecipes.map(recipe => (
                    <div key={recipe._id} className="recipe-item">
                        <h3 className="recipe-title"> {recipe.title}</h3>
                        <Link to={`/recipe-details/${recipe._id}`}>Voir les détails</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesDisplay;
