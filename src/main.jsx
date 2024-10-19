import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import store from "./state";

// Import components
import { ToastProvider } from "./components/shared/toast.jsx";
import { Toaster } from "./components/shared/toaster.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>
);
