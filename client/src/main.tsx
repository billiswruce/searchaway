import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    //<React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN ?? ""}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID ?? ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
    //</React.StrictMode
  );
}
