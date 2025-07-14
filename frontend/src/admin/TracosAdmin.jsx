import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function TracosAdmin() {
  const [tracos, setTracos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tracoData, setTracoData] = useState({
    nome: "",
    descricao: "",
    quantidade_cimento: "",
    quantidade_areia: "",
    quantidade_brita: "",
    quantidade_agua: "",
    quantidade_aditivo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTracos();
  }, []);

  const fetchTracos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracos`);
      setTracos(response.data);
    } catch (error) {
      console.error("Erro ao buscar traços", error);
    }
  };

  const handleChange = (e) => {
    setTracoData({ ...tracoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se já existe um traço com o mesmo nome (ignora case)
    const nomeTraço = tracoData.nome.trim().toLowerCase();
    const traçoDuplicado = tracos.some(
      (traco) =>
        traco.nome.trim().toLowerCase() === nomeTraço &&
        (editingId ? traco._id !== editingId : true)
    );
    if (traçoDuplicado) {
      alert("Já existe um traço com esse nome. Por favor, escolha outro nome.");
      return;
    }

    // Confirmação antes de salvar (opcional)
    if (!window.confirm(editingId ? "Salvar alterações do traço?" : "Adicionar novo traço?")) {
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tracos/${editingId}`,
          tracoData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/tracos`, tracoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Resetar o formulário
      setTracoData({
        nome: "",
        descricao: "",
        quantidade_cimento: "",
        quantidade_areia: "",
        quantidade_brita: "",
        quantidade_agua: "",
        quantidade_aditivo: "",
      });
      setEditingId(null);
      setShowModal(false);
      fetchTracos();
    } catch (error) {
      console.error("Erro ao salvar traço", error);
    }
  };

  const handleEdit = (traco) => {
    setEditingId(traco._id);
    setTracoData({ ...traco });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este traço?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tracos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTracos();
    } catch (error) {
      console.error("Erro ao deletar traço", error);
    }
  };

  // Abre o modal para adicionar um novo traço
  const handleAddNew = () => {
    setEditingId(null);
    setTracoData({
      nome: "",
      descricao: "",
      quantidade_cimento: "",
      quantidade_areia: "",
      quantidade_brita: "",
      quantidade_agua: "",
      quantidade_aditivo: "",
    });
    setShowModal(true);
  };

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">🔩 Gerenciar Traços</h1>
      
      {/* Botão para abrir o modal de criação */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddNew}
      >
        ➕ Adicionar Novo Traço
      </button>

      {/* Modal para adicionar/editar traço */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 overflow-y-auto max-h-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Editar Traço" : "Adicionar Traço"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="col-span-1 md:col-span-2">
                Nome do Traço:
                <input
                  className="border p-2 w-full mt-1"
                  type="text"
                  name="nome"
                  value={tracoData.nome}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="col-span-1 md:col-span-2">
                Descrição:
                <input
                  className="border p-2 w-full mt-1"
                  type="text"
                  name="descricao"
                  value={tracoData.descricao}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Cimento (kg):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="quantidade_cimento"
                  value={tracoData.quantidade_cimento}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Areia (kg):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="quantidade_areia"
                  value={tracoData.quantidade_areia}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Brita (kg):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="quantidade_brita"
                  value={tracoData.quantidade_brita}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Água (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="quantidade_agua"
                  value={tracoData.quantidade_agua}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="col-span-1 md:col-span-2">
                Aditivo (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="quantidade_aditivo"
                  value={tracoData.quantidade_aditivo}
                  onChange={handleChange}
                  required
                />
              </label>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
                type="submit"
              >
                {editingId ? "Salvar Alteração" : "Adicionar Traço"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

            {/* Lista de Traços */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracos.map((traco) => (
          <div key={traco._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{traco.nome}</h2>
            <p className="text-gray-600">{traco.descricao}</p>
            <ul className="text-sm text-gray-700">
              <li><strong>Cimento:</strong> {traco.quantidade_cimento} kg</li>
              <li><strong>Areia:</strong> {traco.quantidade_areia} kg</li>
              <li><strong>Brita:</strong> {traco.quantidade_brita} kg</li>
              <li><strong>Água:</strong> {traco.quantidade_agua} L</li>
              <li><strong>Aditivo:</strong> {traco.quantidade_aditivo} L</li>
            </ul>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleEdit(traco)}
              >
                ✏️ Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(traco._id)}
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Voltar */}
      <div className="mt-8">
        <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
          ← Voltar para Dashboard
        </Link>
      </div>
    </div>
  );
}

export default TracosAdmin;
