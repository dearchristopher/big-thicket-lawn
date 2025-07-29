import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-700 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
