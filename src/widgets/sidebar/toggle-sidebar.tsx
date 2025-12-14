import { useTheme } from "@/app/provider/theme-provider";
import { Button } from "@/shared/ui/button";
import { Menu } from "lucide-react";

export const ToggleSidebar = () => {
  const { openSidebar, isSidebarOpen } = useTheme();
  return (
    <Button
      onClick={() => openSidebar(isSidebarOpen ? false : true)}
      variant="soft"
    >
      <Menu />
    </Button>
  );
};
