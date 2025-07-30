import { Link } from "react-router-dom";
import { FooterMower } from "./HeaderMower";

export const Footer = () => {
    return (
        <footer className="bg-green-800 text-white py-12 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <Link to="/" className="mb-4">
                            <FooterMower />
                        </Link>
                        <p className="text-green-200 text-sm mt-2">
                            Professional lawn care services in Southeast Texas
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 font-decorative">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-green-200 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="#about" className="text-green-200 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#services" className="text-green-200 hover:text-white transition-colors">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link to="#contact" className="text-green-200 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-decorative">Contact Us</h3>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="text-green-300">📱</span>
                                <a href="tel:14097193979" className="text-green-200 hover:text-white transition-colors">
                                    (409) 719-3979
                                </a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-green-300">✉️</span>
                                <a href="mailto:contact@bigthicketlawn.com" className="text-green-200 hover:text-white transition-colors">
                                    contact@bigthicketlawn.com
                                </a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-green-300">📍</span>
                                <span className="text-green-200">Lumberton, TX</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-300 text-sm">
                    <p>&copy; {new Date().getFullYear()} Big Thicket Lawn Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
