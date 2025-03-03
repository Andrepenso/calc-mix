const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definição do esquema (schema) do usuário no MongoDB
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nome de usuário único
  password: { type: String, required: true }, // Senha criptografada
});

// Antes de salvar no banco, criptografa a senha do usuário
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Se a senha não mudou, continua normalmente
  this.password = await bcrypt.hash(this.password, 10); // Criptografa a senha com 10 rounds de salt
  next();
});

module.exports = mongoose.model("User", UserSchema); // Exporta o modelo de Usuário
