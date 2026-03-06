import type { RouteObject } from "react-router-dom";
import { FacilityChildListPage, FacilityPage } from "@/pages/facility";
import { Map } from "@/pages/map";
import { EmployeeDetailPage, EmployeeFilesPage, EmployeePage } from "@/pages/employee";
import { Suspense } from "react";
import { NavbarProvider } from "../provider/navbar-provider";
export const mapRoutes :RouteObject[] = [
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
                path: "childs",
                children: [
                  {
                    path: ":currentPage",
                    element: (
                      <Suspense>
                        <FacilityChildListPage />
                      </Suspense>)

                  },
                  {
                    path: ":currentPage/:facilityChildId",

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
                      },

                      {
                        path: "files",
                        children: [
                          {
                            path: ":currentPage",
                            element: (
                              <Suspense>
                                <EmployeeFilesPage />
                              </Suspense>
                            )
                          }
                        ]
                      },
                      {
                        path: "employees/:employeeId",
                        element: (
                          <Suspense>
                            <EmployeeDetailPage />
                          </Suspense>
                        )
                      }
                    ]
                  }

                ]
              },
              {
                path: "rentals",
                children: [
                  {
                    path: ":currentPage",
                    element: (
                      <Suspense>
                        <FacilityChildListPage />
                      </Suspense>)

                  },
                  {
                    path: ":currentPage/:facilityChildId",

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
                      },

                      {
                        path: "files",
                        children: [
                          {
                            path: ":currentPage",
                            element: (
                              <Suspense>
                                <EmployeeFilesPage />
                              </Suspense>
                            )
                          }
                        ]
                      },
                      {
                        path: "employees/:employeeId",
                        element: (
                          <Suspense>
                            <EmployeeDetailPage />
                          </Suspense>
                        )
                      }
                    ]
                  }

                ]
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
              },

              {
                path: "files",
                children: [
                  {
                    path: ":currentPage",
                    element: (
                      <Suspense>
                        <EmployeeFilesPage />
                      </Suspense>
                    )
                  }
                ]
              },
              {
                path: "employees/:employeeId",
                element: (
                  <Suspense>
                    <EmployeeDetailPage />
                  </Suspense>
                )
              }
            ],
          },
        ],
      },
]