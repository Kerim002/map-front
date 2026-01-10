import { Outlet } from "react-router-dom";

export const NavbarProvider = () => {
  return (
    <div className="w-full">
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};
