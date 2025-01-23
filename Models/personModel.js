const mongoose = require('mongoose');

// Définir le schéma de la personne
const personSchema = new mongoose.Schema({
  name: {
    type: String
    // required: [true, 'Le nom est obligatoire'],
  },
  age: {
    type: Number
    // default: 0, // Valeur par défaut
  },
  favoriteFoods: {
    type: [String] // Tableau de chaînes de caractères
    // default: [], // Valeur par défaut
  },
});

// Créer le modèle Person
const Person = mongoose.model('Person', personSchema);

module.exports = Person;