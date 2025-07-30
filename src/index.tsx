import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/fonts.scss";
import "./styles/variables.scss";
import "./styles/global.scss";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
