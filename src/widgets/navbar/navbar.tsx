import { MapNavbar } from "../map-navbar/map-navbar";
import { SidebarSheet } from "../sidebar/sidebar-sheet";

export const Navbar = () => {
  // const {} = useLocation()
  return (
    <div className="fixed z-10 flex gap-3 items-center px-3 left-0 right-0 top-0 justify-between h-14  backdrop-blur-md shadow-sm">
      <SidebarSheet />
      <MapNavbar />
    </div>
  );
};
