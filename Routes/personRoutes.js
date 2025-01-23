const express = require('express');
const Person = require('../Models/personModel');

const router = express.Router();

// Créer et sauvegarder une personne
router.post('/persons', async (req, res) => {
  try {
    const { name, age, favoriteFoods } = req.body;
    const newPerson = new Person({ name, age, favoriteFoods });
    await newPerson.save();
    res.status(201).json({ message: 'Personne créée avec succès', newPerson });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la personne', error });
  }
});

// Créer plusieurs personnes
router.post('/persons/bulk', async (req, res) => {
  try {
    const arrayOfPeople = req.body;
    const createdPeople = await Person.create(arrayOfPeople);
    res.status(201).json({ message: 'Personnes créées avec succès', createdPeople });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création des personnes', error });
  }
});

// Rechercher toutes les personnes
router.get('/persons', async (req, res) => {
    try {
      const people = await Person.find(); // Récupère toutes les personnes
      res.status(200).json({ message: 'Personnes trouvées', people });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la recherche des personnes', error });
    }
  });

// Rechercher toutes les personnes par nom
router.get('/persons/searchName/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const people = await Person.find({ name: name });
    res.status(200).json({ message: 'Personnes trouvées', people });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des personnes', error });
  }
});


// Rechercher une personne par aliment favori
router.get('/persons/favorite-food', async (req, res) => {
  try {
    const { food } = req.query;
    const person = await Person.findOne({ favoriteFoods: food });
    res.status(200).json({ message: 'Personne trouvée', person });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche de la personne', error });
  }
});

// Rechercher une personne par _id
router.get('/persons/searchId/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);
    res.status(200).json({ message: 'Personne trouvée', person });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche de la personne', error });
  }
});

// Mettre à jour une personne par _id (ajouter "hamburger" à favoriteFoods)
router.put('/persons/updateId/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Trouver la personne par son ID
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    // Ajouter "hamburger" au tableau favoriteFoods
    person.favoriteFoods.push('hamburger');

    // Marquer le champ favoriteFoods comme modifié (si nécessaire)
    person.markModified('favoriteFoods');

    // Sauvegarder la personne mise à jour
    await person.save();

    // Retourner la réponse
    res.status(200).json({ message: 'Personne mise à jour avec succès', person });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la personne', error });
  }
});

// Mettre à jour l'âge d'une personne par nom
router.put('/persons/update-age-by-name/:name', async (req, res) => {
  try {
    const { name } = req.params; // Récupère le nom depuis les paramètres de l'URL

    // Mettre à jour l'âge de la personne et retourner le document mis à jour
    const updatedPerson = await Person.findOneAndUpdate(
      { name }, // Critères de recherche : trouver la personne par son nom
      { age: 20 }, // Mises à jour : fixer l'âge à 20 ans
      { new: true } // Options : retourner le document mis à jour
    );

    // Si aucune personne n'est trouvée
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    // Retourner la réponse avec la personne mise à jour
    res.status(200).json({ message: 'Âge mis à jour avec succès', updatedPerson });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'âge', error });
  }
});

// Supprimer une personne par _id
router.delete('/persons/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupère l'ID de la personne depuis les paramètres de l'URL

    // Supprimer la personne par son ID
    const deletedPerson = await Person.findOneAndDelete({_id:id});

    // Si aucune personne n'est trouvée
    if (!deletedPerson) {
      return res.status(404).json({ message: 'Personne non trouvée' });
    }

    // Retourner la réponse avec la personne supprimée
    res.status(200).json({ message: 'Personne supprimée avec succès', deletedPerson });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erreur lors de la suppression de la personne', error });
  }
});

// Supprimer toutes les personnes nommées "Mary" j mis Alice ma3andich fi base Mary w b5olt bech nzidha :D
router.delete('/persons', async (req, res) => {
  try {
    const result = await Person.deleteMany({ name: 'Alice' });
    res.status(200).json({ message: 'Personnes supprimées avec succès', result });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression des personnes', error });
  }
});

// Rechercher des personnes qui aiment mlawi :D
router.get('/persons/mlawiLovers', async (req, res) => {
  try {
    const mlawiLovers = await Person.find({ favoriteFoods: 'mlawi' });
    if (mlawiLovers.length === 0) {
      return res.status(404).json({ message: 'Aucune personne trouvée qui aime mlawi' });
    }
    res.status(200).json({ message: 'Amateurs de mlawi trouvés', mlawiLovers });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des amateurs de mlawi', error });
  }
});

//Créer plusieurs personnes avec Model.create(), en utilisant l'argument de la fonction arrayOfPeople.
router.post('/persons/bulk', async (req, res) => {
    try {
      const arrayOfPeople = req.body; // Récupère le tableau de personnes depuis le corps de la requête
      const createdPeople = await Person.create(arrayOfPeople); // Crée les personnes
      res.status(201).json({ message: 'Personnes créées avec succès', createdPeople });
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la création des personnes', error });
    }
  });

module.exports = router;