const { MongoClient } = require('mongodb');

async function createCollections() {
    const url = 'mongodb://localhost:27017'; // Remplacez par votre URL de MongoDB
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connecté à MongoDB');

        const db = client.db('recettes');

        // Création de la collection 'users'
        await db.createCollection('users');
        console.log('Collection users créée');

        // Création de la collection 'recipes'
        await db.createCollection('recipes');

          // Création de la collection 'recipes'
          await db.createCollection('ingredients');

        console.log('Collection recipes créée');
    } catch (e) {
        console.error('Erreur lors de la création des collections:', e);
    } finally {
        await client.close();
    }
}

createCollections();