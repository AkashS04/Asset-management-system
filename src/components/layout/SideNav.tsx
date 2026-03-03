import { NavLink } from "react-router-dom";
const SideNav = () => {
  return (
    <aside className="w-60 bg-slate-800 text-white p-5 flex flex-col min-h-screen">
      <h1 className="text-xl font-semibold mb-6">AMS</h1>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md transition-colors ${
            isActive ? "bg-slate-700" : "hover:bg-slate-700"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/assets"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md transition-colors ${
            isActive ? "bg-slate-700" : "hover:bg-slate-700"
          }`
        }
      >
        Assets
      </NavLink>
    </aside>
  );
};
export default SideNav;
