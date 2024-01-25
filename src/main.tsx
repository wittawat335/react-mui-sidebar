import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes/routes.tsx";
import store from "./lib/redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </QueryProvider>
  </React.StrictMode>
);
