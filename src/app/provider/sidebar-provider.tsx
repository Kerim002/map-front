import { SidebarSheet } from "@/widgets/sidebar/sidebar-sheet";
import { Outlet } from "react-router-dom";

export const SidebarProvider = () => {
  return (
    <div className="w-full h-screen">
      <SidebarSheet />
      <Outlet />
    </div>
  );
};
