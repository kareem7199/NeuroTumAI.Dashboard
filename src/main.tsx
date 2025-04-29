import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <HeroUIProvider>
          <Toaster position="bottom-center" />
          <App />
        </HeroUIProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
