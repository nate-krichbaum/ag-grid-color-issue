import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

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
        </StrictMode>
    );
}
