import { SidebarProvider } from "@/shared/ui/sidebar"
import { MapFilters } from "@/widgets/map-navbar/map-filters"
import { AppSidebar } from "@/widgets/sidebar/app-sidebar"
// import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom"
import { Toaster } from "sonner";
export const SidebarLayout = () => {
  const {pathname} = useLocation()
  // const { t} = useTranslation()

  return (
    <SidebarProvider>
      <Toaster richColors />
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden bg-background">
        <header className={`" ${pathname === "/map" ? "h-16 flex": ""} shrink-0 items-center justify-between border-b px-6 bg-card transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"`}>

          <div className="flex items-center gap-4  w-full">
            {pathname === "/map" ? <MapFilters/> : null}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-0 relative">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
