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
    valor: "",
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

  const handleEdit = (equipamento) => {
    setEditingId(equipamento._id);
    setEquipamentoData({
      nome: equipamento.nome,
      volume_balao: equipamento.volume_balao || "",
      capacidade_producao_hora: equipamento.capacidade_producao_hora || "",
      capacidade_tanque_diesel: equipamento.capacidade_tanque_diesel || "",
      capacidade_oleo_motor: equipamento.capacidade_oleo_motor || "",
      capacidade_oleo_hidraulico: equipamento.capacidade_oleo_hidraulico || "",
      capacidade_oleo_redutor: equipamento.capacidade_oleo_redutor || "",
      fluido_freios: equipamento.fluido_freios || "",
      graxa: equipamento.graxa || "",
      valor: equipamento.valor || "",
      descricao: equipamento.descricao || "",
      imagem: null, // Não carregar a imagem existente
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este Equipamento?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/equipamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (editingId === id) {
        setEditingId(null);
        setEquipamentoData({
          nome: "",
          volume_balao: "",
          capacidade_producao_hora: "",
          capacidade_tanque_diesel: "",
          capacidade_oleo_hidraulico: "",
          capacidade_oleo_redutor: "",
          fluido_freios: "",
          graxa: "",
          valor: "",
          descricao: "",
          imagem: null,
        });
        setShowModal(false);
      }
      fetchEquipamentos();
    } catch (error) {
      console.error("Erro ao deletar equipamento", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se já existe um equipamento com o mesmo nome (ignora case)
    const nomeEquipamento = equipamentoData.nome.trim().toLowerCase();
    const equipamentoDuplicado = equipamentos.some(
      (equip) =>
        equip.nome.trim().toLowerCase() === nomeEquipamento &&
        (editingId ? equip._id !== editingId : true)
    );

    if (equipamentoDuplicado) {
      alert("Já existe um equipamento com esse nome. Por favor, escolha outro nome.");
      return;
    }

    // Confirmação antes de salvar
    if (!window.confirm("Deseja salvar esse equipamento?")) {
      return;
    }

    try {
      const formData = new FormData();

      // Adiciona somente campos preenchidos
      Object.keys(equipamentoData).forEach((key) => {
        if (equipamentoData[key]) {
          formData.append(key, equipamentoData[key]);
        }
      });

      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/equipamentos/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/equipamentos`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Limpar formulário
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
        valor: "",
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

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">⚙️ Gerenciar Equipamentos</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowModal(true)}>
        ➕ Adicionar Equipamento
      </button>

      {/* Modal responsivo */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 overflow-y-auto max-h-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Editar Equipamento" : "Adicionar Equipamento"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <label className="col-span-1 md:col-span-2">
                Nome do Equipamento:
                <input
                  className="border p-2 w-full mt-1"
                  type="text"
                  name="nome"
                  value={equipamentoData.nome}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Valor do Equipamento (R$):
                <input
                  className="border p-2 w-full mt-1"
                  type="text"
                  name="valor"
                  value={equipamentoData.valor}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const raw = e.target.value
                      .replace(/[R$\s.]/g, '')  // remove R$, espaços e pontos
                      .replace(',', '.');       // troca vírgula por ponto
                    const number = parseFloat(raw);

                    if (!isNaN(number)) {
                      // armazena o número REAL no estado (sem formatação)
                      setEquipamentoData({ ...equipamentoData, valor: number });
                    }
                  }}

                  required
                />
              </label>

              <label>
                Volume do Balão (m³):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  step="0.01"
                  name="volume_balao"
                  value={equipamentoData.volume_balao}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Capacidade de Produção (m³/h):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="capacidade_producao_hora"
                  value={equipamentoData.capacidade_producao_hora}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Tanque de Diesel (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="capacidade_tanque_diesel"
                  value={equipamentoData.capacidade_tanque_diesel}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Capacidade Óleo Motor (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="capacidade_oleo_motor"
                  value={equipamentoData.capacidade_oleo_motor}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Capacidade Óleo Hidráulico (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="capacidade_oleo_hidraulico"
                  value={equipamentoData.capacidade_oleo_hidraulico}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Capacidade Óleo Redutor (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="capacidade_oleo_redutor"
                  value={equipamentoData.capacidade_oleo_redutor}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Capacidade Fluídos de Freios (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="fluido_freios"
                  value={equipamentoData.fluido_freios}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Capacidade Graxa (L):
                <input
                  className="border p-2 w-full mt-1"
                  type="number"
                  name="graxa"
                  value={equipamentoData.graxa}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="col-span-1 md:col-span-2">
                Descrição:
                <textarea
                  className="border p-2 w-full mt-1"
                  name="descricao"
                  value={equipamentoData.descricao}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="col-span-1 md:col-span-2">
                Imagem do Equipamento:
                <input
                  className="border p-2 w-full mt-1"
                  type="file"
                  name="imagem"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>

              <button className="bg-green-500 text-white px-4 py-2 col-span-1 md:col-span-2 rounded" type="submit">
                Salvar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 col-span-1 md:col-span-2 rounded"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipamentos.map((equipamento) => (
          <div key={equipamento._id} className="border rounded-lg shadow-md p-4 bg-white">
            {equipamento.imagem_url ? (
              <img
                src={equipamento.imagem_url}
                alt={`Imagem do equipamento ${equipamento.nome}`}
                className="w-full h-32 object-cover rounded mb-2"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/img/sem-imagem.jpg"; // fallback local
                }}
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 italic mb-2">
                Sem imagem
              </div>
            )}


            <h2 className="text-lg font-bold mt-2">{equipamento.nome}</h2>
            <p className="text-gray-700">{equipamento.descricao}</p>
            <p><strong>💰 Valor:</strong> {parseFloat(equipamento.valor).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</p>
            <p><strong>Volume do Balão:</strong> {equipamento.volume_balao} m³</p>
            <p><strong>Capacidade Produção:</strong> {equipamento.capacidade_producao_hora} m³/h</p>
            <p><strong>Capacidade Tanque de Diesel:</strong> {equipamento.capacidade_tanque_diesel} L</p>
            <p><strong>Capacidade Óleo Motor:</strong> {equipamento.capacidade_oleo_motor} L</p>
            <p><strong>Capacidade Óleo Hidráulico:</strong> {equipamento.capacidade_oleo_hidraulico} L</p>
            <p><strong>Capacidade Óleo Redutor:</strong> {equipamento.capacidade_oleo_redutor} L</p>
            <p><strong>Capacidade Fluídos de Freios:</strong> {equipamento.fluido_freios} L</p>
            <p><strong>Capacidade Graxa:</strong> {equipamento.graxa} KG</p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(equipamento)}
              >
                ✏️ Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(equipamento._id)}
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipamentosAdmin;
