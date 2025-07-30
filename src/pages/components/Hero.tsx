import { textShadow } from "../utils/text-classes"
import { Bar } from "./bar"
import { HeroLogo } from "./hero-logo"

export const Hero = () => {
    return (

        <div
            className="relative h-screen bg-cover bg-center flex items-center justify-center bg-green-900"
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
            <div className="relative text-center text-white px-4 z-10">
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

                <button onClick={() => window.location.href = "#contact"} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors drop-shadow-lg drop-shadow-gray-800">
                    Contact Us
                </button>
            </div>
        </div>
    )
}