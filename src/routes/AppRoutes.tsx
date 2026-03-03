import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout"
import AssetsPage from "../pages/AssetsPage";
const DashboardHome = () => {
  return <h2>Welcome to Dashboard</h2>;
};
const AppRoutes =()=>{
    return<BrowserRouter>
    <DashboardLayout>
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/assets" element={<AssetsPage />} />
        </Routes>
    </DashboardLayout>
    </BrowserRouter>
}
export default AppRoutes;