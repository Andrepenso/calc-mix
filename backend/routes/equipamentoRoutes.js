const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Equipamento = require("../models/Equipamento");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📂 Garante que a pasta de uploads existe
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📂 Configuração do Multer para armazenar imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Criar um novo equipamento com upload de imagem
router.post("/", authMiddleware, upload.single("imagem"), async (req, res) => {
  try {
    const equipamentoData = { ...req.body };
    
    // Converte valores numéricos corretamente
    ["valor", "volume_balao", "capacidade_producao_hora", "capacidade_tanque_diesel", "capacidade_oleo_motor", "capacidade_oleo_hidraulico", "capacidade_oleo_redutor", "fluido_freios", "graxa"].forEach((campo) => {
      if (equipamentoData[campo]) {
        equipamentoData[campo] = parseFloat(equipamentoData[campo]);
      }
    });

    // Adiciona a imagem apenas se estiver presente
    if (req.file) {
      equipamentoData.imagem = `/uploads/${req.file.filename}`;
    }

    const novoEquipamento = new Equipamento(equipamentoData);
    await novoEquipamento.save();
    res.status(201).json(novoEquipamento);
  } catch (error) {
    console.error("Erro ao criar equipamento:", error);
    res.status(500).json({ error: "Erro ao criar equipamento", details: error.message });
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
    const updateData = { ...req.body };
    
    // Converte valores numéricos corretamente
    ["valor", "volume_balao", "capacidade_producao_hora", "capacidade_tanque_diesel", "capacidade_oleo_motor", "capacidade_oleo_hidraulico", "capacidade_oleo_redutor", "fluido_freios", "graxa"].forEach((campo) => {
      if (updateData[campo]) {
        updateData[campo] = parseFloat(updateData[campo]);
      }
    });

    if (req.file) {
      updateData.imagem = `/uploads/${req.file.filename}`;
    }

    const equipamento = await Equipamento.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(equipamento);
  } catch (error) {
    console.error("Erro ao editar equipamento:", error);
    res.status(500).json({ error: "Erro ao editar equipamento", details: error.message });
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
