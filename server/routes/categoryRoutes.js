const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Add other routes here as needed
router.get('/categories', categoryController.listCategories);
router.get('/:recipeId/categories', categoryController.listRecipesCategories);
router.post('/:recipeId/category', categoryController.addCategoryToRecipe);
router.delete('/:recipeId/category/:categoryId', categoryController.removeCategoryFromRecipe);
module.exports = router;


