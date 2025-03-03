import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Painel Administrativo</h1>
      <div className="flex space-x-6">
        <Link to="/admin/dashboard" className="hover:text-gray-300">🏠 Dashboard</Link>
        <Link to="/admin/equipamentos" className="hover:text-gray-300">🏗️ Equipamentos</Link>
        <Link to="/admin/tracos" className="hover:text-gray-300">🧱 Traços</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Sair</button>
    </nav>
  );
}

export default AdminNavbar;
