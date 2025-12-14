import { useTheme } from "@/app/provider/theme-provider";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetFooter } from "@/shared/ui/sheet";

import {
  BadgeCheck,
  Building,
  Building2,
  Home,
  IdCard,
  LandPlot,
  Map,
  Shield,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarSheetHeader } from "./sidebar-header";
import { useTranslation } from "react-i18next";

const routes = [
  {
    path: "/",
    icon: Home,
    name: "home",
  },
  {
    path: "/map",
    icon: Map,
    name: "map",
  },
  {
    path: "/company/1",
    icon: Building2,
    name: "company",
  },
  {
    path: "/authority/1",
    icon: IdCard,
    name: "authority",
  },
  {
    path: "/building/1",
    icon: Building,
    name: "building",
  },
  {
    path: "/ownership/1",
    icon: Shield,
    name: "ownership",
  },
  {
    path: "/performance/1",
    icon: BadgeCheck,
    name: "performance",
  },
  {
    path: "/region/1",
    icon: LandPlot,
    name: "region",
  },
];

export const SidebarSheet = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSidebarOpen, openSidebar } = useTheme();
  const { t } = useTranslation();

  return (
    <Sheet open={isSidebarOpen} onOpenChange={openSidebar}>
      <SheetContent className="w-80" side="left">
        <SidebarSheetHeader />
        <div className="p-3">
          <div className="space-y-1 p-3 rounded-2xl dark:bg-gray-800 border bg-white border-gray-200 dark:border-gray-700">
            {routes.map((item) => (
              <Button
                onClick={() => {
                  navigate(item.path);
                  openSidebar(false);
                }}
                variant={pathname === item.path ? "soft" : "ghost"}
                className={`w-full justify-start h-11 [&_svg:not([class*='size-'])]:size-5 ${
                  pathname === item.path ? "" : ""
                }`}
              >
                <item.icon size={20} />
                <p>{t(item.name)}</p>
              </Button>
            ))}
          </div>
        </div>

        <SheetFooter className=""></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
