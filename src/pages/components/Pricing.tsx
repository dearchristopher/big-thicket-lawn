import { useEstimateModal } from '../../hooks/useEstimateModal';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Pricing = () => {
    const { openEstimateModal } = useEstimateModal();
    const isMobile = useIsMobile();

    const pricingTiers = [
        {
            size: "1/4 Acre",
            price: 55,
            description: "Compact properties",
            features: ["Professional Mowing", "Precise Edging", "Detail Trimming", "Cleanup"],
            popular: false
        },
        {
            size: "1/3 Acre",
            price: 65,
            description: "Standard residential lots",
            features: ["Professional Mowing", "Precise Edging", "Detail Trimming", "Cleanup"],
            popular: true
        },
        {
            size: "1/2 Acre",
            price: 75,
            description: "Spacious properties",
            features: ["Professional Mowing", "Precise Edging", "Detail Trimming", "Cleanup"],
            popular: false
        },
        {
            size: "Full Acre",
            price: 95,
            description: "Large estate properties",
            features: ["Professional Mowing", "Precise Edging", "Detail Trimming", "Cleanup"],
            popular: false
        }
    ];

    return (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-8">
            {/* Header */}
            <div className="text-center mb-6 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-main mb-2">
                    SERVICE PRICING
                </h2>
                <p className="text-xs md:text-sm text-gray-600 font-main px-2">
                    Top quality service at a price that makes sense
                </p>
                {/* <div className="mt-3 md:mt-4 inline-block bg-red-600 text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold">
                    ✨ New Customer Special: 10% Off First Service
                </div> */}
            </div>

            {/* Pricing Grid */}
            {isMobile ? (
                // Mobile: 2x2 Grid layout for better visibility
                <div className="grid grid-cols-2 gap-3 px-2">
                    {pricingTiers.map((tier, index) => (
                        <PricingCard key={index} tier={tier} onGetStarted={openEstimateModal} isMobile={true} />
                    ))}
                </div>
            ) : (
                // Desktop: Grid layout
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <PricingCard key={index} tier={tier} onGetStarted={openEstimateModal} isMobile={false} />
                    ))}
                </div>
            )}

            {/* Footer Note */}
            <div className="text-center mt-6 md:mt-8 text-gray-600 px-2">
                <p className="text-xs md:text-sm">
                    * Prices may vary based on terrain and specific requirements
                </p>
                <p className="text-xs md:text-sm mt-2">
                    Have a larger yard, commercial property, or need a custom quote? <span className="text-green-700 font-semibold cursor-pointer hover:underline" onClick={openEstimateModal}>Request an estimate</span> or <span className="text-green-700 font-semibold cursor-pointer hover:underline" onClick={() => window.location.href = "tel:14097193979"}>call us</span>!
                </p>
                <p className="text-xs md:text-sm mt-2 font-semibold text-green-700">
                    Free Estimates Available • No Contracts • Satisfaction Guaranteed
                </p>
            </div>
        </div>
    );
};

interface PricingTier {
    size: string;
    price: number;
    description: string;
    features: string[];
    popular: boolean;
}

const PricingCard = ({ tier, onGetStarted, isMobile }: { tier: PricingTier; onGetStarted: () => void; isMobile: boolean }) => {
    if (isMobile) {
        // Compact mobile design
        return (
            <div className={`relative bg-white rounded-xl p-3 shadow-lg h-full ${tier.popular ? 'ring-2 ring-green-400' : ''}`}>
                {/* Popular Badge */}
                {tier.popular && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-1 py-0.5 rounded-full text-xs font-bold shadow-sm">
                            ⭐
                        </div>
                    </div>
                )}

                {/* Compact Header */}
                <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-gray-800 font-main mb-1">
                        {tier.size}
                    </h3>
                    <div className="flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-green-600 font-main">
                            ${tier.price}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">
                            /service
                        </span>
                    </div>
                </div>

                {/* Compact Features */}
                <div className="mb-3">
                    <ul className="space-y-1">
                        {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-xs text-gray-600">
                                <svg className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <button className={`cursor-pointer w-full py-2 px-3 rounded-lg font-semibold text-white transition-all duration-50 text-xs ${tier.popular
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                    }`} onClick={onGetStarted}>
                    Get Started
                </button>
            </div>
        );
    }

    // Desktop design (unchanged)
    return (
        <div className={`relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-50 transform hover:-translate-y-1 md:hover:-translate-y-2 ${tier.popular ? 'ring-2 md:ring-4 ring-green-400 scale-102 md:scale-105' : 'hover:scale-102 md:hover:scale-105'
            }`}>
            {/* Popular Badge */}
            {tier.popular && (
                <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        ⭐ POPULAR
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-main mb-1 md:mb-2">
                    {tier.size}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                    {tier.description}
                </p>
                <div className="flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-green-600 font-main">
                        ${tier.price}
                    </span>
                    <span className="text-gray-500 text-xs md:text-sm ml-2">
                        /service
                    </span>
                </div>
            </div>

            {/* Features */}
            <div className="mb-4 md:mb-6">
                <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 uppercase tracking-wide">
                    Includes:
                </h4>
                <ul className="space-y-1 md:space-y-2">
                    {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs md:text-sm text-gray-600">
                            <svg className="w-3 md:w-4 h-3 md:h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <button className={`cursor-pointer w-full py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl font-semibold text-white transition-all duration-50 text-sm md:text-base ${tier.popular
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                }`} onClick={onGetStarted}>
                Get Started
            </button>
        </div>
    );
};