import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
// import './index.css'
import StarComponents from "./StarComponents.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarComponents max={10} />
  </React.StrictMode>
);
