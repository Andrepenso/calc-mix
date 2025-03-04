function SaibaMais() {
  // Exemplo de dados de blog, cada item pode ter título, descrição, imagem, link etc.
  const artigos = [
    {
      id: 1,
      titulo: "Como escolher o melhor equipamento de concreto",
      descricao:
        "Dicas sobre como analisar fatores como produtividade, custo de manutenção e consumo de combustível para escolher o equipamento mais adequado.",
      imagem: "https://via.placeholder.com/400x200?text=Imagem+Artigo+1",
      link: "#",
    },
    {
      id: 2,
      titulo: "A importância de um traço de concreto bem planejado",
      descricao:
        "Entenda como a proporção correta de cimento, areia, brita, água e aditivos pode impactar na qualidade e no custo do concreto.",
      imagem: "https://via.placeholder.com/400x200?text=Imagem+Artigo+2",
      link: "#",
    },
    {
      id: 3,
      titulo: "Reduzindo custos sem perder qualidade",
      descricao:
        "Descubra estratégias para reduzir custos em obras sem comprometer a segurança e a durabilidade das estruturas.",
      imagem: "https://via.placeholder.com/400x200?text=Imagem+Artigo+3",
      link: "#",
    },
  ];

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto">
      {/* Seção de apresentação */}
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

      {/* Seção de “artigos” ou tópicos de blog */}
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
              <a
                href={artigo.link}
                className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Ler mais
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaibaMais;
