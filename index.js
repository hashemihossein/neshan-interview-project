import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./src/globalStyles.css";
import {
  MapContextProvider,
  ToastProvider,
  SearchContextProvider,
} from "./src/context";
import { ErrorBoundary } from "react-error-boundary";
import ErrorIcon from "./src/assets/Error.png";

function Fallback({ error }) {
  return (
    <div className="error-container">
      <img src={ErrorIcon} width="100px" height="100px" />
      <h1>خطایی رخ داده است!</h1>
      <span>خواهشمندیم پس از حفظ صبوری خود کمی صبر کنید</span>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <MapContextProvider>
        <SearchContextProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </SearchContextProvider>
      </MapContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
