import React from "react";
import { Link } from "react-router-dom";

const ConsumoDiesel = () => {
  return (
    <div className="p-6 pt-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">
        ⛽ Como o Consumo de Diesel Impacta o Custo do Concreto
      </h1>

      <img
        src="/consumo-diesel.png"
        alt="Consumo de Diesel"
        className="w-full h-auto rounded-md mb-6 shadow"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />

      <p className="text-lg mb-4">
        O consumo de diesel é um dos principais componentes do custo operacional em obras que utilizam autoconcreteiras, betoneiras ou caminhões basculantes. Uma má gestão desse consumo pode impactar diretamente o custo final do concreto por m³.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">📊 Fatores que influenciam o consumo:</h2>
      <ul className="list-disc list-inside text-base ml-4">
        <li><strong>Rendimento por litro:</strong> indica quantos m³ de concreto são produzidos por litro de diesel.</li>
        <li><strong>Eficiência energética do equipamento:</strong> modelos mais novos consomem menos combustível.</li>
        <li><strong>Autonomia do tanque:</strong> afeta o tempo de operação contínua e frequência de abastecimento.</li>
        <li><strong>Tipo de operação:</strong> uso contínuo x intermitente muda o padrão de consumo.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">🧮 Como calcular:</h2>
      <p className="text-base mb-4">
        Uma fórmula simples para estimar o impacto do diesel no custo do concreto:
      </p>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        Consumo Total (R$) = Litros Utilizados × Preço do Litro
        <br />
        Custo por m³ = Consumo Total (R$) ÷ Produção (m³)
      </pre>

      <p className="mt-4">
        Exemplo: se uma máquina consome 15L para produzir 10m³ e o diesel custa R$ 5,20:
      </p>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        Consumo Total = 15 × 5.20 = R$ 78,00
        <br />
        Custo por m³ = 78 ÷ 10 = R$ 7,80 por m³
      </pre>

      <h2 className="text-2xl font-semibold mt-8 mb-2">✅ Dicas para reduzir o consumo:</h2>
      <ul className="list-disc list-inside text-base ml-4">
        <li>Faça manutenção preventiva no motor e filtros</li>
        <li>Utilize o equipamento em sua capacidade ideal</li>
        <li>Evite ociosidade (motor ligado sem produção)</li>
        <li>Planeje rotas e logística para minimizar deslocamentos</li>
      </ul>

      <div className="mt-8">
        <Link to="/saiba-mais" className="text-blue-600 hover:underline">
          ← Voltar para Saiba Mais
        </Link>
      </div>
    </div>
  );
};

export default ConsumoDiesel;
