import { useRoutes } from "react-router-dom";
import Home from "../views/Home";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/views/Login";
import PendingDoctorsView from "@/views/PendingDoctorsView";

export default function Routes() {
  const element = useRoutes([
    {
      children: [
        {
          path: "/",
          element: (
            <>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </>
          ),
        },
        {
          path: "/login",
          element: (
            <>
              <Login />
            </>
          ),
        },
        {
          path: "/doctors/pending",
          element: (
            <>
              <DashboardLayout>
                <PendingDoctorsView />
              </DashboardLayout>
            </>
          ),
        },
      ],
    },
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
