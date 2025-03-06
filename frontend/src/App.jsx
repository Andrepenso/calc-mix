import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SaibaMais from "./pages/SaibaMais";
import EquipamentosPublico from "./pages/EquipamentosPublico";
import Analise from "./pages/Analise";
import Login from "./pages/Login";
import EquipamentosAdmin from "./admin/EquipamentosAdmin";
import TracosAdmin from "./admin/TracosAdmin";
import Dashboard from "./admin/Dashboard";
import PrivateRoute from "./routes/PrivateRoute.jsx";

function App() {
  const [showNavbar, setShowNavbar] = useState(() => {
    return localStorage.getItem("showNavbar") === "true";
  });

  const [isConcreteMode, setIsConcreteMode] = useState(() => {
    return localStorage.getItem("isConcreteMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("showNavbar", showNavbar);
    localStorage.setItem("isConcreteMode", isConcreteMode);
  }, [showNavbar, isConcreteMode]);

  return (
    <Router>
      {/* Navbar só aparece depois de clicar em "Comece Agora" */}
      {showNavbar && <Navbar isVisible={showNavbar} />}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onStart={() => {
                setShowNavbar(true);
                setIsConcreteMode(true); // Ativa o fundo de concreto só depois do clique
              }}
              isConcreteMode={isConcreteMode}
            />
          }
        />
        <Route path="/saiba-mais" element={<SaibaMais />} />
        <Route path="/equipamentos" element={<EquipamentosPublico />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/login" element={<Login />} />

        {/* Páginas Protegidas */}
        <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin/equipamentos" element={<PrivateRoute element={<EquipamentosAdmin />} />} />
        <Route path="/admin/tracos" element={<PrivateRoute element={<TracosAdmin />} />} />
      </Routes>
    </Router>
  );
}

export default App;
