import { SidebarProvider } from "../ui/sidebar";

const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
        {children}
    </SidebarProvider>
  );
};

export default SideBarProvider;
