import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Metrics from "./pages/Metrics";

function App() {
  return (
    <main className="h-screen w-screen p-0 m-0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </main>
  );
}

export default App;
