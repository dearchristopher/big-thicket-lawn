import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { Header } from "./components";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { EstimateModalProvider } from "./contexts/EstimateModalContext";

export default function App() {
  return (
    <EstimateModalProvider>
      <div className="min-h-screen bg-green-50">
        <Analytics />
        <SpeedInsights />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </EstimateModalProvider>
  );
}
