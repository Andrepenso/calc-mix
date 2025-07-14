import React from "react";
import { Link } from "react-router-dom";

function BlogPayback() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 text-gray-800">
      <img
        src="/payback.jpg"
        alt="Cálculo de retorno de investimento"
        className="rounded mb-6 mx-auto max-w-md w-full"
      />

      <h1 className="text-2xl font-bold mb-4">
        Como calcular o payback de um equipamento de concreto
      </h1>

      <p className="mb-4">
        O payback é um indicador que mostra em quanto tempo um investimento se paga. No setor de construção, ele é fundamental para avaliar a viabilidade de adquirir um equipamento como uma autoconcreteira.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. O que considerar no cálculo</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Valor de aquisição:</strong> preço da autoconcreteira com impostos e transporte.</li>
        <li><strong>Produção mensal estimada:</strong> volume de concreto (m³) que o equipamento pode produzir.</li>
        <li><strong>Custo operacional:</strong> salários, combustível, manutenção, agregados e graxas.</li>
        <li><strong>Economia por m³:</strong> diferença entre custo de produzir e comprar concreto usinado.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Fórmula simplificada</h2>
      <p>
        <strong>Payback (em meses) =</strong> Valor do Equipamento / Ganho Líquido Mensal
      </p>
      <p>
        O ganho líquido mensal é obtido pela economia por m³ multiplicada pela produção mensal.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Exemplo prático</h2>
      <p>
        Suponha que uma autoconcreteira custa R$ 900.000, produza 2.000 m³ por mês e gere economia de R$ 400 por m³. O ganho mensal será R$ 800.000. Assim, o payback será:
      </p>
      <p>
        <strong>900.000 / 800.000 = 1,125 meses</strong> → pouco mais de 1 mês de retorno.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Conclusão</h2>
      <p>
        O payback ajuda a tomar decisões com base em dados reais. Quanto maior a produção e a economia por metro cúbico, mais rápido é o retorno. Ferramentas de análise como esta plataforma facilitam esse cálculo com precisão.
      </p>

      <div className="mt-8">
        <Link to="/saiba-mais" className="text-blue-600 hover:underline">
          ← Voltar para Saiba Mais
        </Link>
      </div>
    </div>
  );
}

export default BlogPayback;
