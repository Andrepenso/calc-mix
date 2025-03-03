const mongoose = require("mongoose");

const EquipamentoSchema = new mongoose.Schema({
  nome: String,
  volume_balao: Number,
  capacidade_producao_hora: Number,
  capacidade_tanque_diesel: Number,
  capacidade_oleo_motor: Number,
  capacidade_oleo_hidraulico: Number,
  capacidade_oleo_redutor: Number,
  fluido_freios: Number,
  graxa: Number,
  descricao: String,
  imagem: String, // Novo campo para armazenar a URL da imagem
});

module.exports = mongoose.model("Equipamento", EquipamentoSchema);
