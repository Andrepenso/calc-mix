const mongoose = require("mongoose");

const EquipamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  volume_balao: { type: Number, required: true }, 
  capacidade_producao_hora: { type: Number, required: true },
  capacidade_tanque_diesel: { type: Number, required: true },
  capacidade_oleo_motor: { type: Number, required: true },
  capacidade_oleo_hidraulico: { type: Number, required: true },
  capacidade_oleo_redutor: { type: Number, required: true },
  fluido_freios: { type: Number, required: true },
  graxa: { type: Number, required: true },
  valor: { type: Number, required: true }, 
  descricao: { type: String, required: true },
  imagem: { type: String } // Caminho da imagem (opcional)
});

module.exports = mongoose.model("Equipamento", EquipamentoSchema);
