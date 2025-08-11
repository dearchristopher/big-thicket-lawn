import { Link } from "react-router-dom";
import { FooterMower } from "./HeaderMower";
import { MowerTreeIcon } from "./icons/MowerTree";
import { Heart, Mail, Phone, TreeDeciduous } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white py-8 md:py-12 px-4 md:px-8 shadow-2xl">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:justify-center">
                    <div className="flex flex-col items-center md:items-start">
                        <Link to="/" className="mb-4 w-full">
                            <FooterMower />
                        </Link>
                        <p className="text-green-200 text-sm mt-2 text-center md:text-left max-w-64">
                            Professional lawn care services in Southeast Texas
                        </p>
                    </div>

                    <div className='hidden'>
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
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-4 font-decorative">Contact Us</h3>
                        <div className="space-y-2">
                            <p className="flex items-center justify-center md:justify-start gap-2">
                                <span className="text-green-300"><Phone className='h-3 w-3  ' /></span>
                                <a href="tel:14097193979" className="text-green-200 hover:text-white transition-colors">
                                    (409) 719-3979
                                </a>
                            </p>
                            <p className="flex items-center justify-center md:justify-start gap-2">
                                <span className="text-green-300"><Mail className='h-3 w-3 ' /></span>
                                <a href="mailto:contact@bigthicketlawn.com" className="text-green-200 hover:text-white transition-colors">
                                    contact@bigthicketlawn.com
                                </a>
                            </p>
                            <p className="flex items-center justify-center md:justify-start gap-2">
                                <span className="text-green-300"><TreeDeciduous className='h-3 w-3' /></span>
                                <span className="text-green-200">Lumberton, TX</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-green-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-green-300 text-sm flex flex-col items-center">
                    <div className="flex relative mb-2">
                        <MowerTreeIcon className="w-10 h-10 md:w-12 md:h-12 fill-green-300" />
                        <Heart className="w-3 h-3 md:w-4 md:h-4 fill-red-400 absolute top-[20px] md:top-[24px] right-[-12px] md:right-[-14px] stroke-transparent" />
                    </div>
                    <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} Big Thicket Lawn Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
