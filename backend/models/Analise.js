const mongoose = require("mongoose");

const AnaliseSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },

    equipamento: { type: String, required: true },
    traco: { type: String, required: true },

    cimento: { type: Number, required: true },
    areia: { type: Number, required: true },
    brita: { type: Number, required: true },
    agua: { type: Number, required: true },
    aditivo: { type: Number, required: true },
    concretoUsinado: { type: Number, required: true },

    resultadoFinal: { type: Number, required: true },

    criadoEm: { type: Date, default: Date.now },
    atendido: {
        type: String,
        enum: ["Não Atendido", "Em Atendimento", "Atendido"],
        default: "Não Atendido"
    }

});

module.exports = mongoose.model("Analise", AnaliseSchema);
