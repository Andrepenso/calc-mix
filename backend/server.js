const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const equipamentoRoutes = require("./routes/equipamentoRoutes");
const tracoRoutes = require("./routes/tracoRoutes");
const authRoutes = require("./routes/authRoutes"); // Importando as rotas de autenticação

const app = express(); // 🔹 AGORA `app` É INICIALIZADO ANTES DE USÁ-LO

// Middlewares globais
app.use(express.json()); // Permite JSON no corpo das requisições
app.use(cors()); // Habilita CORS para requisições de diferentes origens

// Conectar ao MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas conectado com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// 🔹 REGISTRAR AS ROTAS DEPOIS DE `app` SER INICIALIZADO
app.use("/api/auth", authRoutes); 
app.use("/api/equipamentos", equipamentoRoutes);
app.use("/api/tracos", tracoRoutes);

// Rota de teste para garantir que o servidor está funcionando
app.get("/", (req, res) => {
  res.send("API funcionando com autenticação JWT!");
});

// Criar admin ao iniciar o servidor
const User = require("./models/User");

const criarUsuarioAdmin = async () => {
  try {
    console.log("🔹 Removendo usuário admin...");
    await User.deleteOne({ username: "admin" }); // Apaga o admin caso exista

    console.log("🔹 Criando usuário admin...");
    const novoAdmin = new User({ username: "admin", password: "admin" }); // Agora passamos a senha em TEXTO PURO
    await novoAdmin.save();

    console.log("✅ Usuário admin recriado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao criar admin:", error);
  }
};

criarUsuarioAdmin();

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
