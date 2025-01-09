import { Link, Outlet } from "react-router-dom";
import { ChevronDown, House, Settings } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="min-h-screen">
      <div className="bg-[#242424] px-10 flex justify-end py-5">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
          </div>
        </div>
      </div>

      <div className="drawer lg:drawer-open bg-[#242424] min-h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-stretch justify-start bg-white overflow-auto">
          <Outlet />
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side w-80 bg-[#242424]">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu w-[250px] font-medium text-black">
            <li className="mb-1 text-lg text-white">
              <Link to="/dashboard/dashboardHome"><House size={20} /> Home</Link>
            </li>
            <div className="dropdown">
              <div tabIndex={0} className="cursor-pointer m-1 text-lg text-white flex items-center gap-2 ms-4">
                <Settings size={20} />
                Setting <ChevronDown className="ms-5" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-full shadow">
                <li className="py-1"><Link to='/dashboard/termsCondition'>Terms & Conditions</Link></li>
                <li className="py-1"><Link to='/dashboard/privecyPolicy'>Privacy Policy</Link></li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
