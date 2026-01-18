import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Atores from "../pages/Atores";
import AtorForm from "../pages/AtorForm";
import Login from "../pages/Login";


function RotaPrivada({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/atores"
          element={
            <RotaPrivada>
              <Atores />
            </RotaPrivada>
          }
        />

        <Route
          path="/atores/novo"
          element={
            <RotaPrivada>
              <AtorForm />
            </RotaPrivada>
          }
        />

        <Route
          path="/atores/:id/editar"
          element={
            <RotaPrivada>
              <AtorForm />
            </RotaPrivada>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
