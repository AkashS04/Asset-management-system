import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssetsPage from "../pages/AssetsPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import DashBoardPage from "../pages/DashBoardPage";

function AuthExpireWatcher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handle = () => {
      dispatch(logout());
        window.__AUTH_EXPIRED__ = false;
      navigate("/login", { replace: true });
    };
    window.addEventListener("auth:expired", handle);
    return () => window.removeEventListener("auth:expired", handle);
  }, [dispatch, navigate]);
  return null;
}
const AppRoutes = () => {
  return (
    <BrowserRouter>

      <AuthExpireWatcher />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/assets" element={<AssetsPage />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
