const Recipe = require('../models/recipeModel');

exports.addImageToRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { imageUrl } = req.body;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        recipe.images.push(imageUrl);
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

exports.deleteImageFromRecipe = async (req, res) => {
    try {
        const { recipeId, imageIndex } = req.params;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (imageIndex < 0 || imageIndex >= recipe.images.length) {
            return res.status(400).send('Invalid image index');
        }

        recipe.images.splice(imageIndex, 1);
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

// Add more functions as needed for other image operations
