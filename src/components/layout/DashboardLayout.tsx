import SideNav from "./SideNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 p-[20px] bg-[#f8fafc]">{children}</main>
    </div>
  );
};
export default DashboardLayout;
