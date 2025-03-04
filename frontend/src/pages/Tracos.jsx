import { useEffect, useState } from "react";
import axios from "axios";

function Tracos() {
  const [tracos, setTracos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/tracos`)
      .then(response => setTracos(response.data))
      .catch(error => console.error("Erro ao buscar traços", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧱 Traços de Concreto</h1>
      <ul>
        {tracos.map(traco => (
          <li key={traco._id} className="border p-2 my-2">
            {traco.nome} - {traco.quantidade_cimento} kg de cimento
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracos;
