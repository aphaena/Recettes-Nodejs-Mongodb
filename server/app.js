const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config({ path: './config.env' });

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Autorisez le domaine front-end
  }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/ingredients', ingredientRoutes);

// Gestion des erreurs globales ici

module.exports = app;