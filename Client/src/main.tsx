import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.tsx";
import "./index.css";
import Layout from "./layout/index.tsx";
import Loan from "./pages/Loan.tsx";
import { RegistrerLogin } from "./pages/RegistrerLogin.tsx";
import { Levering } from "./pages/Levering.tsx";
import AddItem from "./pages/AddItem.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/Lan" element={<Loan />} />
        <Route path="/LoggInn" element={<RegistrerLogin />} />
        <Route path="/Levering" element={<Levering />} />
        <Route path="/LeggTilEnhet" element={<AddItem />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
