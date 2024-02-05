import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./lib/store/store.ts";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryProvider>
  </React.StrictMode>
);
