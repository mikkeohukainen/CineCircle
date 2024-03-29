import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  colorScheme: "light",
  fontFamily: "Arial, sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
