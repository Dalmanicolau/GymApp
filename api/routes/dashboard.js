import express from 'express';
import Member from "../../models/Members.js";
import Activity from "../../models/Activity.js";
import Payment from "../../models/Payments.js";
import Notification from "../../models/Notification.js";

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    const monthDate = new Date(today.setMonth(today.getMonth() - 1));

    const membersCount = await Member.countDocuments({});
    const unpaidCount = await Payment.countDocuments({ credit: { $gt: 0 } });

    const membersPerMonth = await Member.countDocuments({
      createdAt: { $gte: monthDate },
    });

    const payments = await Payment.find();

    const table = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const monthlySubs = await Member.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          subs: { $sum: 1 },
        },
      },
    ]);

    monthlySubs.forEach((item) => {
      table[item._id] = item.subs;
    });

    const sportsIncome = await Payment.aggregate([
      {
        $group: {
          _id: "$activity",
          income: { $sum: "$amount" },
        },
      },
    ]);

    const activityByIncome = await Promise.all(
      sportsIncome.map(async (i) => {
        const sport = await Activity.findById(i._id);
        const income = i.income;
        return { sport, income };
      })
    );

    const totalIncome = payments.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);

    const notifications = await Notification.find({});

    const sportsMembers = await Payment.aggregate([
      { "$group": { _id: "$activity", count: { $sum: 1 } } }
    ]);

    const sportsByMembers = await Promise.all(
      sportsMembers.map(async (i) => {
        const sport = await SportType.findById(i._id);
        const members = i.count;
        return { sport, members };
      })
    );

    res.send({
      membersCount,
      totalIncome,
      membersPerMonth,
      unpaidCount,
      table,
      activityByIncome,
      notifications,
      sportsByMembers
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al obtener datos del dashboard', error: err });
  }
});

module.exports = router;
