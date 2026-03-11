import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssetsPage from "../pages/AssetsPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
const DashboardHome = () => {
  return <h2>Welcome to Dashboard</h2>;
};
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/assets" element={<AssetsPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
