import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import FormularioUsuario from "../components/FormularioUsuario";


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
  const [salarios, setSalarios] = useState({
    operador: "",
    ajudante: "",
    mecanico: ""
  });
  const [unidades, setUnidades] = useState({
    cimento: "kg",     // ou "saco"
    agua: "L",         // ou "m3"
  });
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dadosParaEnvio, setDadosParaEnvio] = useState(null);


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

  const converterCustoParaUnidadePadrao = (valor, unidade, material) => {
    const val = parseFloat(valor) || 0;

    const densidades = {
      areia: 1500, // kg/m³
      brita: 1600, // kg/m³
    };

    switch (material) {
      case "cimento":
        return unidade === "saco" ? val / 50 : val; // R$/saco → R$/kg
      case "areia":
      case "brita":
        return val / densidades[material]; // R$/m³ → R$/kg
      case "agua":
        return unidade === "m3" ? val / 1000 : val; // R$/m³ → R$/L
      default:
        return val;
    }
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

    // Produção mensal em cada cenário
    const horasMesMax = 160; // 8h/dia × 20 dias
    const horasMesNormal = 80; // 4h/dia × 20 dias
    const horasMesBaixa = 20; // 1h/dia × 20 dias



    // Encontrar o equipamento e o traço selecionados
    const equipEscolhido = equipamentos.find((e) => e._id === selectedEquip);
    const capacidadeProducaoHora = parseFloat(equipEscolhido.capacidade_producao_hora) || 0;
    const tracoEscolhido = tracos.find((t) => t._id === selectedTraco);

    if (!equipEscolhido) {
      alert("Equipamento inválido. Selecione outro.");
      return;
    }
    if (!tracoEscolhido) {
      alert("Traço inválido. Selecione outro.");
      return;
    }

    // Quantidades do traço 
    const {
      quantidade_cimento,
      quantidade_areia,
      quantidade_brita,
      quantidade_agua,
      quantidade_aditivo,
    } = tracoEscolhido;

    // Custos unitários informados pelo usuário
    const custoCimento = converterCustoParaUnidadePadrao(costs.cimento, unidades.cimento, "cimento");
    const custoAreia = converterCustoParaUnidadePadrao(costs.areia, "m3", "areia");
    const custoBrita = converterCustoParaUnidadePadrao(costs.brita, "m3", "brita");
    const custoAgua = converterCustoParaUnidadePadrao(costs.agua, unidades.agua, "agua");
    const custoAditivo = parseFloat(costs.aditivo) || 0;
    const custoUsinado = parseFloat(costs.concretoUsinado) || 0;
    const valorEquipamento = parseFloat(equipEscolhido.valor) || 0;
    const custoDepreciacao = valorEquipamento * 0.0003; // 
    const depreciacaoHora = custoDepreciacao / 8; // 


    // Cálculo do custo de produção própria
    const totalCimento = (parseFloat(quantidade_cimento) || 0) * custoCimento;
    const totalAreia = (parseFloat(quantidade_areia) || 0) * custoAreia;
    const totalBrita = (parseFloat(quantidade_brita) || 0) * custoBrita;
    const totalAgua = (parseFloat(quantidade_agua) || 0) * custoAgua;
    const totalAditivo = (parseFloat(quantidade_aditivo) || 0) * custoAditivo;

    // Etapa 1: Soma total dos agregados por m³
    const custoAgregadosPorM3 =
      (parseFloat(quantidade_cimento) || 0) * custoCimento +
      (parseFloat(quantidade_areia) || 0) * custoAreia +
      (parseFloat(quantidade_brita) || 0) * custoBrita +
      (parseFloat(quantidade_agua) || 0) * custoAgua +
      (parseFloat(quantidade_aditivo) || 0) * custoAditivo;

    console.log("🧱 Custo dos agregados por m³:", custoAgregadosPorM3.toFixed(2));


    // Fatores de participação por profissional
    const fatoresMaoDeObra = {
      operador: 1,
      ajudante: 1,
      mecanico: 0.2,
    };

    // Função que calcula o custo diário considerando fator de trabalho
    const calcularCustoDiario = (salarioMensal, fator) => {
      const salario = parseFloat(salarioMensal) || 0;
      return ((salario * 13.33) / 220) * fator;
    };

    // 🛠️ Correção: definir custos individuais primeiro
    const custoOperadorDia = calcularCustoDiario(salarios.operador, fatoresMaoDeObra.operador);
    const custoAjudanteDia = calcularCustoDiario(salarios.ajudante, fatoresMaoDeObra.ajudante);
    const custoMecanicoDia = calcularCustoDiario(salarios.mecanico, fatoresMaoDeObra.mecanico);

    // ✅ Soma total
    const custoMaoDeObraTotalDia = custoOperadorDia + custoAjudanteDia + custoMecanicoDia;



    const custoHoraMaoDeObra = custoMaoDeObraTotalDia / 8;

    const maoDeObraMensal = {
      max: custoHoraMaoDeObra * horasMesMax,
      normal: custoHoraMaoDeObra * horasMesNormal,
      baixa: custoHoraMaoDeObra * horasMesBaixa
    };



    // Log opcional para conferência
    console.log('🧾 Custo Mão de Obra Detalhado:', {
      operador: custoOperadorDia.toFixed(2),
      ajudante: custoAjudanteDia.toFixed(2),
      mecanico: custoMecanicoDia.toFixed(2),
      total: custoMaoDeObraTotalDia.toFixed(2),
    });


    const totalProducaoPropria = totalCimento + totalAreia + totalBrita + totalAgua + totalAditivo;



    const producaoMax = capacidadeProducaoHora * 8 * 20;
    const producaoNormal = (capacidadeProducaoHora / 2) * 8 * 20;
    const producaoBaixa = capacidadeProducaoHora * 20;




    const depreciacaoMax = depreciacaoHora * horasMesMax;
    const depreciacaoNormal = depreciacaoHora * horasMesNormal;
    const depreciacaoBaixa = depreciacaoHora * horasMesBaixa;

    // Etapa 2: Agregados por produção mensal
    const custoAgregadosProducao = {
      max: custoAgregadosPorM3 * producaoMax,
      normal: custoAgregadosPorM3 * producaoNormal,
      baixa: custoAgregadosPorM3 * producaoBaixa
    };

    console.log("💰 Custo total de agregados por produção mensal:");
    console.table(custoAgregadosProducao);

    // Etapa 3: somar agregados + depreciação + mão de obra por cenário
    const custoTotalMensal = {
      max: custoAgregadosProducao.max + depreciacaoMax + maoDeObraMensal.max,
      normal: custoAgregadosProducao.normal + depreciacaoNormal + maoDeObraMensal.normal,
      baixa: custoAgregadosProducao.baixa + depreciacaoBaixa + maoDeObraMensal.baixa,
    };


    const custoUnitarioPorM3 = {
      max: custoTotalMensal.max / producaoMax,
      normal: custoTotalMensal.normal / producaoNormal,
      baixa: custoTotalMensal.baixa / producaoBaixa,
    };
    // Ganho líquido por m³
    const ganhoLiquidoPorM3 = {
      max: custoUsinado - custoUnitarioPorM3.max,
      normal: custoUsinado - custoUnitarioPorM3.normal,
      baixa: custoUsinado - custoUnitarioPorM3.baixa,
    };

    // Produção por dia
    const producaoPorDia = {
      max: capacidadeProducaoHora * 8,
      normal: (capacidadeProducaoHora / 2) * 8,
      baixa: capacidadeProducaoHora,
    };

    // Recuperação do investimento
    const recuperacaoInvestimento = {
      m3: {
        max: valorEquipamento / ganhoLiquidoPorM3.max,
        normal: valorEquipamento / ganhoLiquidoPorM3.normal,
        baixa: valorEquipamento / ganhoLiquidoPorM3.baixa,
      },
      dias: {
        max: (valorEquipamento / ganhoLiquidoPorM3.max) / producaoPorDia.max,
        normal: (valorEquipamento / ganhoLiquidoPorM3.normal) / producaoPorDia.normal,
        baixa: (valorEquipamento / ganhoLiquidoPorM3.baixa) / producaoPorDia.baixa,
      },
      meses: {
        max: ((valorEquipamento / ganhoLiquidoPorM3.max) / producaoPorDia.max) / 20,
        normal: ((valorEquipamento / ganhoLiquidoPorM3.normal) / producaoPorDia.normal) / 20,
        baixa: ((valorEquipamento / ganhoLiquidoPorM3.baixa) / producaoPorDia.baixa) / 20,
      },
    };




    console.log("📊 Custo total por cenário:");
    console.table(custoTotalMensal);

    console.log("🧮 Custo por m³ (unitário):");
    console.table(custoUnitarioPorM3);




    // Atualiza o resultado com o nome e a imagem do equipamento selecionado
    setShowForm(true);
    setDadosParaEnvio({
      equipamento: equipEscolhido.nome,
      equipamentoImagem: equipEscolhido.imagem_url || "",
      traco: tracoEscolhido.nome,
      cimento: costs.cimento,
      areia: costs.areia,
      brita: costs.brita,
      agua: costs.agua,
      aditivo: parseFloat(costs.aditivo) || 0,
      concretoUsinado: costs.concretoUsinado,
      resultadoFinal: totalProducaoPropria,
      custoDepreciacao: custoDepreciacao.toFixed(2),
      custoMaoDeObra: custoMaoDeObraTotalDia.toFixed(2),
      capacidadeProducaoHora: equipEscolhido.capacidade_producao_hora,
      producaoMensal: {
        max: producaoMax,
        normal: producaoNormal,
        baixa: producaoBaixa
      },
      depreciacoes: {
        max: depreciacaoMax,
        normal: depreciacaoNormal,
        baixa: depreciacaoBaixa
      },

      ganhoLiquidoPorM3: ganhoLiquidoPorM3,
      recuperacaoInvestimento: recuperacaoInvestimento,
      custosTotais: custoTotalMensal,
      custosUnitarios: custoUnitarioPorM3,
      maoDeObraMensal: maoDeObraMensal,
      ganhos: ganhoLiquidoPorM3,





    });



    console.log('✅ Verificação final antes de setar resultado:');
    console.log({
      quantidades: {
        cimento: quantidade_cimento,
        areia: quantidade_areia,
        brita: quantidade_brita,
        agua: quantidade_agua,
        aditivo: quantidade_aditivo
      },
      custosConvertidos: {
        cimento: custoCimento,
        areia: custoAreia,
        brita: custoBrita,
        agua: custoAgua,
        aditivo: custoAditivo
      },
      totais: {
        cimento: totalCimento,
        areia: totalAreia,
        brita: totalBrita,
        agua: totalAgua,
        aditivo: totalAditivo,
        totalProducao: totalProducaoPropria
      },
      depreciacao: {
        porHora: depreciacaoHora.toFixed(2),
        diaria: custoDepreciacao.toFixed(2)
      }
    });
    console.table({
      max: {
        agregados: custoAgregadosProducao.max,
        deprec: depreciacaoMax,
        maoDeObra: maoDeObraMensal.max,
        total: custoTotalMensal.max,
        unitario: custoUnitarioPorM3.max,
      },
      normal: {
        agregados: custoAgregadosProducao.normal,
        deprec: depreciacaoNormal,
        maoDeObra: maoDeObraMensal.normal,
        total: custoTotalMensal.normal,
        unitario: custoUnitarioPorM3.normal,
      },
      baixa: {
        agregados: custoAgregadosProducao.baixa,
        deprec: depreciacaoBaixa,
        maoDeObra: maoDeObraMensal.baixa,
        total: custoTotalMensal.baixa,
        unitario: custoUnitarioPorM3.baixa,
      },
    });





  } // Fecha função handleCalculate!



  return (

    <div className="p-6 pt-24 max-w-6xl mx-auto w-full">

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
          <label className="block font-semibold">Cimento:</label>
          <div className="flex gap-2">
            <input
              className="border p-2 w-full rounded"
              type="number"
              step="0.01"
              name="cimento"
              value={costs.cimento}
              onChange={handleChangeCost}
            />
            <select
              className="border p-2 rounded"
              value={unidades.cimento}
              onChange={(e) => setUnidades({ ...unidades, cimento: e.target.value })}
            >
              <option value="kg">R$/kg</option>
              <option value="saco">R$/saco</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold">Areia (R$/m³):</label>
          <input
            className="border p-2 w-full rounded"
            type="number"
            step="0.01"
            name="areia"
            value={costs.areia}
            onChange={handleChangeCost}
          />
        </div>

        <div>
          <label className="block font-semibold">Brita (R$/m³):</label>
          <input
            className="border p-2 w-full rounded"
            type="number"
            step="0.01"
            name="brita"
            value={costs.brita}
            onChange={handleChangeCost}
          />
        </div>



        <div>
          <label className="block font-semibold">Água:</label>
          <div className="flex gap-2">
            <input
              className="border p-2 w-full rounded"
              type="number"
              step="0.01"
              name="agua"
              value={costs.agua}
              onChange={handleChangeCost}
            />
            <select
              className="border p-2 rounded"
              value={unidades.agua}
              onChange={(e) => setUnidades({ ...unidades, agua: e.target.value })}
            >
              <option value="L">R$/litro</option>
              <option value="m3">R$/m³</option>
            </select>
          </div>
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

      <h2 className="text-lg font-bold col-span-2 mt-6">Salários (mensais)</h2>
      <div className="grid grid-cols-3 gap-4 col-span-2">
        {["operador", "ajudante", "mecanico"].map((func) => (
          <div key={func}>
            <label className="block font-semibold capitalize">{func}:</label>
            <input
              className="border p-2 w-full rounded"
              type="number"
              step="0.01"
              name={func}
              value={salarios[func]}
              onChange={(e) =>
                setSalarios({ ...salarios, [func]: e.target.value })
              }
            />
          </div>
        ))}
      </div>


      {/* Botão Calcular */}
      {!showForm && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-6 w-full"
          onClick={handleCalculate}
        >
          Calcular
        </button>
      )}

      {showForm && (
        <FormularioUsuario
          dadosAnalise={dadosParaEnvio}
          onSubmit={(data) => {
            setResult({
              equipamentoNome: data.equipamento,
              equipamentoImagem: data.equipamentoImagem || null,
              traco: data.traco,
              totalProducaoPropria: parseFloat(data.resultadoFinal),
              custoUsinado: parseFloat(data.concretoUsinado),
              custoDepreciacao: parseFloat(data.custoDepreciacao),
              custoMaoDeObra: parseFloat(data.custoMaoDeObra),
              capacidadeProducaoHora: data.capacidadeProducaoHora,
              producaoMensal: data.producaoMensal,
              depreciacoes: data.depreciacoes,
              custosTotais: data.custosTotais,
              custosUnitarios: data.custosUnitarios,
              maoDeObraMensal: data.maoDeObraMensal,
              ganhos: data.ganhos,
              recuperacaoInvestimento: data.recuperacaoInvestimento,
            });
            setShowForm(false);
          }}
        />
      )}
      {/* Exibir resultado */}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold text-lg">Resultado da Análise:</h2>
          <div className="flex items-center mt-2">
            {result.equipamentoImagem ? (
              <img
                src={result.equipamentoImagem}
                alt={result.equipamentoNome}
                className="h-24 w-auto object-contain mr-4"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "/img/sem-imagem.jpg"; }}
              />
            ) : (
              <img
                src="/img/sem-imagem.jpg"
                alt="Sem imagem"
                className="h-24 w-auto object-contain mr-4"
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
          <p>
            <strong>Depreciação diária:</strong> R$ {result.custoDepreciacao.toFixed(2)}
          </p>
          <p>
            <strong>Mão de Obra Diária:</strong> R$ {result.custoMaoDeObra.toFixed(2)}
          </p>
          <p className="mt-2">
            {result.totalProducaoPropria < result.custoUsinado
              ? "A produção própria é mais barata."
              : "O concreto usinado é mais barato ou igual."}
          </p>

          <div className="mt-6 bg-white p-4 rounded shadow text-center">
            <h3 className="font-bold text-md mb-4 text-left">📊 Produção Estimada (m³/mês) detalhada:</h3>

            {/* Cabeçalho */}
            <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-600 mb-2">
              <div></div>
              <div className="text-green-700">Máxima</div>
              <div className="text-yellow-600">Normal</div>
              <div className="text-red-600">Baixa</div>
            </div>

            {/* Linhas padronizadas */}
            {
              [
                {
                  label: "Produção (m³/mês):",
                  max: result.producaoMensal.max,
                  normal: result.producaoMensal.normal,
                  baixa: result.producaoMensal.baixa,
                  prefix: "",
                },
                {
                  label: "Depreciação (R$):",
                  max: result.depreciacoes.max,
                  normal: result.depreciacoes.normal,
                  baixa: result.depreciacoes.baixa,
                  prefix: "R$ ",
                },
                {
                  label: "Mão de Obra (R$):",
                  max: result.maoDeObraMensal.max,
                  normal: result.maoDeObraMensal.normal,
                  baixa: result.maoDeObraMensal.baixa,
                  prefix: "R$ ",
                },
                {
                  label: "Agregados (R$):",
                  max: result.custosTotais.max - result.depreciacoes.max - result.maoDeObraMensal.max,
                  normal: result.custosTotais.normal - result.depreciacoes.normal - result.maoDeObraMensal.normal,
                  baixa: result.custosTotais.baixa - result.depreciacoes.baixa - result.maoDeObraMensal.baixa,
                  prefix: "R$ ",
                },
                {
                  label: "Custo por m³ (Total):",
                  max: result.custosUnitarios.max,
                  normal: result.custosUnitarios.normal,
                  baixa: result.custosUnitarios.baixa,
                  prefix: "R$ ",
                  style: true,
                },
                {
                  label: "Ganho Líquido por m³:",
                  max: result.ganhos?.max ?? 0,
                  normal: result.ganhos?.normal ?? 0,
                  baixa: result.ganhos?.baixa ?? 0,
                  prefix: "R$ ",
                  style: true,
                },
                {
                  label: "🔁 M³ para recuperar investimento:",
                  max: result.recuperacaoInvestimento?.m3?.max ?? 0,
                  normal: result.recuperacaoInvestimento?.m3?.normal ?? 0,
                  baixa: result.recuperacaoInvestimento?.m3?.baixa ?? 0,
                  prefix: "",
                },
                {
                  label: "📆 Dias necessários:",
                  max: result.recuperacaoInvestimento?.dias?.max ?? 0,
                  normal: result.recuperacaoInvestimento?.dias?.normal ?? 0,
                  baixa: result.recuperacaoInvestimento?.dias?.baixa ?? 0,
                  prefix: "",
                },
                {
                  label: "📅 Meses necessários:",
                  max: result.recuperacaoInvestimento?.meses?.max ?? 0,
                  normal: result.recuperacaoInvestimento?.meses?.normal ?? 0,
                  baixa: result.recuperacaoInvestimento?.meses?.baixa ?? 0,
                  prefix: "",
                }
              ].map(({ label, max, normal, baixa, prefix, style }, idx) => (
                <React.Fragment key={idx}>
                  {/* Inserir título antes da primeira linha de retorno */}
                  {label === "🔁 M³ para recuperar investimento:" && (
                    <div className="col-span-4 text-left text-md font-semibold text-blue-800 border-t pt-4 mt-2">
                      💸 Retorno do Investimento
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-6 py-2 border-t items-center text-sm">
                    <div className="text-left font-medium">
                      <span className="inline-block w-full whitespace-nowrap">{label}</span>
                    </div>
                    <div className={style ? "font-bold text-green-700" : ""}>
                      {prefix}{(max ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

                    </div>
                    <div className={style ? "font-bold text-yellow-600" : ""}>
                      {prefix}{(normal ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

                    </div>
                    <div className={style ? "font-bold text-red-600" : ""}>
                      {prefix}{(baixa ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

                    </div>
                  </div>
                </React.Fragment>
              ))
            }


          </div>

        </div>
      )}
    </div>
  );
}

export default Analise;
