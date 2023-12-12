//recipeController.js
const Recipe = require('../models/recipeModel');

// Ajouter une nouvelle recette
exports.addRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Récupérer toutes les recettes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients.ingredient');
    res.status(200).json({
      status: 'success',
      results: recipes.length,
      data: {
        recipes
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Récupérer une recette spécifique par ID
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients.ingredient');
    res.status(200).json({
      status: 'success',
      data: {
        recipe
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Recette non trouvée'
    });
  }
};

// Mettre à jour une recette
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('ingredients.ingredient');
    res.status(200).json({
      status: 'success',
      data: {
        recipe
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Supprimer une recette
exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Recette non trouvée'
    });
  }
};
