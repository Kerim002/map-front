import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavbarProvider } from "../provider/navbar-provider";
import { Region } from "@/pages/region";
import { Home } from "@/pages/home";
import { TestPage } from "@/pages/test/ui/test-page";
import { Authority } from "@/pages/authority";
import { Performance } from "@/pages/performance";
import { Ownership } from "@/pages/ownership";
import { Building } from "@/pages/building";
import { SidebarLayout } from "../layouts/sidebar-layout";

import { Specialization } from "@/pages/specialization";
import { mapRoutes } from "./map.routes";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      ...mapRoutes,
      {
        element: <NavbarProvider />,
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "region",
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Region />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "authority",
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Authority />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "performance",
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Performance />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "ownership",
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Ownership />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "building",
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Building />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/specialization",
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Specialization />
                  </Suspense>
                ),
              },
            ],
          },

          {
            path: "/test",
            element: <TestPage />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={mainRoutes} />;

export default AppRouter;
