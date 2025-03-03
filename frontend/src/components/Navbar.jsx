import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md">
      <h1 className="text-xl font-bold text-gray-800">Comparação de Custos</h1>
      <div className="flex space-x-6 text-gray-700">
        <Link to="/" className="hover:text-blue-500 transition">🏠 Home</Link>
        <Link to="/saiba-mais" className="hover:text-blue-500 transition">📄 Saiba Mais</Link>
        <Link to="/equipamentos" className="hover:text-blue-500 transition">🏗️ Equipamentos</Link>
        <Link to="/analise" className="hover:text-blue-500 transition">📊 Análise</Link>
      </div>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
        🔐 Admin
      </Link>
    </nav>
  );
}

export default Navbar;
