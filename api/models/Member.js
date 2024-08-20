const mongoose = require('mongoose');

const socioSchema = new mongoose.Schema({
  name: String,
  email: String,
  cellphone: String,
  photo: String,
  plan: {
    tipo: { type: String, enum: ['mensual', 'semestral'], required: true },
    fechaInicio: { type: Date, required: true },
    fechaVencimiento: { type: Date, required: true }
  },
  actividades: [String],
}, { timestamps: true });

const Socio = mongoose.model('Socio', socioSchema);
module.exports = Socio;