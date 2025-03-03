const mongoose = require("mongoose");

const TracoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  quantidade_cimento: { type: Number, required: true }, // kg
  quantidade_areia: { type: Number, required: true }, // kg
  quantidade_brita: { type: Number, required: true }, // kg
  quantidade_agua: { type: Number, required: true }, // litros
  quantidade_aditivo: { type: Number, required: false, default: 0 }, // litros (opcional)
});

module.exports = mongoose.model("Traco", TracoSchema);
