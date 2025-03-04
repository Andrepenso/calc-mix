const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 🏗️ Servir os arquivos do build do Vite
app.use(express.static(path.join(__dirname, "dist")));

// 🔀 Redirecionar todas as rotas para o `index.html`
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 🚀 Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Frontend rodando em: http://localhost:${PORT}`);
});
