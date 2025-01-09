import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginForm from "../Pages/LoginForm/LoginForm";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import EditUser from "../Pages/Dashboard/EditUser";
import TermsAndConditions from "../Pages/Dashboard/TermsCondition";
import PrivecyPolicy from "../Pages/Dashboard/PrivacyPolicy"; // Correct component

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/loginForm',
        element: <LoginForm />
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "dashboardHome",
        element: <DashboardHome />
      },
      {
        path: 'editUser/:id',
        element: <EditUser />
      },
      {
        path: "termsCondition",
        element: <TermsAndConditions />
      },
      {
        path: "privecyPolicy",
        element: <PrivecyPolicy /> // Correct component
      }
    ]
  }
]);
