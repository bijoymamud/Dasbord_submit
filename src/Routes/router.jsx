import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginForm from "../Pages/LoginForm/LoginForm";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import EditUser from "../Pages/Dashboard/EditUser";
import TermsConditon from "../Pages/Dashboard/TermsConditon";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";


export const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element: <DashboardHome />
      },
      {
        path: 'editUser/:id',
        element: <EditUser />
      },
     
    ],
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: "settings",
    element: <Dashboard />,
    children: [
      
      
      {
        path: "termsCondition",
       element: <TermsConditon/>
      },
      {
        path: "privecyPolicy",
       element: <PrivacyPolicy/>
      }
    ]
  }
]);
