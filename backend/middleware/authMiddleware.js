const jwt = require("jsonwebtoken");

// Middleware para proteger as rotas
module.exports = (req, res, next) => {
  const token = req.header("Authorization"); // Lê o token do cabeçalho

  if (!token) return res.status(401).json({ error: "Acesso negado!" }); // Se não houver token, bloqueia o acesso

  try {
    // Remove "Bearer " do token e verifica se é válido
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Adiciona o usuário no objeto da requisição
    next(); // Continua para a próxima função
  } catch (error) {
    res.status(403).json({ error: "Token inválido!" }); // Se o token for inválido, retorna erro
  }
};
