import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Metrics from "./pages/Metrics";
import TaxReduction from "./pages/TaxReduction";

import Navigation from "./components/Navigation";

function App() {
  return (
    <main className="flex h-screen w-screen p-0 m-0">
      <Navigation />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/tax-reduction" element={<TaxReduction />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
