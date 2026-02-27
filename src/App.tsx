import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import clarity from "@microsoft/clarity";

import HomeV2 from "./pages/HomeV2";
import { HeaderV2 } from "./components/HeaderV2";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { EstimateModalProvider } from "./contexts/EstimateModalContext";

export default function App() {
  useEffect(() => {
    clarity.init("ssxc6ul0zu");
  }, []);

  return (
    <EstimateModalProvider>
      <div className="min-h-screen bg-green-50">
        <Analytics />
        <SpeedInsights />
        <HeaderV2 />
        <Routes>
          <Route path="/" element={<HomeV2 />} />
          <Route path="/quote" element={<HomeV2 />} />
        </Routes>
        <Footer />
      </div>
    </EstimateModalProvider>
  );
}
