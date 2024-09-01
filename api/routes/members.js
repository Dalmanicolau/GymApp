const express = require('express');
const router = express.Router();
const Member = require('../models/Members');
const Activity = require('../models/Activity');

router.post('/', async (req, res) => {
  try {
    const { name, email, cellphone, plan, activities, automaticRenewal, promotion } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: 'El miembro ya existe. No se puede crear un duplicado.' });
    }

    const activityIds = activities.map(id => id.toString());
    const activitiesData = await Activity.find({ '_id': { $in: activityIds } });

    let totalPriceActivities = 0;

    if (promotion) {
      const musculacion = await Activity.findOne({ name: 'Musculacion' });
      if (!musculacion) {
        return res.status(400).json({ message: 'La actividad de musculación no se encontró en la base de datos.' });
      }
      if (!activityIds.includes(musculacion._id.toString())) {
        return res.status(400).json({ message: 'La promoción debe incluir musculación.' });
      }
      if (activityIds.length !== 2) {
        return res.status(400).json({ message: 'La promoción permite máximo 2 actividades.' });
      }
      totalPriceActivities = 17000;
    } else {
      const uniqueActivities = new Set(activitiesData.map(activity => activity.name));
      totalPriceActivities = uniqueActivities.size === 1 && uniqueActivities.has("Musculacion") ? 16000 : 16000;
    }

    const expirationDate = plan.type === 'monthly' ? 
      new Date(new Date(plan.initDate).setMonth(new Date(plan.initDate).getMonth() + 1)) :
      new Date(new Date(plan.initDate).setMonth(new Date(plan.initDate).getMonth() + 6));

    const newMember = new Member({
      name,
      email,
      cellphone,
      plan: {
        type: plan.type,
        promotion: promotion,
        price: totalPriceActivities,
        initDate: plan.initDate,
        expirationDate: expirationDate,
        lastRenewalDate: plan.initDate
      },
      activities: activityIds,
      automaticRenewal
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.log(error);
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

    const currentDate = new Date();
    member.plan.lastRenewalDate = currentDate;

    const newExpiration = member.plan.type === 'monthly' ?
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()) :
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate());

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
    const endMonth = new Date(initMonth.getFullYear(), initMonth.getMonth() + 2, 0, 23, 59, 59); // último día del mes actual

    console.log('initMonth:', initMonth);
    console.log('endMonth:', endMonth);

    const members = await Member.find({
      $or: [
        { 'plan.initDate': { $gte: initMonth, $lte: endMonth } },
        { 'plan.lastRenewalDate': { $gte: initMonth, $lte: endMonth } }
      ]
    }).populate('activities');

    console.log('members found:', members);

    const totalFacturated = members.reduce((total, member) => {
      if (member.plan.promotion) {
        return total + member.plan.price;
      } else {
        const priceActivities = member.activities.reduce((sum, activity) => sum + activity.price, 0);
        return total + member.plan.price + priceActivities;
      }     
    }, 0);

    res.status(200).json({ total: totalFacturated, members: members.length });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al obtener la facturación', error });
  }
});

module.exports = router;
