import { useEffect, useState } from "react";
import axios from "axios";

function EquipamentosAdmin() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [equipamentoData, setEquipamentoData] = useState({
    nome: "",
    volume_balao: "",
    capacidade_producao_hora: "",
    capacidade_tanque_diesel: "",
    capacidade_oleo_motor: "",
    capacidade_oleo_hidraulico: "",
    capacidade_oleo_redutor: "",
    fluido_freios: "",
    graxa: "",
    descricao: "",
    imagem: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/equipamentos`);
      setEquipamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipamentoData({ ...equipamentoData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEquipamentoData({ ...equipamentoData, imagem: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(equipamentoData).forEach((key) => {
        formData.append(key, equipamentoData[key]);
      });

      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/equipamentos/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/equipamentos`
, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setEquipamentoData({
        nome: "",
        volume_balao: "",
        capacidade_producao_hora: "",
        capacidade_tanque_diesel: "",
        capacidade_oleo_motor: "",
        capacidade_oleo_hidraulico: "",
        capacidade_oleo_redutor: "",
        fluido_freios: "",
        graxa: "",
        descricao: "",
        imagem: null,
      });

      setEditingId(null);
      setShowModal(false);
      fetchEquipamentos();
    } catch (error) {
      console.error("Erro ao salvar equipamento", error);
    }
  };

  const handleEdit = (equipamento) => {
    setEditingId(equipamento._id);
    setEquipamentoData({ ...equipamento, imagem: null });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/equipamentos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchEquipamentos();
      } catch (error) {
        console.error("Erro ao deletar equipamento", error);
      }
    }
  };

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">⚙️ Gerenciar Equipamentos</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowModal(true)}>
        + Adicionar Equipamento
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Editar Equipamento" : "Adicionar Equipamento"}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input className="border p-2" type="text" name="nome" placeholder="Nome" value={equipamentoData.nome} onChange={handleChange} required />
              <input className="border p-2" type="number" name="volume_balao" placeholder="Volume do Balão (L)" value={equipamentoData.volume_balao} onChange={handleChange} required />
              <input className="border p-2" type="number" name="capacidade_producao_hora" placeholder="Capacidade Produção (m³/h)" value={equipamentoData.capacidade_producao_hora} onChange={handleChange} required />
              <input className="border p-2" type="number" name="capacidade_tanque_diesel" placeholder="Tanque Diesel (L)" value={equipamentoData.capacidade_tanque_diesel} onChange={handleChange} required />
              <input className="border p-2" type="number" name="capacidade_oleo_motor" placeholder="Óleo Motor (L)" value={equipamentoData.capacidade_oleo_motor} onChange={handleChange} required />
              <input className="border p-2" type="number" name="capacidade_oleo_hidraulico" placeholder="Óleo Hidráulico (L)" value={equipamentoData.capacidade_oleo_hidraulico} onChange={handleChange} required />
              <input className="border p-2" type="number" name="capacidade_oleo_redutor" placeholder="Óleo Redutor (L)" value={equipamentoData.capacidade_oleo_redutor} onChange={handleChange} required />
              <input className="border p-2" type="number" name="fluido_freios" placeholder="Fluido de Freios (L)" value={equipamentoData.fluido_freios} onChange={handleChange} required />
              <input className="border p-2" type="number" name="graxa" placeholder="Graxa (g)" value={equipamentoData.graxa} onChange={handleChange} required />
              <input className="border p-2 col-span-2" type="text" name="descricao" placeholder="Descrição" value={equipamentoData.descricao} onChange={handleChange} required />
              <input className="border p-2 col-span-2" type="file" name="imagem" onChange={handleFileChange} accept="image/*" />
              <button className="bg-green-500 text-white px-4 py-2 col-span-2 rounded">Salvar</button>
              <button className="bg-red-500 text-white px-4 py-2 col-span-2 rounded" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipamentosAdmin;