import { Link } from "react-router-dom";

function SaibaMais() {
  const artigos = [
    {
      id: 1,
      titulo: "Equipamentos compactos: quando são a melhor escolha?",
      descricao:
        "Saiba em quais cenários optar por autoconcreteiras menores pode trazer vantagens logísticas, operacionais e financeiras para obras de pequeno porte ou difícil acesso.",
      imagem: "/equipamentos-compactos.png",
      link: "/saiba-mais/equipamentos-compactos",
    },
    {
      id: 2,
      titulo: "Como o consumo de diesel impacta o custo do concreto",
      descricao:
        "Veja como o rendimento por litro, a autonomia do tanque e a eficiência energética influenciam o custo por m³ de concreto produzido.",
      imagem: "/consumo-diesel.jpg",
      link: "/saiba-mais/consumo-diesel",
    },
    {
      id: 3,
      titulo: "Traço FCK 25 vs FCK 30: qual a diferença prática?",
      descricao:
        "Entenda a diferença entre os traços mais utilizados em obras e como isso afeta durabilidade, resistência e custo da concretagem.",
      imagem: "/capafck.jpg",
      link: "/saiba-mais/fck25-vs-fck30",
    },
    {
      id: 4,
      titulo: "Como calcular o payback de um equipamento de concreto",
      descricao:
        "Aprenda a estimar em quanto tempo o investimento em uma autoconcreteira pode se pagar, considerando volume, custo operacional e uso previsto.",
      imagem: "/payback.jpg",
      link: "/saiba-mais/payback-equipamento",
    },
    {
      id: 5,
      titulo: "Checklist de manutenção para garantir performance da autoconcreteira",
      descricao:
        "Evite surpresas na obra. Confira os principais pontos de verificação para manter sua autoconcreteira funcionando com alta eficiência e segurança.",
      imagem: "manutencao.jpg",
      link: "/saiba-mais/checklist-manutencao",
    },
  ];

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700">📄 Sobre a Plataforma</h1>
        <p className="mt-4 text-gray-700">
          A plataforma de <strong>Análise Comparativa de Custos</strong> foi desenvolvida para ajudar empresas e
          profissionais da construção civil a tomar decisões mais informadas sobre equipamentos e insumos para concreto.
        </p>
        <p className="mt-4 text-gray-700">
          Com nossa ferramenta, você pode comparar equipamentos e traços de concreto para encontrar a opção mais
          econômica e eficiente.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {artigos.map((artigo) => (
          <div
            key={artigo.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-start"
          >
            <img
              src={artigo.imagem}
              alt={artigo.titulo}
              className="w-full md:w-1/3 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-800">{artigo.titulo}</h2>
              <p className="text-gray-700 mt-2">{artigo.descricao}</p>
              <Link
                to={artigo.link}
                className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Ler mais
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaibaMais;
