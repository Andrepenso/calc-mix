import { useEffect, useState } from "react";
import axios from "axios";

function EquipamentosPublico() {
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/equipamentos`)
      .then(response => setEquipamentos(response.data))
      .catch(error => console.error("Erro ao buscar equipamentos", error));
  }, []);

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">🏗️ Equipamentos Disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipamentos.map((equipamento) => (
          <div key={equipamento._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{equipamento.nome}</h2>
            <p className="text-gray-600">{equipamento.descricao}</p>
            <ul className="mt-2 text-sm text-gray-700">
            <p><strong>💰 Valor:</strong> R$ {equipamento.valor}</p>
            <p><strong>Volume do Balão:</strong> {equipamento.volume_balao} L</p>
            <p><strong>Capacidade Produção:</strong> {equipamento.capacidade_producao_hora} m³/h</p>
            <p><strong>Capacidade Tanque de Diesel:</strong> {equipamento.capacidade_tanque_diesel} L/h</p>
            <p><strong>Capacidade Óleo Motor:</strong> {equipamento.capacidade_oleo_motor} L/h</p>
            <p><strong>Capacidade Óleo Hidráulico:</strong> {equipamento.capacidade_oleo_hidraulico} L/h</p>
            <p><strong>Capacidade Óleo Redutor:</strong> {equipamento.capacidade_oleo_redutor} L/h</p>
            <p><strong>Capacidade Fluídos de Freios:</strong> {equipamento.fluido_freios} L/h</p>
            <p><strong>Capacidade Graxa:</strong> {equipamento.graxa} L/h</p> 
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipamentosPublico;
