import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./src/globalStyles.css";
import {
  MapContextProvider,
  ToastProvider,
  SearchContextProvider,
} from "./src/context";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <MapContextProvider>
      <SearchContextProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SearchContextProvider>
    </MapContextProvider>
  </React.StrictMode>
);
