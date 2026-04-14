import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
const SideNav = () => {

  const dispatch =useDispatch()
  return (
    <aside className="w-60 bg-slate-800 text-white p-5 flex fixed flex-col justify-between min-h-screen">
      <div className="flex flex-col">
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
      </div>

      <div className="">
        <button className="hover:bg-slate-700 px-3 py-2 w-full text-start rounded-md cursor-pointer" onClick={()=> dispatch(logout())}>
          Logout
        </button>
      </div>
    </aside>
  );
};
export default SideNav;
