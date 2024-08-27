const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Crear nueva actividad
router.post('/', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la actividad', error });
  }
});

// Obtener todas las actividades
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find({ available: true });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener actividades', error });
  }
});

// Modificar una actividad (ej. desactivar una clase)
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar la actividad', error });
  }
});

module.exports = router;
