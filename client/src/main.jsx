import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  colorScheme: "light",
  fontFamily: "Arial, sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
