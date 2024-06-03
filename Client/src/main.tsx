import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.tsx";
import "./index.css";
import Layout from "./layout/index.tsx";
import Loan from "./pages/loan.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/Lån" element={<Loan />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
