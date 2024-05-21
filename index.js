import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./src/globalStyles.css";
import { MapContextProvider } from "./src/context";
import { SearchContextProvider } from "./src/context";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <MapContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </MapContextProvider>
  </React.StrictMode>
);
