const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Equipamento = require("../models/Equipamento");
const authMiddleware = require("../middleware/authMiddleware");

// 📦 Cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 🔐 Configurar Cloudinary
cloudinary.config({
  cloud_name: "dgfgh3yss",
  api_key: "996616576396797",
  api_secret: "Wq94lQjfsibEM3gHV2g2OaR3d6w",
});

// 🎒 Configurar armazenamento em nuvem via multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "equipamentos",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

const router = express.Router();

// 📌 Helper: formata números corretamente
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

    if (req.file && req.file.path) {
      equipamentoData.imagem = req.file.path; // URL do Cloudinary
    }

    const novoEquipamento = new Equipamento(equipamentoData);
    await novoEquipamento.save();
    res.status(201).json(novoEquipamento);
  } catch (error) {
    console.error("❌ Erro ao criar equipamento:", error);
    res.status(500).json({ error: "Erro ao criar equipamento", details: error.message });
  }
});

// 📌 Listar todos os equipamentos
router.get("/", async (req, res) => {
  try {
    const equipamentos = await Equipamento.find();

    const equipamentosComImagemUrl = equipamentos.map(equip => ({
      ...equip.toObject(),
      imagem_url: equip.imagem || null,
    }));

    res.json(equipamentosComImagemUrl);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar equipamentos" });
  }
});


// 📌 Editar um equipamento
router.put("/:id", authMiddleware, upload.single("imagem"), async (req, res) => {
  try {
    const updateData = formatarNumeros({ ...req.body });

    if (req.file && req.file.path) {
      updateData.imagem = req.file.path;
    }

    const equipamento = await Equipamento.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(equipamento);
  } catch (error) {
    console.error("❌ Erro ao editar equipamento:", error);
    res.status(500).json({ error: "Erro ao editar equipamento", details: error.message });
  }
});

// 📌 Deletar equipamento
const path = require("path");

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const equipamento = await Equipamento.findById(req.params.id);

    if (!equipamento) {
      return res.status(404).json({ error: "Equipamento não encontrado." });
    }

    // Deletar imagem do Cloudinary, se existir
    if (equipamento.imagem) {
      const url = equipamento.imagem;

      const urlParts = url.split("/");
      const filename = urlParts[urlParts.length - 1]; // ex: abc123.jpg
      const folder = urlParts[urlParts.length - 2];   // ex: equipamentos

      const publicId = `${folder}/${path.parse(filename).name}`; // equipamentos/abc123

      await cloudinary.uploader.destroy(publicId);
    }

    // 🧹 Deletar o documento do Mongo
    await Equipamento.findByIdAndDelete(req.params.id);

    res.json({ message: "Equipamento e imagem removidos com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    res.status(500).json({ error: "Erro ao deletar equipamento", details: error.message });
  }
});


module.exports = router;
