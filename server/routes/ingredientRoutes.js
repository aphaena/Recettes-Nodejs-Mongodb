const express = require('express');
const ingredientController = require('../controllers/ingredientController'); // Assurez-vous que le chemin est correct
const router = express.Router();

// Route pour récupérer tous les ingrédients
router.get('/', ingredientController.getAllIngredients);

// Route pour ajouter un nouvel ingrédient
router.post('/ingredient', ingredientController.addIngredient);

// Route pour récupérer un ingrédient spécifique par son ID
router.get('/ingredient/:id', ingredientController.getIngredient);

// Route pour mettre à jour un ingrédient
router.patch('/ingredient/:id', ingredientController.updateIngredient);

// Route pour supprimer un ingrédient
router.delete('/ingredient/:id', ingredientController.deleteIngredient);

module.exports = router;
