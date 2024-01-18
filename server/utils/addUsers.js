const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Assurez-vous que le chemin vers votre modèle User est correct

// Configuration de la connexion à MongoDB
const db = 'mongodb://127.0.0.1:27017/recettes'; // Remplacez par votre URL de MongoDB
mongoose.connect(db)
  .then(() => console.log('Connecté à la base de données MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Liste des utilisateurs à ajouter
const users = [
  { username: 'admin', email: 'admin@example.com', password: 'admin', role: 'admin' },
  { username: 'Alice', email: 'alice@example.com', password: 'password123', role: 'user' },  
  { username: 'Charlie', email: 'charlie@example.com', password: 'password789', role: 'author' }
  // Ajoutez d'autres utilisateurs ici si nécessaire
];

// Fonction pour ajouter des utilisateurs
async function addUsers() {
  try {
    // Hasher les mots de passe avant de les insérer
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    // Utilisez `insertMany` pour insérer en masse
    const insertedUsers = await User.insertMany(users);
    console.log(`${insertedUsers.length} utilisateurs ajoutés avec succès`);
  } catch (err) {
    console.error('Erreur lors de l\'ajout des utilisateurs', err);
  } finally {
    // Fermez la connexion seulement si vous ne comptez plus faire d'autres opérations après
    await mongoose.disconnect();
  }
}

// Exécuter la fonction
addUsers();
