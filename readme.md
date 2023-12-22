# Mon Projet

Ce fichier README décrit les étapes pour démarrer le serveur et le client de mon application.

## Configuration des Variables d'Environnement

Avant de démarrer le serveur et le client, vous devez configurer certaines variables d'environnement. Créez un fichier `.env` dans le dossier du serveur avec les informations suivantes :

DATABASE=mongodb://127.0.0.1:27017/recettes
JWT_SECRET=maCleSecreteIci
JWT_EXPIRES_IN=90d


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
