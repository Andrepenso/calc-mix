import { useEffect, useState } from "react";
import axios from "axios";

function AnaliseConcreto() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState("");
  const [costs, setCosts] = useState({
    areia: "",
    agua: "",
    cimento: "",
    brita: "",
    aditivo: "",
    concretoUsinado: "",
  });

  // 1. Buscar equipamentos do back-end
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

  // 2. Atualizar o equipamento selecionado
  const handleChangeEquip = (e) => {
    setSelectedEquip(e.target.value);
  };

  // 3. Atualizar valores de custo conforme o usuário digita
  const handleChangeCost = (e) => {
    setCosts({ ...costs, [e.target.name]: e.target.value });
  };

  // 4. Lógica para calcular ou enviar os dados
  const handleCalculate = () => {
    // Exemplo simples: imprimir no console
    console.log("Equipamento selecionado:", selectedEquip);
    console.log("Custos informados:", costs);
    
    // Aqui você pode implementar:
    // - Cálculos específicos
    // - Envio dos dados para uma rota de análise
    // - Exibir um resultado na tela, etc.
  };

  return (
    <div className="p-6 pt-24 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Comparação de Custo de Concreto</h1>
      
      {/* Selecionar equipamento */}
      <div className="mb-4">
        <label className="block font-semibold">Equipamento:</label>
        <select
          className="border p-2 w-full mt-1 rounded"
          value={selectedEquip}
          onChange={handleChangeEquip}
        >
          <option value="">Selecione um equipamento</option>
          {equipamentos.map((equip) => (
            <option key={equip._id} value={equip._id}>
              {equip.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Formulário de custos */}
      <div className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          type="number"
          step="0.01"
          name="areia"
          value={costs.areia}
          onChange={handleChangeCost}
          placeholder="Areia (R$/m³)"
        />
        <input
          className="border p-2 w-full rounded"
          type="number"
          step="0.01"
          name="agua"
          value={costs.agua}
          onChange={handleChangeCost}
          placeholder="Água (R$/litro)"
        />
        <input
          className="border p-2 w-full rounded"
          type="number"
          step="0.01"
          name="cimento"
          value={costs.cimento}
          onChange={handleChangeCost}
          placeholder="Cimento (R$/saco)"
        />
        <input
          className="border p-2 w-full rounded"
          type="number"
          step="0.01"
          name="brita"
          value={costs.brita}
          onChange={handleChangeCost}
          placeholder="Brita (R$/m³)"
        />
        <input
          className="border p-2 w-full rounded"
          type="number"
          step="0.01"
          name="aditivo"
          value={costs.aditivo}
          onChange={handleChangeCost}
          placeholder="Aditivo (R$/litro)"
        />
        <input
          className="border p-2 w-full rounded"
          type="number"
          step="0.01"
          name="concretoUsinado"
          value={costs.concretoUsinado}
          onChange={handleChangeCost}
          placeholder="Concreto Usinado (R$/m³)"
        />
      </div>

      {/* Botão Calcular */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6 w-full"
        onClick={handleCalculate}
      >
        Calcular
      </button>
    </div>
  );
}

export default Analise;
