import React, { createContext, useContext, useState, useCallback } from "react";

export const toastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "") => {
    const id = Date.now();
    if (toasts.length < 3) {
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
      setTimeout(() => removeToast(id), 5000);
    }
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts?.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </toastContext.Provider>
  );
};

const Toast = ({ message, onClose, type }) => {
  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};
