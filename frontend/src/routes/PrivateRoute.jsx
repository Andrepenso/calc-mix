import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 


function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp && decoded.exp > now;
  } catch (e) {
    return false;
  }
}

function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem("token");
    return (
      <Navigate
        to="/login"
        state={{ error: "⚠ Sessão expirada. Faça login novamente." }}
        replace
      />
    );
  }

  return element;
}

export default PrivateRoute;
