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
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/60 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-border/50">
        <SidebarMenu>
          <div className="flex items-center gap-3 px-2">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-primary/20 rounded-xl blur-sm animate-pulse" />
              <div className="relative bg-primary p-2 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <Map className="size-4 text-primary-foreground" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-foreground leading-none">Cadastre</span>
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-0.5 opacity-80">Premium v2</span>
              </div>
            )}
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-6 px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {routes.map((item) => {
                const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={t(item.name)}
                      className={`
                        h-12 rounded-xl transition-all duration-300 relative group overflow-hidden
                        ${isActive
                          ? "!bg-primary !text-white shadow-[0_8px_20px_-4px_rgba(var(--primary),0.4)]"
                          : "hover:bg-primary/5 text-primary/70 hover:text-primary"}
                      `}
                    >
                      <button
                        onClick={() => navigate(item.path)}
                        className="flex items-center w-full relative"
                      >
                        {/* Icon Container with glowing effect for active state */}
                        <div className={`
                          flex items-center justify-center rounded-lg transition-all duration-300
                          ${isCollapsed ? "w-full" : "w-10"}
                          ${isActive ? "bg-white/10" : "bg-transparent"}
                        `}>
                          <item.icon className={`
                            size-5 transition-transform group-hover:scale-110
                            ${isActive ? "!text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "text-primary/40 group-hover:text-primary"}
                          `} />
                        </div>

                        {!isCollapsed && (
                          <span className="ml-2 text-[11px] font-black tracking-[0.05em] truncate">
                            {t(item.name).toUpperCase()}
                          </span>
                        )}

                        {isActive && !isCollapsed && (
                          <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-in fade-in zoom-in duration-300" />
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50 bg-muted/20 backdrop-blur-md">
        <div className={`flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? "flex-col" : "justify-between"}`}>
            {/* Language Selection */}
            {!isCollapsed ? (
              <Select
                value={i18n.language}
                onValueChange={(e) => i18n.changeLanguage(e)}
              >
                <SelectTrigger className="h-9 w-full bg-background/50 border-border/50 text-xs font-bold rounded-lg shadow-sm">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50 shadow-2xl backdrop-blur-xl">
                  <SelectItem value="tk" className="font-bold">Turkmen</SelectItem>
                  <SelectItem value="ru" className="font-bold">Russian</SelectItem>
                  <SelectItem value="en" className="font-bold">English</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'tk' : 'en')}
                className="size-9 flex items-center justify-center rounded-xl bg-background/50 border border-border/50 hover:bg-primary/10 hover:text-primary transition-all text-[10px] font-black shadow-sm"
              >
                {i18n.language.toUpperCase()}
              </button>
            )}

            {/* Theme & Controls */}
            <div className={`flex items-center gap-2 ${isCollapsed ? "flex-col" : ""}`}>
              <Button
                onClick={() => toggleTheme()}
                variant="ghost"
                size="icon"
                className="size-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all shadow-sm bg-background/50"
              >
                {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </Button>
              <SidebarTrigger className={`size-9 rounded-xl hover:bg-primary/10 shadow-sm bg-background/50 ${isCollapsed ? "" : ""}`} />
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}