import { ToggleSidebar } from "../sidebar/toggle-sidebar";

export const Navbar = () => {
  return (
    <div className="fixed z-10 flex gap-3 items-center px-3 left-0 right-0 top-0 justify-between h-14  backdrop-blur-md shadow-sm">
      <ToggleSidebar />
      {/* <MapNavbar /> */}
    </div>
  );
};
