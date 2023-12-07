import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";
import { store } from "./store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="276847952905-phlf45kf46uhitl8k8ps0k8s5agom0v0.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      ;
    </Provider>
  </React.StrictMode>
);
