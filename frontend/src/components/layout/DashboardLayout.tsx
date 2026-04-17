import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 p-[20px] bg-[#f8fafc] ml-60"><Outlet /></main>
    </div>
  );
};
export default DashboardLayout;
