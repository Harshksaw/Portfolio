import React from "react";
import ReactDOM from "react-dom/client";
// import { inject } from "@vercel/analytics";

import "./index.css";
import App from "./App";
import StarsCanvas from "./Components/sub/StarBackground";
import Layout from "./Layout";
// inject();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout>


    <App />
    </Layout>
  </React.StrictMode>,
);
