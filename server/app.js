const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config({ path: './config.env' });

const userRoutes = require('./routes/userRoutes') 
const authRoutes = require('./routes/authRoutes');

const recipeRoutes = require('./routes/recipeRoutes');
const commentsRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
const stepRoutes = require('./routes/stepRoutes');

const ingredientRoutes = require('./routes/ingredientRoutes');
const app = express();
const path = require('path');

const upload = require('./middleware/upload'); 

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://192.168.2.197:5173']; // Autorisez le domaine front-end
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Error('Origin not allowed by CORS'));
    }
}
  }));
app.use('/api/v1/users', userRoutes);  
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/recipes', commentsRoutes);
app.use('/api/v1/recipes', categoryRoutes);
app.use('/api/v1/recipes', imageRoutes);
app.use('/api/v1/recipes', stepRoutes);

app.use('/api/v1/ingredients', ingredientRoutes);

// Route pour t�l�charger des images
app.post('/api/v1/upload-images', upload.array('images'), (req, res) => {
  // Ici, vous pouvez traiter les fichiers t�l�charg�s comme n�cessaire
  res.status(200).json({
    status: 'success',
    files: req.files.map(file => file.path)
  });
});

// Servez les fichiers statiques du dossier 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;