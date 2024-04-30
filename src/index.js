import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      csp={{ nonce: "" }}
      theme={{ token: { colorPrimary: "#d3ab24" } }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
