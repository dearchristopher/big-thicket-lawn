import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";

export default function App() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowLogo(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyle = "hover:text-green-200 text-white transition-colors font-semibold capitalize";

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="sticky top-0 z-50 bg-green-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <Link to="/" className={linkStyle}>
              Home
            </Link>
            <Link to="#about" className={linkStyle}>
              About
            </Link>
            <Link to="#services" className={linkStyle}>
              Services
            </Link>
            <Link to="#contact" className={linkStyle}>
              Contact
            </Link>
          </div>

          <div className={`transition-all duration-300 ${showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <Link to="/" className="text-white font-bold hover:text-green-200 transition-colors font-decorative">
              <div className="flex flex-col gap-0 items-center">
                <span className="font-decorative text-xl">BIG THICKET</span>
                <span className="font-main text-xs tracking-wide">LAWN SERVICES</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
