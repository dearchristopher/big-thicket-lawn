import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import posthog from "posthog-js";

import HomeV2 from "./pages/HomeV2";
import { HeaderV2 } from "./components/HeaderV2";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { EstimateModalProvider } from "./contexts/EstimateModalContext";

export default function App() {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST,
      person_profiles: "identified_only",
    });
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
          <Route path="/review" element={<HomeV2 />} />
        </Routes>
        <Footer />
      </div>
    </EstimateModalProvider>
  );
}
