const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');
const app = express();

app.use(express.json());

// Example: Basic route for health check
app.get('/', (req, res) => {
  res.send('Orphanage Care System API is running');
});

// TODO: Add routes for each model (Child, Staff, MealPlan, etc.)

module.exports = app;
