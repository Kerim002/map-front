import { Navbar } from "@/widgets/navbar/navbar";
import { Outlet } from "react-router-dom";

export const NavbarProvider = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};
