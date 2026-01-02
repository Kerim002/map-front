import { SidebarProvider } from "@/shared/ui/sidebar"
import { AppSidebar } from "@/widgets/sidebar/app-sidebar"
import { Outlet } from "react-router-dom"

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-card transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 font-medium">
            {/* Breadcrumb or secondary navigation could go here */}
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Markets Map</span>
          </div>
          <div className="flex items-center gap-4">
            {/* User profile or settings placeholder */}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-0 relative">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
