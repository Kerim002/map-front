import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./style/style.css";
const AppRouter = lazy(() => import("./routes/main.routes"))
import { TanstackProvider } from "./provider/tanstack-provider";
import { ThemeProvider } from "./provider/theme-provider";
import "@/shared/lang/i18n";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TanstackProvider>
        <Suspense>

          <AppRouter />
        </Suspense>
      </TanstackProvider>
    </ThemeProvider>
  </StrictMode>
);
