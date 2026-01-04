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
            {routes.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));

              return (
                <Button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    openSidebar(false);
                  }}
                  variant={isActive ? "soft" : "ghost"}
                  className={`w-full justify-start h-12 transition-all duration-300 rounded-xl px-2 ${isActive
                      ? "!bg-primary !text-white font-black shadow-[0_8px_20px_-4px_rgba(var(--primary),0.4)]"
                      : "hover:bg-primary/5 text-primary/70 hover:text-primary"
                    }`}
                >
                  <div className={`p-2 rounded-lg transition-all ${isActive ? "bg-white/10" : "bg-transparent"}`}>
                    <item.icon className={`size-5 transition-transform ${isActive ? "!text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "text-primary/40"}`} />
                  </div>
                  <span className="ml-2 text-[11px] font-black tracking-[0.05em] uppercase">{t(item.name)}</span>

                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <SheetFooter className=""></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
