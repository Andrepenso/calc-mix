import { useEffect, useState } from "react";
import axios from "axios";

function Locacao() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [prazoMeses, setPrazoMeses] = useState("");
  const [quantidadeConcreto, setQuantidadeConcreto] = useState("");
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/equipamentos`);
      setEquipamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  const handleCalculate = () => {
    if (!prazoMeses || !quantidadeConcreto) {
      alert("Preencha todos os campos.");
      return;
    }

    const diasUteisTotais = prazoMeses * 22;
    const volumePorDiaNecessario = quantidadeConcreto / diasUteisTotais;

    console.log(`Volume diário necessário: ${volumePorDiaNecessario.toFixed(2)} m³/dia`);

    // Próximo passo: buscar o equipamento ideal
    const jornadaDiariaHoras = 8; // Jornada de 8h por dia

    // Procurar equipamento que atenda
    const equipamentoIdeal = equipamentos.find((equip) => {
      const capacidadeDiaria = (equip.capacidade_producao_hora || 0) * jornadaDiariaHoras;
      return capacidadeDiaria >= volumePorDiaNecessario;
    });

    if (equipamentoIdeal) {
      setResultado(`Equipamento ideal: ${equipamentoIdeal.nome}`);
    } else {
      setResultado("Nenhum equipamento disponível atende à necessidade.");
    }
  };

  return (
    <div className="p-6 pt-24 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Comparação de Locação de Equipamentos</h1>

      <div className="mb-4">
        <label className="block font-semibold">Prazo da Obra (meses):</label>
        <input
          type="number"
          className="border p-2 w-full mt-1 rounded"
          value={prazoMeses}
          onChange={(e) => setPrazoMeses(e.target.value)}
          min="1"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Quantidade de Concreto (m³):</label>
        <input
          type="number"
          className="border p-2 w-full mt-1 rounded"
          value={quantidadeConcreto}
          onChange={(e) => setQuantidadeConcreto(e.target.value)}
          min="1"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleCalculate}
      >
        Calcular
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold text-lg">Resultado:</h2>
          <p className="mt-2">{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default Locacao;
