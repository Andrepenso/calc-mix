const express = require("express");
const Equipamento = require("../models/Equipamento");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Criar um novo equipamento
router.post("/", authMiddleware, async (req, res) => {
  try {
    const novoEquipamento = new Equipamento(req.body);
    await novoEquipamento.save();
    res.status(201).json(novoEquipamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar equipamento" });
  }
});

// Listar todos os equipamentos
router.get("/", async (req, res) => {
  const equipamentos = await Equipamento.find();
  res.json(equipamentos);
});

// Editar um equipamento por ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const equipamento = await Equipamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(equipamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar equipamento" });
  }
});

// Deletar um equipamento por ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Equipamento.findByIdAndDelete(req.params.id);
    res.json({ message: "Equipamento deletado!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar equipamento" });
  }
});

module.exports = router;
