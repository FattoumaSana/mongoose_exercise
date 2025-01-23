const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Person = require('./Models/personModel');

// Charger les variables d'environnement
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les données JSON
app.use(express.json());

// // Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Échec de la connexion à MongoDB :', err));

//routes
const personRoutes = require('./Routes/personRoutes');
app.use('/api', personRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

