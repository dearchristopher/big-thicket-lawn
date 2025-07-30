import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { Header } from "./components";

export default function App() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
