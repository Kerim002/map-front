import {lazy} from "react"

export const CityPage = lazy(() => import("./ui/city-page").then((page) => ({default:page.CityPage})))