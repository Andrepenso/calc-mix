import React from "react";
import { Link } from "react-router-dom";

function BlogFck() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <img
        src="/fck.jpg"
        alt="Misturadora de concreto"
        className="rounded mb-6 w-full"
      />
      <h1 className="text-2xl font-bold mb-4">
        Traço FCK 25 vs FCK 30: qual a diferença prática?
      </h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">O que é FCK?</h2>
      <p>
        FCK significa "Fck - Fator Característico de Compressão" e representa
        a resistência à compressão do concreto após 28 dias de cura, medida em
        MPa (megapascais). Por exemplo, FCK 25 indica que o concreto suporta
        25 MPa sem romper, sendo adequado para estruturas comuns. Quanto maior
        o FCK, maior a resistência do concreto.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Diferenças práticas</h2>
      <table className="table-auto border border-gray-300 w-full text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Característica</th>
            <th className="border px-2 py-1">FCK 25</th>
            <th className="border px-2 py-1">FCK 30</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Resistência</td>
            <td className="border px-2 py-1">Média</td>
            <td className="border px-2 py-1">Alta</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Consumo de cimento</td>
            <td className="border px-2 py-1">~320 kg/m³</td>
            <td className="border px-2 py-1">~380 kg/m³</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Custo do traço</td>
            <td className="border px-2 py-1">Mais acessível</td>
            <td className="border px-2 py-1">Levemente mais caro</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Aplicabilidade</td>
            <td className="border px-2 py-1">Residências e lajes</td>
            <td className="border px-2 py-1">Prédios, obras exigentes</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6 mb-2">Quando escolher FCK 25 ou FCK 30?</h2>
      <p>
        A escolha depende do tipo de estrutura e das condições ambientais. FCK 25 é
        suficiente para casas térreas, calçadas e pisos. Já o FCK 30 é ideal
        para pilares, vigas, lajes com grandes vãos e regiões expostas à umidade ou
        agressividade ambiental, como zonas litorâneas.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Impacto no custo</h2>
      <p>
        O FCK 30 costuma exigir mais cimento e aditivos, elevando o custo por metro
        cúbico. No entanto, pode gerar economia a longo prazo pela maior durabilidade
        e menor necessidade de manutenção.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Conclusão</h2>
      <p>
        FCK 25 e FCK 30 são ambos eficientes, mas têm aplicações diferentes. O ideal é
        sempre seguir as orientações do engenheiro estrutural, considerando segurança,
        desempenho e custo-benefício para sua obra.
      </p>

      <div className="mt-8">
        <Link to="/saiba-mais" className="text-blue-600 hover:underline">
          ← Voltar para Saiba Mais
        </Link>
      </div>
    </div>
  );
}

export default BlogFck;
