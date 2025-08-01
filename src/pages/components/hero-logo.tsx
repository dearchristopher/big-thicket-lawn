
import { useState, useEffect } from "react";
import { MowerTreeIcon } from "../../components/icons/MowerTree";
import { textShadow } from "../utils/text-classes";

export const HeroLogo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const [showBars, setShowBars] = useState(false);
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setIsVisible(true), 100);
        const timer2 = setTimeout(() => setShowIcons(true), 800);
        const timer3 = setTimeout(() => setShowBars(true), 100);
        const timer4 = setTimeout(() => setShowTitle(true), 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <h1 className="text-7xl lg:text-9xl font-bold mb-4 tracking-wider font-stable">
            <span
                className={`font-decorative tracking-tighter flex flex-col items-center pb-2 transition-all duration-700 ease-out leading-[55px] sm:leading-[60px] lg:leading-[95px] ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}
            >
                <p className={textShadow}>BIG</p>
                <p className={textShadow}>THICKET</p>
            </span>
            <div className='relative w-full'>
                <div className="pb-1">
                    <div className="flex flex-col gap-[2px] sm:gap-[3px] lg:gap-1 w-full px-2 sm:px-8 lg:px-12">
                        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-8 lg:px-12 z-10 top-[-25px]">
                            <MowerTreeIcon className={`h-32 sm:h-42 lg:h-48 xl:h-54 fill-green-900 stroke-white stroke-[10px] transition-all duration-700 ease-out ${showIcons ? 'opacity-100' : 'opacity-0 translate-y-2'}`} />
                        </div>
                        {['bg-red-900', 'bg-orange-700', 'bg-yellow-400', 'bg-green-700', 'bg-green-900'].map((color, index) => (
                            <div
                                key={color}
                                className={`h-3 sm:h-4 lg:h-5 xl:h-6 rounded-full ${color} transition-all duration-500 ease-out ${showBars ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1 px-4 sm:px-0">
                    <span
                        className={`text-3xl sm:text-4xl lg:text-6xl font-main tracking-tight transition-all duration-700 ease-out text-center ${textShadow} ${showTitle ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
                    >
                        LAWN SERVICES
                    </span>
                </div>
            </div>
        </h1>
    )
}