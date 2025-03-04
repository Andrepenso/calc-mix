import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Fundo com imagem */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/construction-silhouette.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Conteúdo Central */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h2 className="text-lg tracking-widest uppercase text-gray-300">
          Análise Comparativa de Custos
        </h2>
        <h1 className="text-5xl sm:text-7xl font-extrabold uppercase mt-2 drop-shadow-md">
          Eficiência & Economia na sua Obra!
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-gray-300">
          Compare equipamentos e produza seu concreto!
        </p>
        <Link
          to="/home"
          className="mt-6 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition font-bold text-lg"
        >
          Comece Agora 🚀
        </Link>
      </div>
    </div>
  );
}

export default Home;
