import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/style.css";
import AppRouter from "./routes/main.routes";
import { TanstackProvider } from "./provider/tanstack-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <AppRouter />
    </TanstackProvider>
  </StrictMode>
);
