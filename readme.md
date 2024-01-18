#  Projet Recette

Ce fichier README décrit les étapes pour démarrer le serveur et le client de mon application.

## Configuration des Variables d'Environnement

Avant de démarrer le serveur et le client, vous devez configurer certaines variables d'environnement. Créez un fichier `.env` dans le dossier du serveur avec les informations suivantes :

installer npm dotenv

DATABASE=mongodb://127.0.0.1:27017/recettes
JWT_SECRET=maCleSecreteIci
JWT_EXPIRES_IN=90d

## Créeer la base recettes
Dans mongoDB créer une collection vide nommées recette

## Créer les collections
1. aller dans le répertoire utils : cd ./utils
2. executer le script autonome createCollections.js : node createCollections.js
3. ce script ajoute les collections  "recipes", "ingredients", "users" dans la base "recettes"

## remplir la collection ingredients
1. aller dans le répertoire utils : cd ./utils
2. executer le script autonome addingredients.js : node addingredients.js
3. ce script créer une  centaine d'ingredients dans la collection ingredients pour créer des recettes.

## remplir la collection users
1. aller dans le répertoire utils : cd ./utils
2. executer le script autonome addUsers.js : node addUsers.js
3. ce script créer 3 utilisateurs dans la collection Users. 
4. vous pouvez vous connecter avec le client-front avec le compte admin@example.com mdp: admin pour éditer les collections.

## Démarrer le Serveur

Pour démarrer le serveur, suivez ces étapes :

1. Ouvrez un terminal.
2. Accédez au dossier du serveur en utilisant la commande `cd server`.
3. Exécutez `npm install`.
4. Exécutez le serveur en utilisant la commande `node ./server.js`.

## Démarrer le Client React

Pour démarrer le client React, suivez ces étapes :

1. Ouvrez un autre terminal.
2. Accédez au dossier du client en utilisant la commande `cd client-front`.
3. Exécutez `npm install`.
4. Démarrez le client en utilisant la commande `npm run dev`.

## Plus d'Informations

Pour plus d'informations sur le fonctionnement ou la configuration du projet, vous pouvez consulter la documentation supplémentaire disponible dans les dossiers respectifs du serveur et du client.
