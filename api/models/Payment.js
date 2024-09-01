import mongoose from 'mongoose';
import Notifications from"./notifications.js";


const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  months: {
    type: Number,
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activity",
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
  date: {
    type: Date,
  },
});

paymentSchema.pre('findByIdAndRemove', function(next) {
  Notifications.deleteMany({payment: this._id});
  next();
});

const Payment = mongoose.model("payment", paymentSchema);
export default Payment;
