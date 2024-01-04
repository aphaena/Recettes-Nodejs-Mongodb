const Recipe = require('../models/recipeModel');


exports.getImagesFromRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        res.status(200).json({
            status: 'success',
            data: {
                images: recipe.images
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


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

exports.updateImageInRecipe = async (req, res) => {
    try {
        const { recipeId, imageIndex } = req.params;
        const { newImageUrl } = req.body;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (imageIndex < 0 || imageIndex >= recipe.images.length) {
            return res.status(400).send('Invalid image index');
        }

        recipe.images[imageIndex] = newImageUrl;
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

exports.listAllImages = async (req, res) => {
    try {
        // Trouver toutes les recettes
        const recipes = await Recipe.find({});

        // Collecter toutes les images de toutes les recettes
        let allImages = [];
        recipes.forEach(recipe => {
            allImages = allImages.concat(recipe.images);
        });

        res.status(200).json({
            status: 'success',
            data: {
                images: allImages
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// imageController.js

exports.uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        throw new Error('Image file is required.');
      }
      const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
      res.status(200).json({
        status: 'success',
        data: {
          imageUrl: imageUrl
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
