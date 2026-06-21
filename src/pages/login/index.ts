import { lazy } from "react"

export const LoginPage = lazy(() =>
  import("./ui/login-page").then((page) => ({ default: page.default }))
)
