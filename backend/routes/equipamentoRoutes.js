const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Equipamento = require("../models/Equipamento");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📂 Garante que a pasta de uploads existe
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📥 Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 📌 Helper: converte valores numéricos
function formatarNumeros(obj) {
  const camposNumericos = [
    "valor",
    "volume_balao",
    "capacidade_producao_hora",
    "capacidade_tanque_diesel",
    "capacidade_oleo_motor",
    "capacidade_oleo_hidraulico",
    "capacidade_oleo_redutor",
    "fluido_freios",
    "graxa",
  ];

  camposNumericos.forEach((campo) => {
    if (obj[campo]) {
      // Remove pontos de milhar e troca vírgula decimal por ponto
      const valorLimpo = String(obj[campo]).replace(/\./g, "").replace(",", ".");
      obj[campo] = parseFloat(valorLimpo);
    }
  });

  return obj;
}


// 📌 Criar novo equipamento
router.post("/", authMiddleware, upload.single("imagem"), async (req, res) => {
  try {
    const equipamentoData = formatarNumeros({ ...req.body });

    if (req.file) {
      equipamentoData.imagem = req.file.filename; // só o nome do arquivo
    }

    const novoEquipamento = new Equipamento(equipamentoData);
    await novoEquipamento.save();
    res.status(201).json(novoEquipamento);
  } catch (error) {
    console.error("Erro ao criar equipamento:", error);
    res.status(500).json({ error: "Erro ao criar equipamento", details: error.message });
  }
});

// 📌 Listar equipamentos
router.get("/", async (req, res) => {
  try {
    const equipamentos = await Equipamento.find();
    res.json(equipamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar equipamentos" });
  }
});

// 📌 Editar equipamento
router.put("/:id", authMiddleware, upload.single("imagem"), async (req, res) => {
  try {
    const updateData = formatarNumeros({ ...req.body });

    if (req.file) {
      updateData.imagem = req.file.filename;
    }

    const equipamento = await Equipamento.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(equipamento);
  } catch (error) {
    console.error("Erro ao editar equipamento:", error);
    res.status(500).json({ error: "Erro ao editar equipamento", details: error.message });
  }
});

// 📌 Deletar equipamento
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Equipamento.findByIdAndDelete(req.params.id);
    res.json({ message: "Equipamento deletado!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar equipamento" });
  }
});

module.exports = router;
