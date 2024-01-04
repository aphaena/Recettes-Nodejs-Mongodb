const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();
const upload = require('../middleware/upload'); // Importez votre configuration multer

router.get('/', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipe);
router.post('/recipe', upload.array('images'), recipeController.addRecipe);
router.patch('/recipe/:id', upload.array('images'), recipeController.updateRecipe);
router.delete('/recipe/:id', recipeController.deleteRecipe);

module.exports = router;
