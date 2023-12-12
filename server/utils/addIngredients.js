const mongoose = require('mongoose');
const Ingredient = require('../models/ingredientModel'); // Remplacez par le chemin correct vers votre modèle d'ingrédient
console.log("Ingredient: "+Ingredient); // pour vérifier si l'object est bien créer


// Configuration de la connexion à MongoDB
const db = 'mongodb://127.0.0.1:27017/recettes'; // Remplacez par votre URL de MongoDB
mongoose.connect(db)
  .then(() => console.log('Connecté à la base de données MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Liste des ingrédients à ajouter
const ingredients = [
  { name: 'Tomate', quantite: 1, nutritionInfo: { calories: 18, protein: 0.9, fat: 0.2 } },
  { name: 'Pomme de terre', quantite: 1.0, nutritionInfo: { calories: 77, protein: 2.0, fat: 0.1 } },
  { name: 'Chocolat',quantite: 2.0, nutritionInfo: { calories: 150.0, protein: 5.0, fat: 2.1 } },
  { name: 'Laitue romaine',quantite: 1.0, nutritionInfo: { calories: 25.0, protein: 0.1, fat: 0.0 } }  
];

// Fonction pour ajouter des ingrédients
async function addIngredients() {
  try {
    // Utilisez `insertMany` pour insérer en masse
    const insertedIngredients = await Ingredient.insertMany(ingredients);
    console.log(`${insertedIngredients.length} ingrédients ajoutés avec succès`);
  } catch (err) {
    console.error('Erreur lors de l\'ajout des ingrédients', err);
  } finally {
    // Fermez la connexion seulement si vous ne comptez plus faire d'autres opérations après
    await mongoose.disconnect();
  }
}

// Exécuter la fonction
addIngredients();
