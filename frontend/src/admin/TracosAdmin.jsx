import { useEffect, useState } from "react";
import axios from "axios";

function TracosAdmin() {
  const [tracos, setTracos] = useState([]);
  const [editingId, setEditingId] = useState(null);
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
      const response = await axios.get('${import.meta.env.VITE_API_URL}/api/tracos');
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
    if (!window.confirm(editingId ? "Salvar alterações?" : "Adicionar novo traço?")) return;

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tracos/${editingId}`,
          tracoData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post('${import.meta.env.VITE_API_URL}/api/tracos', tracoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

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
      fetchTracos();
    } catch (error) {
      console.error("Erro ao salvar traço", error);
    }
  };

  const handleEdit = (traco) => {
    setEditingId(traco._id);
    setTracoData({ ...traco });
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

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">🔩 Gerenciar Traços</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
        <input className="border p-2" type="text" name="nome" placeholder="Nome" value={tracoData.nome} onChange={handleChange} required />
        <input className="border p-2" type="text" name="descricao" placeholder="Descrição" value={tracoData.descricao} onChange={handleChange} required />
        <input className="border p-2" type="number" name="quantidade_cimento" placeholder="Cimento (kg)" value={tracoData.quantidade_cimento} onChange={handleChange} required />
        <input className="border p-2" type="number" name="quantidade_areia" placeholder="Areia (kg)" value={tracoData.quantidade_areia} onChange={handleChange} required />
        <input className="border p-2" type="number" name="quantidade_brita" placeholder="Brita (kg)" value={tracoData.quantidade_brita} onChange={handleChange} required />
        <input className="border p-2" type="number" name="quantidade_agua" placeholder="Água (L)" value={tracoData.quantidade_agua} onChange={handleChange} required />
        <input className="border p-2" type="number" name="quantidade_aditivo" placeholder="Aditivo (L)" value={tracoData.quantidade_aditivo} onChange={handleChange} required />
        <button className="bg-green-500 text-white px-4 py-2 rounded col-span-2">
          {editingId ? "Salvar Alteração" : "Adicionar"}
        </button>
      </form>

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
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleEdit(traco)}>✏️ Editar</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(traco._id)}>🗑️ Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TracosAdmin;
