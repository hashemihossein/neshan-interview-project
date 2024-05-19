import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./src/globalStyles.css";
import { ContextProvider } from "./src/context";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
