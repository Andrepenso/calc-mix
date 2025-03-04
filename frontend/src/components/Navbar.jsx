import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md shadow-md z-50 flex flex-col md:flex-row">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Comparação de Custos</h1>
        {/* Botão de menu para mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Itens de navegação para desktop */}
        <div className="hidden md:flex space-x-6 text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition">🏠 Home</Link>
          <Link to="/saiba-mais" className="hover:text-blue-500 transition">📄 Saiba Mais</Link>
          <Link to="/equipamentos" className="hover:text-blue-500 transition">🏗️ Equipamentos</Link>
          <Link to="/analise" className="hover:text-blue-500 transition">📊 Análise</Link>
        </div>
        {/* Botão de login para desktop */}
        <Link 
          to="/login" 
          className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          🔐 Admin
        </Link>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 w-full">
          <div className="flex flex-col space-y-4 text-gray-700">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-500 transition">
              🏠 Home
            </Link>
            <Link to="/saiba-mais" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-500 transition">
              📄 Saiba Mais
            </Link>
            <Link to="/equipamentos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-500 transition">
              🏗️ Equipamentos
            </Link>
            <Link to="/analise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-500 transition">
              📊 Análise
            </Link>
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              🔐 Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
