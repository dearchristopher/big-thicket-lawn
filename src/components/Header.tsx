import { Link } from "react-router-dom"
import { HeaderMower } from "./HeaderMower"
import { useEffect, useState } from "react";

export const Header = () => {

    const [showLogo, setShowLogo] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            setShowLogo(window.scrollY > heroHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkStyle = "hover:text-green-200 text-white transition-colors font-semibold capitalize";
    const mobileLinkStyle = "block px-4 py-2 hover:bg-green-600 transition-colors font-semibold capitalize";

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-green-700 text-white shadow-lg">
            <div className="px-4 sm:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-4">
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

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                        aria-label="Toggle mobile menu"
                    >
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    {/* Header Logo */}
                    <div className={`transition-all duration-300 ${showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <Link to="/" className="text-white font-bold hover:text-green-200 transition-colors font-decorative">
                            <HeaderMower />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="py-2 space-y-1">
                        <Link to="/" className={mobileLinkStyle} onClick={closeMobileMenu}>
                            Home
                        </Link>
                        <Link to="#about" className={mobileLinkStyle} onClick={closeMobileMenu}>
                            About
                        </Link>
                        <Link to="#services" className={mobileLinkStyle} onClick={closeMobileMenu}>
                            Services
                        </Link>
                        <Link to="#contact" className={mobileLinkStyle} onClick={closeMobileMenu}>
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>)
}