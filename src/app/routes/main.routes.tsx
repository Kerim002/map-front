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
import { Company } from "@/pages/company";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
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
        path: "company",
        children: [
          {
            path: ":currentPage",
            element: (
              <Suspense>
                <Company />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/map",
        element: (
          <Suspense>
            <Map />
          </Suspense>
        ),
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={mainRoutes} />;

export default AppRouter;
