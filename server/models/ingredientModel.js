//models/ingredientModel.js

const mongoose = require('mongoose');
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantite: Number, // en stock
  nutritionInfo: {
    calories: Number,
    protein: Number,
    fat: Number,
    // Ajoutez d'autres champs nécessaires ici
  },
  // Ajoutez d'autres champs nécessaires ici
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;