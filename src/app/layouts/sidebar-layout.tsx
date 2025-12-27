import { SidebarProvider } from "@/shared/ui/sidebar"
import { AppSidebar } from "@/widgets/sidebar/app-sidebar"
import { Outlet } from "react-router-dom"

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full relative">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
