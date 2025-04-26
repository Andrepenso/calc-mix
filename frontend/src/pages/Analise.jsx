import { useEffect, useState } from "react";
import axios from "axios";

function Analise() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [tracos, setTracos] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState("");
  const [selectedTraco, setSelectedTraco] = useState("");
  const [costs, setCosts] = useState({
    areia: "",
    agua: "",
    cimento: "",
    brita: "",
    aditivo: "",
    concretoUsinado: "",
  });
  const [result, setResult] = useState(null);

  // Buscar equipamentos e traços do back-end
  useEffect(() => {
    fetchEquipamentos();
    fetchTracos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/equipamentos`);
      setEquipamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  const fetchTracos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracos`);
      setTracos(response.data);
    } catch (error) {
      console.error("Erro ao buscar traços", error);
    }
  };

  // Atualizar o equipamento selecionado
  const handleChangeEquip = (e) => {
    setSelectedEquip(e.target.value);
  };

  // Atualizar o traço selecionado
  const handleChangeTraco = (e) => {
    setSelectedTraco(e.target.value);
  };

  // Atualizar valores de custo conforme o usuário digita
  const handleChangeCost = (e) => {
    setCosts({ ...costs, [e.target.name]: e.target.value });
  };

  // Lógica para calcular ou enviar os dados
  const handleCalculate = () => {
    if (!selectedEquip) {
      alert("Por favor, selecione um equipamento.");
      return;
    }
    if (!selectedTraco) {
      alert("Por favor, selecione um traço de concreto.");
      return;
    }

    // Encontrar o equipamento e o traço selecionados
    const equipEscolhido = equipamentos.find((e) => e._id === selectedEquip);
    const tracoEscolhido = tracos.find((t) => t._id === selectedTraco);

    if (!equipEscolhido) {
      alert("Equipamento inválido. Selecione outro.");
      return;
    }
    if (!tracoEscolhido) {
      alert("Traço inválido. Selecione outro.");
      return;
    }

    // Quantidades do traço (ajuste se os nomes forem diferentes)
    const {
      quantidade_cimento,
      quantidade_areia,
      quantidade_brita,
      quantidade_agua,
      quantidade_aditivo,
    } = tracoEscolhido;

    // Custos unitários informados pelo usuário
    const custoCimento = parseFloat(costs.cimento) || 0;
    const custoAreia = parseFloat(costs.areia) || 0;
    const custoBrita = parseFloat(costs.brita) || 0;
    const custoAgua = parseFloat(costs.agua) || 0;
    const custoAditivo = parseFloat(costs.aditivo) || 0;
    const custoUsinado = parseFloat(costs.concretoUsinado) || 0;

    // Cálculo do custo de produção própria
    const totalCimento = (parseFloat(quantidade_cimento) || 0) * custoCimento;
    const totalAreia = (parseFloat(quantidade_areia) || 0) * custoAreia;
    const totalBrita = (parseFloat(quantidade_brita) || 0) * custoBrita;
    const totalAgua = (parseFloat(quantidade_agua) || 0) * custoAgua;
    const totalAditivo = (parseFloat(quantidade_aditivo) || 0) * custoAditivo;
    const totalProducaoPropria = totalCimento + totalAreia + totalBrita + totalAgua + totalAditivo;

    // Atualiza o resultado com o nome e a imagem do equipamento selecionado
    setResult({
      equipamentoNome: equipEscolhido.nome,
      equipamentoImagem: equipEscolhido.imagem_url || null,
      traco: tracoEscolhido.nome,
      totalProducaoPropria,
      custoUsinado,
    });
  } // Fecha aqui a função handleCalculate corretamente!

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

      {/* Selecionar traço */}
      <div className="mb-4">
        <label className="block font-semibold">Traço de Concreto:</label>
        <select
          className="border p-2 w-full mt-1 rounded"
          value={selectedTraco}
          onChange={handleChangeTraco}
        >
          <option value="">Selecione um traço</option>
          {tracos.map((t) => (
            <option key={t._id} value={t._id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Formulário de custos */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Cimento (R$/kg):</label>
          <input
            className="border p-2 w-full mt-1 rounded"
            type="number"
            step="0.01"
            name="cimento"
            value={costs.cimento}
            onChange={handleChangeCost}
          />
        </div>
        <div>
          <label className="block font-semibold">Areia (R$/kg):</label>
          <input
            className="border p-2 w-full mt-1 rounded"
            type="number"
            step="0.01"
            name="areia"
            value={costs.areia}
            onChange={handleChangeCost}
          />
        </div>
        <div>
          <label className="block font-semibold">Brita (R$/kg):</label>
          <input
            className="border p-2 w-full mt-1 rounded"
            type="number"
            step="0.01"
            name="brita"
            value={costs.brita}
            onChange={handleChangeCost}
          />
        </div>
        <div>
          <label className="block font-semibold">Água (R$/L):</label>
          <input
            className="border p-2 w-full mt-1 rounded"
            type="number"
            step="0.01"
            name="agua"
            value={costs.agua}
            onChange={handleChangeCost}
          />
        </div>
        <div>
          <label className="block font-semibold">Aditivo (R$/L):</label>
          <input
            className="border p-2 w-full mt-1 rounded"
            type="number"
            step="0.01"
            name="aditivo"
            value={costs.aditivo}
            onChange={handleChangeCost}
          />
        </div>
        <div>
          <label className="block font-semibold">Concreto Usinado (R$/m³):</label>
          <input
            className="border p-2 w-full mt-1 rounded"
            type="number"
            step="0.01"
            name="concretoUsinado"
            value={costs.concretoUsinado}
            onChange={handleChangeCost}
          />
        </div>
      </div>

      {/* Botão Calcular */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6 w-full"
        onClick={handleCalculate}
      >
        Calcular
      </button>

      {/* Exibir resultado */}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold text-lg">Resultado da Análise:</h2>
          <div className="flex items-center mt-2">
            {result.equipamentoImagem ? (
              <img
                src={result.equipamentoImagem}
                alt={result.equipamentoNome}
                className="w-16 h-16 object-cover rounded mr-4"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "/img/sem-imagem.jpg"; }}
              />
            ) : (
              <img
                src="/img/sem-imagem.jpg"
                alt="Sem imagem"
                className="w-16 h-16 object-cover rounded mr-4"
              />
            )}

            <p>
              <strong>Equipamento Selecionado:</strong> {result.equipamentoNome}
            </p>
          </div>
          <p>
            <strong>Traço Selecionado:</strong> {result.traco}
          </p>
          <p className="mt-2">
            <strong>Custo de Produção Própria:</strong> R$ {result.totalProducaoPropria.toFixed(2)}
          </p>
          <p>
            <strong>Custo de Concreto Usinado:</strong> R$ {result.custoUsinado.toFixed(2)}
          </p>
          <p className="mt-2">
            {result.totalProducaoPropria < result.custoUsinado
              ? "A produção própria é mais barata."
              : "O concreto usinado é mais barato ou igual."}
          </p>
        </div>
      )}
    </div>
  );
}

export default Analise;
