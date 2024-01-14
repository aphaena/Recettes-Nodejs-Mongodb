//recipeController.js
const mongoose = require('mongoose'); // Assurez-vous d'importer mongoose
const Recipe = require('../models/recipeModel');

// Ajouter une nouvelle recette
exports.addRecipe = async (req, res) => {
  try {

    const imagePaths = req.files.map(file => file.path);

    // Convertir les ingredientId en ObjectId
    // Assurez-vous que les ingrédients sont au format attendu par le schéma
    const ingredients = req.body.ingredients.map(ing => ({
      ingredient: ing.ingredientId, // Utilisez 'ingredient' pour correspondre au schéma
      quantity: ing.quantity
    }));

    const newRecipeData = {
      ...req.body,
      images: imagePaths,
      ingredients: ingredients, // Utiliser les ingrédients convertis
      //categories: req.body.categories || [],
      //comments: req.body.comments || []
    };

    const newRecipe = await Recipe.create(newRecipeData);

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
    console.log("Ingrédients reçus:", JSON.stringify(req.body.ingredients));
    // Logique pour les images téléchargées
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const ingredients = req.body.ingredients.map(ing => ({
      ingredient: ing.ingredientId, // Utilisez 'ingredient' pour correspondre au schéma
      quantity: ing.quantity

    }));
    let updateData = {
      ...req.body,
      ingredients: ingredients,
    };

    // Gérer les images
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    if (imagePaths.length > 0) {
      updateData.images = [...existingImages, ...imagePaths]; // Combine les images existantes et les nouvelles
    } else {
      updateData.images = existingImages;
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, {
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
