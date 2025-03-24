import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import nutritionData from '../data/nutritionData';

function NutritionApp() {
  const [data, setData] = useState(nutritionData);
  const [foodItems, setFoodItems] = useState([]);

  const calculateNutrition = () => {
    let totals = { Calories: 0, Protéines: 0, Glucides: 0, Lipides: 0, Fibres: 0, VitamineA: 0, VitamineC: 0, Calcium: 0, Fer: 0 };

    foodItems.forEach(item => {
      const { name, quantity, type } = item;
      const food = data.find(food => food['Nom de l\'aliment'] === name);
      if (food) {
        const multiplier = type === 'masse' ? quantity / 100 : quantity;
        totals.Calories += parseFloat(food['Calories (kcal)']) * multiplier;
        totals.Protéines += parseFloat(food['Protéines (g)']) * multiplier;
        totals.Glucides += parseFloat(food['Glucides (g)']) * multiplier;
        totals.Lipides += parseFloat(food['Lipides (g)']) * multiplier;
        totals.Fibres += parseFloat(food['Fibres (g)']) * multiplier;
        totals.VitamineA += parseFloat(food['Vitamine A (UI)']) * multiplier;
        totals.VitamineC += parseFloat(food['Vitamine C (mg)']) * multiplier;
        totals.Calcium += parseFloat(food['Calcium (mg)']) * multiplier;
        totals.Fer += parseFloat(food['Fer (mg)']) * multiplier;
      }
    });

    return totals;
  };

  const addFoodItem = (name, quantity, type) => {
    setFoodItems([...foodItems, { name, quantity, type }]);
  };
}

export default NutritionApp;
