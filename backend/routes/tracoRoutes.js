const express = require("express");
const Traco = require("../models/Traco");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Criar um novo traço de concreto
router.post("/", authMiddleware, async (req, res) => {
  try {
    const novoTraco = new Traco(req.body);
    await novoTraco.save();
    res.status(201).json(novoTraco);
  } catch (error) {
    console.error("❌ Erro ao criar traço:", error);
    res.status(500).json({ error: "Erro ao criar traço de concreto" });
  }
});

// Listar todos os traços de concreto
router.get("/", async (req, res) => {
  try {
    const tracos = await Traco.find();
    res.json(tracos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar traços de concreto" });
  }
});

// Editar um traço de concreto por ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const traco = await Traco.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(traco);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar traço de concreto" });
  }
});

// Deletar um traço de concreto por ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Traco.findByIdAndDelete(req.params.id);
    res.json({ message: "Traço de concreto deletado!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar traço de concreto" });
  }
});

module.exports = router;
