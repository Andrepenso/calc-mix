const User = require("../models/User"); // Importa o modelo de usuário
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Função para login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("🔹 Tentativa de login com:", username, password);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ Usuário não encontrado no banco de dados!");
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    console.log("✅ Usuário encontrado:", user);

    // Comparação de senha
    console.log("🔹 Senha digitada:", password);
    console.log("🔹 Senha armazenada no banco:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Resultado da comparação de senha:", isMatch);

    if (!isMatch) {
      console.log("❌ Senha incorreta!");
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    console.log("✅ Login bem-sucedido! Token gerado:", token);

    res.json({ token });

  } catch (error) {
    console.error("❌ Erro no login:", error);
    res.status(500).json({ error: "Erro no login" });
  }
};

// Função para registrar um usuário
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("🔹 Criando usuário:", username);

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
