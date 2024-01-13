const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();


// Add more routes as needed for other image operations
router.get('/:recipeId/images', imageController.getImagesFromRecipe);
router.post('/:recipeId/images', imageController.addImageToRecipe);
router.patch('/:recipeId/images/:imageIndex', imageController.updateImageInRecipe);
router.delete('/:recipeId/images/:imageIndex', imageController.deleteImageFromRecipe);

module.exports = router;
