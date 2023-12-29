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
  { name: 'Tomate', quantite: 100, nutritionInfo: { calories: 18, protein: 0.9, fat: 0.2 } },
  { name: 'Pomme de terre', quantite: 100, nutritionInfo: { calories: 77, protein: 2.0, fat: 0.1 } },
  { name: 'Chocolat', quantite: 100, nutritionInfo: { calories: 546, protein: 5.1, fat: 31.3 } },
  { name: 'Laitue romaine', quantite: 100, nutritionInfo: { calories: 15, protein: 1.2, fat: 0.3 } }, 
  { name: 'Orge', quantite: 100, nutritionInfo: { calories: 354, protein: 12.5, fat: 2.3 } },
  { name: 'Haricots noirs', quantite: 100, nutritionInfo: { calories: 339, protein: 21, fat: 0.9 } },
  { name: 'Épinard', quantite: 100, nutritionInfo: { calories: 23, protein: 2.9, fat: 0.4 } },
  { name: 'Framboise', quantite: 100, nutritionInfo: { calories: 52, protein: 1.2, fat: 0.7 } },
  { name: 'Noix de coco', quantite: 100, nutritionInfo: { calories: 354, protein: 3.3, fat: 33 } },
  { name: 'Aubergine', quantite: 100, nutritionInfo: { calories: 25, protein: 1, fat: 0.2 } },
  { name: 'Courgette', quantite: 100, nutritionInfo: { calories: 17, protein: 1.2, fat: 0.3 } },
  { name: 'Thon', quantite: 100, nutritionInfo: { calories: 184, protein: 39, fat: 1.1 } },
  { name: 'Maïs', quantite: 100, nutritionInfo: { calories: 86, protein: 3.2, fat: 1.2 } },
  { name: 'Mangue', quantite: 100, nutritionInfo: { calories: 60, protein: 0.8, fat: 0.4 } },
  { name: 'Pois chiches', quantite: 100, nutritionInfo: { calories: 364, protein: 19, fat: 6 } },
  { name: 'Citron', quantite: 100, nutritionInfo: { calories: 29, protein: 1.1, fat: 0.3 } },
  { name: 'Gingembre', quantite: 100, nutritionInfo: { calories: 80, protein: 1.8, fat: 0.8 } },
  { name: 'Cumin', quantite: 100, nutritionInfo: { calories: 375, protein: 17.8, fat: 22.3 } },
  { name: 'Cannelle', quantite: 100, nutritionInfo: { calories: 247, protein: 3.9, fat: 1.2 } },
  { name: 'Basilic', quantite: 100, nutritionInfo: { calories: 23, protein: 3.2, fat: 0.6 } },
  { name: 'Beurre de cacahuète', quantite: 100, nutritionInfo: { calories: 588, protein: 25.8, fat: 50.0 } },
  { name: 'Avoine', quantite: 100, nutritionInfo: { calories: 389, protein: 16.9, fat: 6.9 } },
  { name: 'Riz blanc', quantite: 100, nutritionInfo: { calories: 130, protein: 2.7, fat: 0.3 } },
  { name: 'Lentilles vertes', quantite: 100, nutritionInfo: { calories: 116, protein: 9.0, fat: 0.4 } },
  { name: 'Tomates séchées', quantite: 100, nutritionInfo: { calories: 258, protein: 14.1, fat: 2.9 } },
  { name: 'Poulet (poitrine)', quantite: 100, nutritionInfo: { calories: 165, protein: 31.0, fat: 3.6 } },
  { name: 'Saumon (cru)', quantite: 100, nutritionInfo: { calories: 208, protein: 20.0, fat: 13.0 } },
  { name: 'Tofu', quantite: 100, nutritionInfo: { calories: 76, protein: 8.0, fat: 4.8 } },
  { name: 'Amandes', quantite: 100, nutritionInfo: { calories: 579, protein: 21.2, fat: 49.9 } },
  { name: 'Miel', quantite: 100, nutritionInfo: { calories: 304, protein: 0.3, fat: 0.0 } },
  { name: 'Huile d\'olive', quantite: 100, nutritionInfo: { calories: 884, protein: 0.0, fat: 100.0 } },
  { name: 'Fromage Cheddar', quantite: 100, nutritionInfo: { calories: 403, protein: 25.0, fat: 33.0 } },
  { name: 'Pain complet', quantite: 100, nutritionInfo: { calories: 247, protein: 13.0, fat: 3.5 } },
  { name: 'Pois verts', quantite: 100, nutritionInfo: { calories: 81, protein: 5.0, fat: 0.4 } },
  { name: 'Yogourt nature', quantite: 100, nutritionInfo: { calories: 59, protein: 10.0, fat: 0.4 } },
  { name: 'Bacon', quantite: 100, nutritionInfo: { calories: 541, protein: 37.0, fat: 42.0 } },
  { name: 'Oignons', quantite: 100, nutritionInfo: { calories: 40, protein: 1.1, fat: 0.1 } },
  { name: 'Concombre', quantite: 100, nutritionInfo: { calories: 16, protein: 0.7, fat: 0.2 } },
  { name: 'Myrtilles', quantite: 100, nutritionInfo: { calories: 57, protein: 0.7, fat: 0.3 } },
  { name: 'Noix', quantite: 100, nutritionInfo: { calories: 654, protein: 15.2, fat: 65.2 } },
  { name: 'Sel', quantite: 100, nutritionInfo: { calories: 0, protein: 0, fat: 0 } },
  { name: 'Poivre noir', quantite: 100, nutritionInfo: { calories: 251, protein: 10.4, fat: 3.3 } },
  { name: 'Moutarde', quantite: 100, nutritionInfo: { calories: 66, protein: 4.4, fat: 3.7 } },
  { name: 'Ketchup', quantite: 100, nutritionInfo: { calories: 100, protein: 1.7, fat: 0.1 } },
  { name: 'Mayonnaise', quantite: 100, nutritionInfo: { calories: 680, protein: 1.0, fat: 75.0 } },
  { name: 'Vinaigre balsamique', quantite: 100, nutritionInfo: { calories: 88, protein: 0.5, fat: 0.0 } },
  { name: 'Sauce soja', quantite: 100, nutritionInfo: { calories: 53, protein: 5.6, fat: 0.1 } },
  { name: 'Sauce piquante', quantite: 100, nutritionInfo: { calories: 30, protein: 1.0, fat: 0.4 } },
  { name: 'Sauce Worcestershire', quantite: 100, nutritionInfo: { calories: 78, protein: 0, fat: 0 } },
  { name: 'Sauce hoisin', quantite: 100, nutritionInfo: { calories: 220, protein: 3.6, fat: 3.1 } },
  { name: 'Curry en poudre', quantite: 100, nutritionInfo: { calories: 325, protein: 14.3, fat: 13.8 } },
  { name: 'Paprika', quantite: 100, nutritionInfo: { calories: 282, protein: 14, fat: 13 } },
  { name: 'Cumin moulu', quantite: 100, nutritionInfo: { calories: 375, protein: 17.8, fat: 22.3 } },
  { name: 'Cannelle moulue', quantite: 100, nutritionInfo: { calories: 247, protein: 3.9, fat: 1.2 } },
  { name: 'Gingembre moulu', quantite: 100, nutritionInfo: { calories: 80, protein: 1.8, fat: 0.8 } },
  { name: 'Ail en poudre', quantite: 100, nutritionInfo: { calories: 331, protein: 16.6, fat: 0.7 } },
  { name: 'Oignon en poudre', quantite: 100, nutritionInfo: { calories: 341, protein: 10.1, fat: 1.0 } },
  { name: 'Pâte de curry', quantite: 100, nutritionInfo: { calories: 175, protein: 3.5, fat: 15.0 } },
  { name: 'Pesto', quantite: 100, nutritionInfo: { calories: 292, protein: 3.8, fat: 29.6 } },
  { name: 'Sauce teriyaki', quantite: 100, nutritionInfo: { calories: 89, protein: 5.5, fat: 0 } },
  { name: 'Asperges', quantite: 100, nutritionInfo: { calories: 20, protein: 2.2, fat: 0.1 } },
  { name: 'Artichaut', quantite: 100, nutritionInfo: { calories: 47, protein: 3.3, fat: 0.2 } },
  { name: 'Aubergine', quantite: 100, nutritionInfo: { calories: 25, protein: 1, fat: 0.2 } },
  { name: 'Betterave', quantite: 100, nutritionInfo: { calories: 43, protein: 1.6, fat: 0.2 } },
  { name: 'Brocoli', quantite: 100, nutritionInfo: { calories: 34, protein: 2.8, fat: 0.4 } },
  { name: 'Champignon', quantite: 100, nutritionInfo: { calories: 22, protein: 3.1, fat: 0.3 } },
  { name: 'Chou-fleur', quantite: 100, nutritionInfo: { calories: 25, protein: 1.9, fat: 0.3 } },
  { name: 'Concombre', quantite: 100, nutritionInfo: { calories: 16, protein: 0.7, fat: 0.2 } },  
  { name: 'Épinard', quantite: 100, nutritionInfo: { calories: 23, protein: 2.9, fat: 0.4 } },
  { name: 'Haricots verts', quantite: 100, nutritionInfo: { calories: 31, protein: 1.8, fat: 0.1 } },
  { name: 'Maïs', quantite: 100, nutritionInfo: { calories: 86, protein: 3.2, fat: 1.2 } },
  { name: 'Oignon', quantite: 100, nutritionInfo: { calories: 40, protein: 1.1, fat: 0.1 } },
  { name: 'Petits pois', quantite: 100, nutritionInfo: { calories: 81, protein: 5.0, fat: 0.4 } },
  { name: 'Poivron', quantite: 100, nutritionInfo: { calories: 20, protein: 0.9, fat: 0.2 } }, 
  { name: 'Potiron', quantite: 100, nutritionInfo: { calories: 26, protein: 1.0, fat: 0.1 } },
  { name: 'Radis', quantite: 100, nutritionInfo: { calories: 16, protein: 0.7, fat: 0.1 } },
  { name: 'Carotte', quantite: 100, nutritionInfo: { calories: 41, protein: 0.9, fat: 0.2 } },
  { name: 'Bœuf (steak maigre)', quantite: 100, nutritionInfo: { calories: 250, protein: 26, fat: 15 } },
  { name: 'Poulet (poitrine sans peau)', quantite: 100, nutritionInfo: { calories: 165, protein: 31, fat: 3.6 } },
  { name: 'Porc (filet)', quantite: 100, nutritionInfo: { calories: 143, protein: 26, fat: 3.5 } },
  { name: 'Agneau', quantite: 100, nutritionInfo: { calories: 294, protein: 25.6, fat: 21.0 } },
  { name: 'Dinde (sans peau)', quantite: 100, nutritionInfo: { calories: 135, protein: 30, fat: 0.7 } },
  { name: 'Canard', quantite: 100, nutritionInfo: { calories: 337, protein: 19, fat: 28 } },
  { name: 'Lapin', quantite: 100, nutritionInfo: { calories: 173, protein: 33, fat: 3.5 } },
  { name: 'Veau', quantite: 100, nutritionInfo: { calories: 194, protein: 20, fat: 11 } },
  { name: 'Saucisse de porc', quantite: 100, nutritionInfo: { calories: 300, protein: 14, fat: 26 } },
  { name: 'Jambon', quantite: 100, nutritionInfo: { calories: 145, protein: 21, fat: 6 } },
  { name: 'Bacon', quantite: 100, nutritionInfo: { calories: 541, protein: 37, fat: 42 } },
  { name: 'Viande hachée (bœuf)', quantite: 100, nutritionInfo: { calories: 254, protein: 17.2, fat: 20 } },
  { name: 'Côte de porc', quantite: 100, nutritionInfo: { calories: 242, protein: 27, fat: 14 } },
  { name: 'Gigot d\'agneau', quantite: 100, nutritionInfo: { calories: 291, protein: 25, fat: 21 } },
  { name: 'Filet de dinde', quantite: 100, nutritionInfo: { calories: 189, protein: 29, fat: 7 } },
  { name: 'Steak de veau', quantite: 100, nutritionInfo: { calories: 172, protein: 20, fat: 9 } },
  { name: 'Rôti de bœuf', quantite: 100, nutritionInfo: { calories: 250, protein: 18, fat: 19 } },
  { name: 'Escalope de poulet', quantite: 100, nutritionInfo: { calories: 110, protein: 23, fat: 1.2 } },
  { name: 'Cuisse de canard', quantite: 100, nutritionInfo: { calories: 404, protein: 19, fat: 36 } },
  { name: 'Filet de lapin', quantite: 100, nutritionInfo: { calories: 144, protein: 30, fat: 2.0 } },
  { name: 'Saumon', quantite: 100, nutritionInfo: { calories: 208, protein: 20, fat: 13 } },
  { name: 'Thon (en conserve)', quantite: 100, nutritionInfo: { calories: 198, protein: 29, fat: 8 } },
  { name: 'Morue', quantite: 100, nutritionInfo: { calories: 105, protein: 22.8, fat: 0.7 } },
  { name: 'Truite', quantite: 100, nutritionInfo: { calories: 190, protein: 20.5, fat: 11.6 } },
  { name: 'Flétan', quantite: 100, nutritionInfo: { calories: 111, protein: 21, fat: 2.3 } },
  { name: 'Maquereau', quantite: 100, nutritionInfo: { calories: 205, protein: 19, fat: 14 } },
  { name: 'Sardine', quantite: 100, nutritionInfo: { calories: 208, protein: 24.6, fat: 11.6 } },
  { name: 'Haddock', quantite: 100, nutritionInfo: { calories: 90, protein: 20.3, fat: 0.9 } },
  { name: 'Bar', quantite: 100, nutritionInfo: { calories: 115, protein: 20, fat: 3.0 } },
  { name: 'Crevette', quantite: 100, nutritionInfo: { calories: 99, protein: 24, fat: 0.3 } },
  { name: 'Huître', quantite: 100, nutritionInfo: { calories: 68, protein: 7, fat: 2 } },
  { name: 'Moule', quantite: 100, nutritionInfo: { calories: 86, protein: 12, fat: 2.2 } },
  { name: 'Crabe', quantite: 100, nutritionInfo: { calories: 97, protein: 20, fat: 1.3 } },
  { name: 'Langoustine', quantite: 100, nutritionInfo: { calories: 77, protein: 16.4, fat: 0.9 } },
  { name: 'Homard', quantite: 100, nutritionInfo: { calories: 89, protein: 19, fat: 0.6 } },
  { name: 'Calmar', quantite: 100, nutritionInfo: { calories: 92, protein: 15.6, fat: 1.5 } },
  { name: 'Poulpe', quantite: 100, nutritionInfo: { calories: 82, protein: 16.4, fat: 0.9 } },
  { name: 'Anguille', quantite: 100, nutritionInfo: { calories: 184, protein: 18.4, fat: 11.7 } },
  { name: 'Sole', quantite: 100, nutritionInfo: { calories: 91, protein: 18.8, fat: 1.3 } },
  { name: 'Espadon', quantite: 100, nutritionInfo: { calories: 144, protein: 20, fat: 7 } }
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
