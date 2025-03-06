import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SaibaMais from "./pages/SaibaMais";
import EquipamentosPublico from "./pages/EquipamentosPublico";
import Analise from "./pages/Analise";
import Login from "./pages/Login";
import EquipamentosAdmin from "./admin/EquipamentosAdmin";
import TracosAdmin from "./admin/TracosAdmin";
import Dashboard from "./admin/Dashboard";
import PrivateRoute from "./routes/PrivateRoute.jsx"; // Importação correta

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <Router>
      {/* Passamos a visibilidade da Navbar como prop */}
      <Navbar isVisible={showNavbar} />

      <Routes>
        {/* Página Home agora recebe a função para mostrar a Navbar */}
        <Route path="/" element={<Home onStart={() => setShowNavbar(true)} />} />
        <Route path="/saiba-mais" element={<SaibaMais />} />
        <Route path="/equipamentos" element={<EquipamentosPublico />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/login" element={<Login />} />

        {/* Páginas Protegidas - Apenas para usuários logados */}
        <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin/equipamentos" element={<PrivateRoute element={<EquipamentosAdmin />} />} />
        <Route path="/admin/tracos" element={<PrivateRoute element={<TracosAdmin />} />} />
      </Routes>
    </Router>
  );
}

export default App;
