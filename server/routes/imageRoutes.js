const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();
const upload = require('../middleware/upload');


// Add more routes as needed for other image operations
router.get('/:recipeId/images', imageController.getImagesFromRecipe);
router.post('/:recipeId/images', imageController.addImageToRecipe);
router.post('/upload-image', upload.single('image'), imageController.uploadImage);
router.patch('/:recipeId/images/:imageIndex', imageController.updateImageInRecipe);
router.delete('/:recipeId/images/:imageIndex', imageController.deleteImageFromRecipe);

module.exports = router;
