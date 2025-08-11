import { useNavigate } from "react-router-dom";
import { textShadow } from "../utils/text-classes"
import { Bar } from "./bar"
import { HeroLogo } from "./hero-logo"
import { EstimateModal } from "../../components/EstimateModal";
import { useEstimateModal } from "../../hooks/useEstimateModal";
import { Pricing } from "./Pricing";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Hero = () => {
    const { isEstimateModalOpen, closeEstimateModal } = useEstimateModal();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    return (

        <div
            className="relative min-h-screen bg-cover bg-center flex items-center flex-col justify-center bg-green-900 py-8"
            style={{
                backgroundImage: "url('/images/lawn-placeholder.png')",
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)'
                }}
            ></div>
            <div className="relative text-center flex flex-col gap-4 items-center text-white px-4 z-10">
                <HeroLogo />
                <p className={`text-lg sm:text-xl md:text-2xl mb-8 font-medium font-main ${textShadow}`}>
                    Family-Owned Lawn Care in Lumberton, TX
                </p>

                <Bar color="yellow-400" className='mb-8' />

                <div className='flex flex-col mb-8 gap-1'>
                    <div className={`flex flex-wrap justify-center gap-8 text-lg ${textShadow}`}>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Mowing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Trimming</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Landscaping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Cleanups</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/quote')}
                        className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Message Us
                    </button>
                    <button onClick={() => window.location.href = !isMobile ? "#contact" : "tel:14097193979"} className="cursor-pointer hover:underline text-white  px-8 py-4 rounded-lg text-xl font-bold transition-colors drop-shadow-lg drop-shadow-gray-800">
                        Call Us
                    </button>
                </div>

                <Pricing />
            </div>



            <EstimateModal
                isOpen={isEstimateModalOpen}
                onClose={closeEstimateModal}
            />
        </div>
    )
}