import { useRoutes } from "react-router-dom";
import Home from "../views/Home";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/views/Login";
import PendingDoctorsView from "@/views/PendingDoctorsView";
import PendingClinicsView from "@/views/PendingClinicsView";
import MessagesView from "@/views/MessagesView";
import MessageView from "@/views/MessageView";

export default function Routes() {
  const element = useRoutes([
    // Public routes
    {
      path: "/login",
      element: <Login />,
    },

    // Dashboard layout applied to all children here
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/doctors/pending",
          element: <PendingDoctorsView />,
        },
        {
          path: "/clinics/pending",
          element: <PendingClinicsView />,
        },
        {
          path: "/messages",
          element: <MessagesView />,
        },
        {
          path: "/messages/:id",
          element: <MessageView />,
        },
      ],
    },

    // 404 fallback
    {
      path: "*",
      element: (
        <div className="text-6xl min-h-screen flex justify-center items-center bg-primary text-white font-bold">
          404 PAGE NOT FOUND 😔
        </div>
      ),
    },
  ]);

  return element;
}
