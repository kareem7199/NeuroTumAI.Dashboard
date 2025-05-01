import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/userAtom";
import { tokenState } from "@/recoil/tokenAtom";
import authService from "@/services/auth.service";

export default function DashboardLayout() {
  const [, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await authService.getUserData();
      setUser(response.data.data);
    } catch (error) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      navigate("/login");
    }

    fetchUser();
  }, [token]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto ml-4 px-4">
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
          </SidebarInset>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
