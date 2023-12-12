
//ingredientController.js

const Ingredient = require('../models/ingredientModel'); // Assurez-vous que le chemin est correct

// Ajouter un nouvel ingrédient
exports.addIngredient = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        ingredient: newIngredient
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Récupérer tous les ingrédients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json({
      status: 'success',
      results: ingredients.length,
      data: {
        ingredients
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Récupérer un ingrédient spécifique par ID
exports.getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        ingredient
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Ingrédient non trouvé'
    });
  }
};

// Mettre à jour un ingrédient
exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        ingredient
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Supprimer un ingrédient
exports.deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Ingrédient non trouvé'
    });
  }
};

// Mettre à jour la quantité en stock d'un ingrédient
exports.updateIngredientQuantity = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, 
      { $inc: { quantite: req.body.quantiteChange } }, // Incrémente ou décrémente la quantité
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        ingredient
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

