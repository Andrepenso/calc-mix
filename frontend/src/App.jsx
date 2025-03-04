import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SaibaMais from "./pages/SaibaMais";
import EquipamentosPublico from "./pages/EquipamentosPublico";
import Analise from "./pages/Analise";
import Login from "./pages/Login";
import EquipamentosAdmin from "./admin/EquipamentosAdmin";
import TracosAdmin from "./admin/TracosAdmin";
import Dashboard from "./admin/Dashboard";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <Routes>
        {/* Páginas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/saiba-mais" element={<SaibaMais />} />
        <Route path="/equipamentos" element={<EquipamentosPublico />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/equipamentos" element={<EquipamentosAdmin />} />
        <Route path="/admin/tracos" element={<TracosAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
