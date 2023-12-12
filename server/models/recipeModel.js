// models/recipeModel.js

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [{
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    },
    quantity: String
  }],
  steps: [String],
  prepTime: Number,
  images: [String],
  comments: {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    text: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
  },
  category: {
    type: String,
    required: true
    //enum: ['vegetarian', 'dessert', 'quick', 'etc'],
  },
  // Ajoutez d'autres champs nécessaires ici
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;