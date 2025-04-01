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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

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

app.get('/api/meals/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const meals = await Meal.find({ userId });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
