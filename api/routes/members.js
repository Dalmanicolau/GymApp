const express = require('express');
const Member = require('../models/Members');
const Activity = require('../models/Activity');
const router = express.Router();

// Crear nuevo socio
router.post('/', async (req, res) => {
  try {
    const { name, email, cellphone, plan, activities, automaticRenewal, promotion } = req.body;
    const activityIds = activities;
    const activitiesData = await Activity.find({ '_id': { $in: activityIds } });
    
    // Verifica si la promoción incluye musculación
    if (promotion) {
      const musculacion = await Activity.findOne({ name: 'musculación' });
      if (!activities.includes(musculacion._id)) {
        return res.status(400).json({ message: 'La promoción debe incluir musculación.' });
      }
      // Limita a 2 actividades cuando se elige la promoción
      if (activities.length !== 2) {
        return res.status(400).json({ message: 'La promoción permite máximo 2 actividades.' });
      }
    }

    // Calcula el precio total
    const totalPriceActivities = promotion ? 18000 : activitiesData.reduce((total, activity) => total + activity.price, 0);

    const expirationDate = plan.type === 'monthly' ? 
      new Date(new Date(plan.initDate).setMonth(new Date(plan.initDate).getMonth() + 1)) :
      new Date(new Date(plan.initDate).setMonth(new Date(plan.initDate).getMonth() + 6));

    const newMember = new Member({
      name,
      email,
      cellphone,
      plan: {
        type: plan.type,
        price: totalPriceActivities,
        initDate: plan.initDate,
        expirationDate: expirationDate
      },
      activities: activityIds,
      automaticRenewal
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el socio', error });
  }
});

// Obtener todos los member
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().populate('activities');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener socios', error });
  }
});

// Renovar membresía de un socio
router.put('/:id/renew', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Socio no encontrado' });

    const newExpiration = member.plan.type === 'monthly' ?
      new Date(new Date(member.plan.expirationDate).setMonth(new Date(member.plan.expirationDate).getMonth() + 1)) :
      new Date(new Date(member.plan.expirationDate).setMonth(new Date(member.plan.expirationDate).getMonth() + 6));

    member.plan.expirationDate = newExpiration;
    await member.save();
    
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error al renovar la membresía', error });
  }
});

// Obtener facturación del mes
router.get('/facturation/:month/:year', async (req, res) => {
  const { month, year } = req.params;
  try {
    const initMonth = new Date(`${year}-${month}-01`);
    const endMonth = new Date(initMonth.getFullYear(), initMonth.getMonth() + 1, 0);

    const member = await Member.find({
      'plan.expirationDate': { $gte: initMonth, $lte: endMonth }
    }).populate('activities');

    const totalFacturated = member.reduce((total, member) => {
      if (member.plan.promotion) {
        return total + member.plan.price;
      } else {
        const priceActivities = member.activities.reduce((sum, activity) => sum + activity.price, 0);
      return total + member.plan.price + priceActivities;
      }     
    }, 0);

    res.status(200).json({ total: totalFacturated, member: member.length });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la facturación', error });
  }
});

module.exports = router;
