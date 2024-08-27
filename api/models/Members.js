const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  cellphone: String,
  plan: {
    type: { type: String, enum: ['monthly', 'semiannual'], required: true },
    initDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    price: { type: Number, required: true },
    promo: Boolean,
  },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  automaticRenewal: { type: Boolean, default: true },
}, { timestamps: true });

memberSchema.pre("save", function (next) {
  if (this.plan.promo && this.activities.includes('musculation')) {
    this.plan.price = 18000;
  } else {
    this.plan.price = this.activitiies.length * 16000;
  }
  next();
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
