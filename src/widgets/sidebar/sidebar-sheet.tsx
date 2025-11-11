import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

import { Home, LandPlot, Map, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    icon: Home,
    name: "Home",
  },
  {
    path: "/map",
    icon: Map,
    name: "Map",
  },
  {
    path: "/company/1",
    icon: LandPlot,
    name: "Company",
  },
  {
    path: "/authority/1",
    icon: LandPlot,
    name: "Authority",
  },
  {
    path: "/building/1",
    icon: LandPlot,
    name: "Building",
  },
  {
    path: "/ownership/1",
    icon: LandPlot,
    name: "Ownership",
  },
  {
    path: "/performance/1",
    icon: LandPlot,
    name: "Performance",
  },
  {
    path: "/region/1",
    icon: LandPlot,
    name: "Region",
  },
];

export const SidebarSheet = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80" side="left">
        <SheetHeader>
          <SheetTitle>Sidebar</SheetTitle>
        </SheetHeader>
        <div className="space-y-1 px-3">
          {routes.map((item) => (
            <Button
              onClick={() => navigate(item.path)}
              variant="ghost"
              className={`w-full justify-start ${
                pathname === item.path ? "bg-primary/10" : ""
              }`}
            >
              <item.icon />
              <p>{item.name}</p>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
