import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Sales from "./pages/Sales";

function App() {
  return (
    <main className="h-screen w-screen p-0 m-0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/overview" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/gates" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
