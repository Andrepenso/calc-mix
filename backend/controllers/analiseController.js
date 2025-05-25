const Analise = require("../models/Analise");

exports.salvarAnalise = async (req, res) => {
  try {
    const novaAnalise = new Analise(req.body);
    await novaAnalise.save();
    res.status(201).json({ message: "Análise salva com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar análise:", error);
    res.status(500).json({ error: "Erro ao salvar análise" });
  }
};

exports.listarAnalises = async (req, res) => {
    try {
      const analises = await Analise.find().sort({ criadoEm: -1 }); // mais recentes primeiro
      res.status(200).json(analises);
    } catch (error) {
      console.error("Erro ao buscar análises:", error);
      res.status(500).json({ error: "Erro ao buscar análises" });
    }
  };

  exports.atualizarStatusAtendimento = async (req, res) => {
    try {
      const { id } = req.params;
      const { atendido } = req.body;
  
      const analise = await Analise.findByIdAndUpdate(
        id,
        { atendido },
        { new: true }
      );
  
      if (!analise) {
        return res.status(404).json({ error: "Análise não encontrada." });
      }
  
      res.status(200).json(analise);
    } catch (error) {
      console.error("Erro ao atualizar status de atendimento:", error);
      res.status(500).json({ error: "Erro ao atualizar análise." });
    }
  };

  



  
  
  
