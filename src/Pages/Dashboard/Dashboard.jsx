// import { Link, Outlet } from "react-router-dom";
// import { ChevronDown, House, Settings } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <section className="min-h-screen">
//       <div className="bg-[#242424] px-10 flex justify-end py-5">
//         <div className="avatar">
//           <div className="w-14 rounded-full">
//             <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
//           </div>
//         </div>
//       </div>

//       <div className="drawer lg:drawer-open bg-[#242424] min-h-screen">
//         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content flex flex-col items-stretch justify-start bg-white overflow-auto">
//           <Outlet />
//           <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
//             Open drawer
//           </label>
//         </div>
//         <div className="drawer-side w-80 bg-[#242424]">
//           <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
//           <ul className="menu w-[250px] font-medium text-black">
//             <li className="mb-1 text-lg text-white">
//               <Link to="/dashboard/dashboardHome"><House size={20} /> Home</Link>
//             </li>
//             <div className="dropdown">
//               <div tabIndex={0} className="cursor-pointer m-1 text-lg text-white flex items-center gap-2 ms-4">
//                 <Settings size={20} />
//                 Setting <ChevronDown className="ms-5" />
//               </div>
//               <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-full shadow">
//                 <li className="py-1"><Link to='/dashboard/termsCondition'>Terms & Conditions</Link></li>
//                 <li className="py-1"><Link to='/dashboard/privecyPolicy'>Privacy Policy</Link></li>
//               </ul>
//             </div>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;





import { Link, Outlet } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import { AiOutlineAppstore, AiOutlineAudit, AiOutlineSetting } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";

const Dashboard = () => {
  return (
    <section className="flex h-screen">
      {/* Sidebar (Sticky on Larger Screens) */}
      <div className="w-80 bg-black fixed left-0 top-0 h-screen z-50 hidden lg:flex flex-col">
    
        <ul className="menu w-[180px] font-medium text-black p-4 md:pt-[70px]">
          <li className="mb-1 text-lg text-white">
            <Link to="/"><AiOutlineAppstore className="text-2xl"/> Home</Link>
          </li>
          
         
         

          {/* Billing Dropdown */}
       

          {/* Settings Dropdown */}
           {/* <li className="dropdown mt-1">
            <div tabIndex={0} className="cursor-pointer text-lg text-white flex items-center gap-2">
              <AiOutlineSetting className="text-2xl" />
              Settings <ChevronDown />
            </div>
            <ul tabIndex={0} className="dropdown-content menu  w-[200px] ms-14 mt-2 ">
              <li className="py-1 text-white"><Link to="/userDashboard/faqMod">FAQ</Link></li>
              <li className="py-1 text-white"><Link to="/userDashboard/AddAboutUs">About Us</Link></li>
              <li className="py-1 text-white"><Link to="/userDashboard/AddTermsCondition">Terms & Conditions</Link></li>
              <li className="py-1 text-white"><Link to="/userDashboard/AddPrivacyPolicy">Privacy Policy</Link></li>
            </ul>
          </li>  */}

<li className="dropdown mt-1">
            <div tabIndex={0} className="cursor-pointer text-lg text-white flex items-center gap-2">
              <AiOutlineSetting className="text-2xl" />
              Settings <ChevronDown />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-white/30 backdrop-blur-md z-[1] w-[200px] ms-14 mt-2 shadow border-white/20 rounded-lg">
             
              <li className="py-1 text-white"><Link to="/settings/termsCondition">Terms & Conditions</Link></li>
              <li className="py-1 text-white"><Link to="/settings/privecyPolicy">Privacy Policy</Link></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80 flex flex-col">
        {/* Sticky Header */}
        <div className="bg-black px-10 flex justify-end items-center gap-5 py-5 sticky top-0 z-40 shadow-md">
          <Link to='/dashboard/notification'><Bell className="text-white"/></Link>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/037/098/807/small_2x/ai-generated-a-happy-smiling-professional-man-light-blurry-office-background-closeup-view-photo.jpg" alt="avatar" />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto ">
          <Outlet />
        </div>
      </div>

      {/* Mobile Drawer (Only Visible on Small Screens) */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side lg:hidden z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="w-80 bg-[#9ECA2E] p-4">
          <ul className="menu w-[250px] font-medium text-black">
           
           
            <li className="mb-1 text-lg text-white">
              <Link to="/dashboard/message"><TbMessages className="text-2xl"/> Message</Link>
            </li>
            <li className="mb-1 text-lg text-white">
              <Link to="/dashboard/sellerDetails"><AiOutlineAudit className="text-2xl"/> Seller</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
