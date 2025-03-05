import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const token = localStorage.getItem("token"); // Verifica se o usuário está autenticado
  return token ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
