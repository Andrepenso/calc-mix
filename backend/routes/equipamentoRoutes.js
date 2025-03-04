const express = require("express");
const multer = require("multer");
const Equipamento = require("../models/Equipamento");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📂 Configuração do Multer para armazenar imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Salva os arquivos na pasta 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Define um nome único
  },
});

const upload = multer({ storage });

// 📌 Criar um novo equipamento com upload de imagem
router.post("/", authMiddleware, upload.single("imagem"), async (req, res) => {
  try {
    const novoEquipamento = new Equipamento({
      ...req.body,
      valor: req.body.valor, // 💰 Adiciona o valor
      imagem: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await novoEquipamento.save();
    res.status(201).json(novoEquipamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar equipamento" });
  }
});


// 📌 Listar todos os equipamentos
router.get("/", async (req, res) => {
  try {
    const equipamentos = await Equipamento.find();
    res.json(equipamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar equipamentos" });
  }
});

// 📌 Editar um equipamento por ID
router.put("/:id", authMiddleware, upload.single("imagem"), async (req, res) => {
  try {
    const updateData = { ...req.body, valor: req.body.valor }; // 💰 Atualiza o valor

    if (req.file) {
      updateData.imagem = `/uploads/${req.file.filename}`;
    }

    const equipamento = await Equipamento.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(equipamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar equipamento" });
  }
});


// 📌 Deletar um equipamento por ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Equipamento.findByIdAndDelete(req.params.id);
    res.json({ message: "Equipamento deletado!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar equipamento" });
  }
});

// Servir imagens estáticas
router.use("/uploads", express.static("uploads"));

module.exports = router;
