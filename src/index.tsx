import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "primeflex/primeflex.css";
import { debugContextDevtool } from "react-context-devtool";
const rootContainer = document.getElementById("root") as HTMLElement;

// Create root using ReactDOM.createRoot
const root = ReactDOM.createRoot(rootContainer);

// Call debugContextDevtool and pass the root container as an argument
debugContextDevtool(rootContainer);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
