import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BadgeCheck,
  Building,
  Building2,
  Home,
  IdCard,
  LandPlot,
  Map,
  Moon,
  Shield,
  Sun,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/shared/ui/sidebar";
import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useTheme } from "@/app/provider/theme-provider";

// 1. Integrated the detailed routes from your Sheet Sidebar
const routes = [
  { path: "/", icon: Home, name: "home" },
  { path: "/map", icon: Map, name: "map" },
  { path: "/company/1", icon: Building2, name: "company" },
  { path: "/authority/1", icon: IdCard, name: "authority" },
  { path: "/building/1", icon: Building, name: "building" },
  { path: "/ownership/1", icon: Shield, name: "ownership" },
  { path: "/performance/1", icon: BadgeCheck, name: "performance" },
  { path: "/region/1", icon: LandPlot, name: "region" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarTrigger />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>{t("application")}</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => {
                // Determine if this specific route is active
                const isActive = pathname === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive} // shadcn/ui sidebar usually supports isActive prop
                      tooltip={t(item.name)} // Shows name on hover when collapsed
                    >
                      <button
                        onClick={() => navigate(item.path)}
                        className="flex items-center w-full"
                      >
                        <item.icon />
                        <span>{t(item.name)}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={`p-2 transition-all duration-300 ${isCollapsed ? "items-center space-y-2" : "flex-row gap-2"}`}>
        
        {/* Theme Toggle */}
        <Button
          onClick={() => toggleTheme()}
          variant="ghost" // Changed to ghost to look better in sidebars
          size="icon"
          className="shrink-0"
        >
          {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </Button>

        {/* Language Select - Only show when NOT collapsed */}
        {!isCollapsed && (
          <Select
            value={i18n.language}
            onValueChange={(e) => i18n.changeLanguage(e)}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t("en")}</SelectItem>
              <SelectItem value="ru">{t("ru")}</SelectItem>
              <SelectItem value="tk">{t("tk")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}