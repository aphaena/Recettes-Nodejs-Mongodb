const Recipe = require('../models/recipeModel');

// Add a Category to a Recipe
exports.addCategoryToRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { category } = req.body;
        
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (recipe.categories.includes(category)) {
            return res.status(400).send('Category already exists');
        }

        recipe.categories.push(category);
        await recipe.save();
        
        res.status(200).json({
            status: 'success',
            data: {
                recipe
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Remove a Category from a Recipe
exports.removeCategoryFromRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { category } = req.body;
        
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        recipe.categories = recipe.categories.filter(cat => cat !== category);
        await recipe.save();
        
        res.status(200).json({
            status: 'success',
            data: {
                recipe
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.listCategories = async (req, res) => {
    try {
        // Aggregate to collect all categories across recipes
        const categories = await Recipe.aggregate([
            { $unwind: '$categories' }, // Deconstructs the categories array
            { $group: { _id: '$categories' } }, // Groups by categories
            { $sort: { _id: 1 } } // Sorts the categories alphabetically
        ]);

        // Map the results to get an array of category names
        const categoryList = categories.map(cat => cat._id);

        res.status(200).json({
            status: 'success',
            data: {
                categories: categoryList
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.listRecipesCategories = async (req, res) => {
    try {
        const { recipeId } = req.params; // Get recipe ID from request parameters

        // Find the recipe by ID
        const recipe = await Recipe.findById(recipeId);

        // Check if the recipe exists
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Respond with the categories of the recipe
        res.status(200).json({
            status: 'success',
            data: {
                categories: recipe.categories
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

