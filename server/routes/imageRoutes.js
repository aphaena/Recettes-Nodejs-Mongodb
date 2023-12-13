const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/:recipeId/images', imageController.addImageToRecipe);
router.delete('/:recipeId/images/:imageIndex', imageController.deleteImageFromRecipe);

// Add more routes as needed for other image operations

module.exports = router;
