import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LogOut,
  Map,
  Moon,
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
import { useQueryClient } from "@tanstack/react-query";
import type { UserRoles } from "@/shared/types/user";
import { SIDEBAR_ROUTES_CONSTANTS } from "@/shared/constants/sidebar-routes-constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";


export function AppSidebar() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data } = useProfileQuery()


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/login"
  };
  const hasAccess = (roles: UserRoles[]) => {
    if (!roles) return true;
    if (!data?.role) return false;
    return roles.includes(data.role);
  };

  const handleLanguageChange = async (newLang: string) => {
    await i18n.changeLanguage(newLang);
    // This tells TanStack Query to mark all queries as "stale" and refetch active ones
    queryClient.invalidateQueries();
  };


  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/60 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center border-b border-border/50">
        <SidebarMenu>
          <div className="flex items-center gap-3 ">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-primary/20 rounded-xl blur-sm animate-pulse" />
              <div className="relative  bg-primary p-2 rounded-xl border border-green-500  flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <Map className="size-4 text-primary-foreground" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-foreground leading-none">{t("cadastr")}</span>
              </div>
            )}
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-6 px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {SIDEBAR_ROUTES_CONSTANTS.map((item) => {
                if (!hasAccess(item.roles)) return null
                // const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
                console.log(item.path.split("/")[1])
                const isActive = item.path === "/" ? item.path === pathname : pathname.includes(item.path.split("/")[1])

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <LogOut size={16} />
              {!isCollapsed &&
                t('logout')
              }
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-56 p-4">
            <div className="space-y-3 text-center">
              <h3 className="font-medium text-sm">
                {t('are-you-sure-you-want-to-log-out')}
              </h3>
              <div className="flex justify-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full"
                >
                  {t('confirm')}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className={`flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? "flex-col" : "justify-between"}`}>
            {/* Language Selection */}
            {!isCollapsed ? (
              <Select
                value={i18n.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger value={i18n.language} className="h-9 w-full bg-background/50 border-border/50 text-xs font-bold rounded-lg shadow-sm">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50 shadow-2xl backdrop-blur-xl">
                  <SelectItem value="tk" className="font-bold">{t("turkmen")}</SelectItem>
                  <SelectItem value="ru" className="font-bold">{t("russian")}</SelectItem>
                  <SelectItem value="en" className="font-bold">{t("english")}</SelectItem>
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