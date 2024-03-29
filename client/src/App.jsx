import "@mantine/core/styles.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./components/Layout/Layout.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}
