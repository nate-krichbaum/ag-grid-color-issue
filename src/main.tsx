import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  AllEnterpriseModule,
  LicenseManager,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-enterprise";
import { AgChartsCommunityModule } from "ag-charts-community";

import "./index.css";

ModuleRegistry.registerModules([
  AllEnterpriseModule.with(AgChartsCommunityModule),
]);
provideGlobalGridOptions({ theme: "legacy" });

// Render the app
const rootElement = document.getElementById("root")!;

if (window.location.hash !== "") {
  console.log("hash", window.location.hash);
}
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
