import React from "react";
import { Link } from "react-router-dom";

const EquipamentosCompactos = () => {
  return (
    <div className="p-6 pt-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">
        🏗️ O que são Equipamentos Compactos?
      </h1>

      <p className="text-lg mb-4">
        Equipamentos compactos são máquinas de pequeno a médio porte, amplamente utilizadas em obras com espaço limitado, como áreas urbanas e reformas internas. Eles combinam eficiência, mobilidade e baixo custo operacional.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">🔍 Principais Vantagens:</h2>
      <ul className="list-disc list-inside text-base ml-4">
        <li>Facilidade de transporte e manobra</li>
        <li>Baixo consumo de diesel</li>
        <li>Custos menores de manutenção</li>
        <li>Alta produtividade em pequenos espaços</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">📦 Exemplos Comuns:</h2>
      <ul className="list-disc list-inside text-base ml-4">
        <li>Mini escavadeiras</li>
        <li>Mini carregadeiras</li>
        <li>Betoneiras portáteis</li>
        <li>Compactadores vibratórios</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">⚖️ Compactos vs Tradicionais:</h2>
      <p className="text-base mb-4">
        Em comparação com equipamentos tradicionais, os compactos oferecem melhor desempenho em áreas restritas, menor impacto ambiental e excelente custo-benefício em projetos de menor escala.
      </p>

      <div className="mt-8">
        <Link to="/saiba-mais" className="text-blue-600 hover:underline">
          ← Voltar para Saiba Mais
        </Link>
      </div>
    </div>
  );
};

export default EquipamentosCompactos;
