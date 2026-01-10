import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Map } from "@/pages/map";
import { NavbarProvider } from "../provider/navbar-provider";
import { Region } from "@/pages/region";
import { Home } from "@/pages/home";
import { TestPage } from "@/pages/test/ui/test-page";
import { Authority } from "@/pages/authority";
import { Performance } from "@/pages/performance";
import { Ownership } from "@/pages/ownership";
import { Building } from "@/pages/building";
// import { Company } from "@/pages/company";
import { FacilityPage } from "@/pages/facility";
import { SidebarLayout } from "../layouts/sidebar-layout";
import { EmployeePage } from "@/pages/employee";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        path: "/map",

        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Map />
              </Suspense>
            ),
          },
          {
            path: ":facilityId",
            element: <NavbarProvider />,
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <FacilityPage />
                  </Suspense>
                ),
              },
              {
                path: "employee",
                children: [
                  {
                    path: ":currentPage",
                    element: (
                      <Suspense>
                        <EmployeePage />
                      </Suspense>
                    )
                  }
                ]
              }
            ],
          },
        ],
      },
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
          // {
          //   path: "company",
          //   children: [
          //     {
          //       path: ":currentPage",
          //       element: (
          //         <Suspense>
          //           <Company />
          //         </Suspense>
          //       ),
          //     },
          //   ],
          // },

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
