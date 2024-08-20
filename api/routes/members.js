const express = require('express');
const Socio = require('../models/Member');
const router = express.Router();

// Crear nuevo socio
router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, foto, plan, actividades } = req.body;
    const fechaVencimiento = plan.tipo === 'mensual' ? 
      new Date(new Date(plan.fechaInicio).setMonth(new Date(plan.fechaInicio).getMonth() + 1)) :
      new Date(new Date(plan.fechaInicio).setMonth(new Date(plan.fechaInicio).getMonth() + 6));
    
    const nuevoSocio = new Socio({
      nombre,
      email,
      telefono,
      foto,
      plan: {
        tipo: plan.tipo,
        fechaInicio: plan.fechaInicio,
        fechaVencimiento: fechaVencimiento
      },
      actividades
    });
    
    await nuevoSocio.save();
    res.status(201).json(nuevoSocio);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el socio', error });
  }
});

// Obtener todos los socios
router.get('/', async (req, res) => {
  try {
    const socios = await Socio.find();
    res.status(200).json(socios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener socios', error });
  }
});

module.exports = router;