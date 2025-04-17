import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./query/ReactQueryProvider.jsx";

createRoot(document.getElementById("root")).render(
    <ReactQueryProvider>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </ReactQueryProvider>
);
