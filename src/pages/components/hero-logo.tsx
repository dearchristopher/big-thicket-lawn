import { Mower, PineTreeIcon } from "../../components/icons"
import { useState, useEffect } from "react";

export const HeroLogo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const [showBars, setShowBars] = useState(false);
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        // Stagger the animations
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
        <h1 className="text-9xl font-bold mb-4 tracking-wider font-stable">
            <span
                className={`font-decorative tracking-tighter flex flex-col items-center pb-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}
                style={{ lineHeight: '95px' }}
            >
                <p>BIG</p>
                <p>THICKET</p>
            </span>
            <div className='relative'>
                <div className="absolute top-0 right-0" >
                    <Mower
                        className={`w-72 h-72 fill-green-900 absolute left-[-170px] top-[-135px] transition-all duration-700 ease-out ${showIcons ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'}`}
                    />
                    <PineTreeIcon
                        className={`w-46 h-46 fill-green-900 absolute top-[-30px] right-[320px] transition-all duration-700 ease-out ${showIcons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
                    />
                    <PineTreeIcon
                        className={`w-52 h-52 fill-green-900 absolute top-[-55px] right-[365px] transition-all duration-700 ease-out ${showIcons ? 'opacity-100 transform translate-y-0 delay-200' : 'opacity-0 transform translate-y-10'}`}
                    />
                </div>
                <div className="flex flex-col items-center gap-[4px] mb-6 w-full">
                    {['bg-red-600', 'bg-orange-400', 'bg-yellow-400', 'bg-teal-700', 'bg-green-900'].map((color, index) => (
                        <div
                            key={color}
                            className={`h-8 rounded-full ${color} transition-all duration-500 ease-out ${showBars ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        ></div>
                    ))}
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span
                        className={`text-6xl font-main tracking-tight transition-all duration-700 ease-out ${showTitle ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
                    >
                        LAWN SERVICES
                    </span>
                </div>
            </div>
        </h1>
    )
}