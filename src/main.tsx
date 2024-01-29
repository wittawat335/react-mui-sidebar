import React from "react";
import ReactDOM from "react-dom/client";
import store from "./lib/store/store.ts";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Provider store={store}>
          {/* <RouterProvider router={routes} /> */}
          <App />
        </Provider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
