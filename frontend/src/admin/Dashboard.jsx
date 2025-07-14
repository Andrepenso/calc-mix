import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/login"); // Redireciona para o login
  };

  return (
    <div className="p-11">
      <h1 className="text-3xl font-bold mb-6">📊 Painel do Administrador</h1>
      <p className="text-gray-700 mb-6">Gerencie equipamentos, traços de concreto e análises.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Gerenciar Equipamentos */}
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition"
          onClick={() => navigate("/admin/equipamentos")}
        >
          <h2 className="text-xl font-bold mb-2">⚙️ Equipamentos</h2>
          <p className="text-gray-600">Adicione, edite e remova equipamentos.</p>
        </div>

        {/* Gerenciar Traços */}
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition"
          onClick={() => navigate("/admin/tracos")}
        >
          <h2 className="text-xl font-bold mb-2">🧱 Traços de Concreto</h2>
          <p className="text-gray-600">Gerencie os traços de concreto disponíveis.</p>
        </div>
      </div>

      {/* Ver Análises Realizadas */}
      <div
        className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition"
        onClick={() => navigate("/admin/analises")}
      >
        <h2 className="text-xl font-bold mb-2">📊 Análises Realizadas</h2>
        <p className="text-gray-600">Veja todas as análises feitas com os dados dos usuários.</p>
      </div>


      {/* Botão de Sair */}
      <button
        className="bg-red-500 text-white px-6 py-3 mt-6 rounded flex items-center gap-2"
        onClick={handleLogout}
      >
        🚪 Sair
      </button>
    </div>
  );
}

export default Dashboard;
