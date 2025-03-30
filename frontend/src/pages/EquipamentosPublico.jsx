import { useEffect, useState } from "react";
import axios from "axios";

function EquipamentosPublico() {
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/equipamentos`)
      .then(response => setEquipamentos(response.data))
      .catch(error => console.error("Erro ao buscar equipamentos", error));
  }, []);

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">🏗️ Equipamentos Disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipamentos.map((equipamento) => (
          <div
            key={equipamento._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            {equipamento.imagem ? (
              <img
                src={equipamento.imagem_url}
                alt={equipamento.nome}
                className="w-full h-32 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 italic mb-4">
                Sem imagem
              </div>
            )}

            <h2 className="text-xl font-bold">{equipamento.nome}</h2>
            <p className="text-gray-600">{equipamento.descricao}</p>

            <ul className="mt-2 text-sm text-gray-700">
              <p><strong>💰 Valor:</strong> {parseFloat(equipamento.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}</p>
              <li><strong>Volume do Balão:</strong> {equipamento.volume_balao} L</li>
              <li><strong>Capacidade Produção:</strong> {equipamento.capacidade_producao_hora} m³/h</li>
              <li><strong>Capacidade Tanque de Diesel:</strong> {equipamento.capacidade_tanque_diesel} L</li>
              <li><strong>Capacidade Óleo Motor:</strong> {equipamento.capacidade_oleo_motor} L</li>
              <li><strong>Capacidade Óleo Hidráulico:</strong> {equipamento.capacidade_oleo_hidraulico} L</li>
              <li><strong>Capacidade Óleo Redutor:</strong> {equipamento.capacidade_oleo_redutor} L</li>
              <li><strong>Capacidade Fluídos de Freios:</strong> {equipamento.fluido_freios} L</li>
              <li><strong>Capacidade Graxa:</strong> {equipamento.graxa} L</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipamentosPublico;