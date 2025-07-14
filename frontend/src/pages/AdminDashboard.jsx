import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [analises, setAnalises] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtros, setFiltros] = useState({
    vantajoso: "",
    equipamento: "",
    dataInicio: "",
    dataFim: "",
  });

  useEffect(() => {
    const fetchAnalises = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/analises`);
        setAnalises(response.data);
      } catch (err) {
        console.error("Erro ao buscar análises:", err);
      }
    };
    fetchAnalises();
  }, []);

  const atualizarAtendimento = async (id, novoStatus) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/analises/${id}/atendido`,
        { atendido: novoStatus }
      );

      const analiseAtualizada = response.data;

      setAnalises((prevAnalises) =>
        prevAnalises.map((a) =>
          a._id === id ? { ...a, atendido: analiseAtualizada.atendido } : a
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status.");
    }
  };

  const analisesFiltradas = analises.filter((a) => {
    const vantajosoFiltro =
      filtros.vantajoso === "" ||
      (filtros.vantajoso === "propria" &&
        parseFloat(a.custosUnitarios?.max ?? a.resultadoFinal) <
          parseFloat(a.concretoUsinado)) ||
      (filtros.vantajoso === "usinado" &&
        parseFloat(a.custosUnitarios?.max ?? a.resultadoFinal) >=
          parseFloat(a.concretoUsinado));

    const equipamentoFiltro =
      filtros.equipamento === "" || a.equipamento === filtros.equipamento;

    const data = new Date(a.criadoEm);
    const inicio = filtros.dataInicio ? new Date(filtros.dataInicio) : null;
    const fim = filtros.dataFim ? new Date(filtros.dataFim) : null;
    const dataFiltro = (!inicio || data >= inicio) && (!fim || data <= fim);

    const statusFiltro = filtroStatus === "Todos" || a.atendido === filtroStatus;

    return vantajosoFiltro && equipamentoFiltro && dataFiltro && statusFiltro;
  });

  const equipamentosUnicos = [...new Set(analises.map((a) => a.equipamento))];

  return (
    <div className="p-6 pt-24 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🧾 Análises Realizadas</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4 flex-wrap">

  {/* Botão Voltar */}
  <div className="md:w-auto">
    <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
      ← Voltar para Dashboard
    </Link>
  </div>

  {/* Filtros */}
  <div className="flex flex-col md:flex-row gap-4 flex-wrap">

    <select
      className="border rounded p-2"
      value={filtros.vantajoso}
      onChange={(e) => setFiltros({ ...filtros, vantajoso: e.target.value })}
    >
      <option value="">Todos</option>
      <option value="propria">Mais vantajoso: Produção própria</option>
      <option value="usinado">Mais vantajoso: Usinado</option>
    </select>

    <select
      className="border rounded p-2"
      value={filtros.equipamento}
      onChange={(e) => setFiltros({ ...filtros, equipamento: e.target.value })}
    >
      <option value="">Todos Equipamentos</option>
      {equipamentosUnicos.map((eq) => (
        <option key={eq} value={eq}>{eq}</option>
      ))}
    </select>

    <input
      type="date"
      className="border rounded p-2"
      value={filtros.dataInicio}
      onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
    />

    <input
      type="date"
      className="border rounded p-2"
      value={filtros.dataFim}
      onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
    />
  </div>

</div>

       

      <div className="flex items-center justify-end mb-4 gap-2">
        <label className="text-sm font-medium">Filtrar por status:</label>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option value="Todos">Todos</option>
          <option value="Não Atendido">❌ Não Atendido</option>
          <option value="Em Atendimento">🔄 Em Atendimento</option>
          <option value="Atendido">✅ Atendido</option>
        </select>
      </div>

      <div className="overflow-auto rounded shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-xs uppercase">
            <tr>
              <th className="p-2">Data</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Equipamento</th>
              <th className="p-2">Traço</th>
              <th className="p-2">Custo Próprio (R$/m³)</th>
              <th className="p-2">Concreto Usinado (R$/m³)</th>
              <th className="p-2">Mais Vantajoso</th>
              <th className="p-2">Atendido</th>
            </tr>
          </thead>
          <tbody>
            {analisesFiltradas.map((a) => (
              <tr key={a._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{new Date(a.criadoEm).toLocaleString()}</td>
                <td className="p-2">{a.nome}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">{a.telefone}</td>
                <td className="p-2">{a.equipamento}</td>
                <td className="p-2">{a.traco}</td>

                <td className="p-2 font-semibold text-green-600">
                  R$ {parseFloat(a.custosUnitarios?.max ?? a.resultadoFinal).toFixed(2)}
                </td>
                <td className="p-2 text-blue-600">
                  R$ {parseFloat(a.concretoUsinado).toFixed(2)}
                </td>

                <td className="p-2 font-semibold">
                  {parseFloat(a.custosUnitarios?.max ?? a.resultadoFinal) < parseFloat(a.concretoUsinado)
                    ? "✅ Produção própria"
                    : "⚠️ Usinado"}
                </td>

                <td className="p-2">
                  <select
                    value={a.atendido || "Não Atendido"}
                    onChange={(e) => atualizarAtendimento(a._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option>Não Atendido</option>
                    <option>Em Atendimento</option>
                    <option>Atendido</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão de Voltar */}
      <div className="mt-6">
        <Link
          to="/admin/dashboard"
          className="text-blue-600 hover:underline text-sm inline-block"
        >
          ← Voltar para Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
