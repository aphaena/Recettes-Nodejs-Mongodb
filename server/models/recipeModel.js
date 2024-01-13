// models/recipeModel.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  rating: Number,
  createdAt: Date
});

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
  comments: [commentSchema],
  categories: [String],
   // required: true
   
  // Ajoutez d'autres champs nécessaires ici
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;