const express = require('express');
const Payment = require('../models/payments');
const router = express.Router();

// Obtener todos los pagos
router.get('/', async (req, res) => {
    try {
      const payments = await Payment.find().populate('member').populate('activity');
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los pagos', error: err });
    }
  });
  
  // Obtener un pago específico
  router.get('/:id', async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id).populate('member').populate('activity');
      if (!payment) return res.status(404).json({ message: 'Pago no encontrado' });
      res.status(200).json(payment);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener el pago', error: err });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const { memberId, activityId, amount } = req.body;
  
      const member = await Member.findById(memberId);
      const activity = await Activity.findById(activityId);
  
      if (!member || !activity) {
        return res.status(400).json({ message: 'Miembro o actividad no encontrados' });
      }
  
      const newPayment = new Payment({
        member: memberId,
        activity: activityId,
        amount,
      });
  
      await newPayment.save();
      res.status(201).json(newPayment);
    } catch (err) {
      res.status(500).json({ message: 'Error al crear el pago', error: err });
    }
  });
  
  // Actualizar un pago
  router.put('/:id', async (req, res) => {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedPayment);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar el pago', error: err });
    }
  });
  
  // Eliminar un pago
  router.delete('/:id', async (req, res) => {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Pago eliminado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar el pago', error: err });
    }
  });
  
  module.exports = router;
  
