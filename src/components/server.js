const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Définition du modèle pour les événements
const eventSchema = new mongoose.Schema({
  ID: String,
  Événement: String,
  Année: Number,
  Image: String,
});

const Event = mongoose.model('Event', eventSchema);

// Route pour ajouter des repas
const mealSchema = new mongoose.Schema({
  userId: String,
  foodItems: [
    {
      name: String,
      quantity: Number,
      type: String,
    },
  ],
  date: { type: Date, default: Date.now },
});

const Meal = mongoose.model('Meal', mealSchema);

// Route pour ajouter un repas
app.post('/api/meals', async (req, res) => {
  const { userId, foodItems } = req.body;
  const newMeal = new Meal({ userId, foodItems });
  try {
    const savedMeal = await newMeal.save();
    res.json(savedMeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer les repas d'un utilisateur
app.get('/api/meals/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const meals = await Meal.find({ userId });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer les événements
app.get('/api/events', async (req, res) => {
  try {
    const events = await event.find(); // Récupère tous les événements
    res.json(events); // Renvoie les événements sous forme de JSON
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
