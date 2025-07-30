import { Mower } from "../../components/icons"
import { Broom } from "../../components/icons/Broom"
import { Bush } from "../../components/icons/Bush"
import { Shears } from "../../components/icons/Shears"

export const Services = () => {
    return (

        <div id="services" className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-1 bg-orange-500 w-24"></div>
                        <h2 className="text-4xl font-bold text-green-700 font-futura">OUR SERVICES</h2>
                        <div className="h-1 bg-orange-500 w-24"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 pb-2">
                            <span className="text-4xl"><Mower className='h-14 w-14 fill-green-100' /></span>
                        </div>
                        <h3 className="text-xl font-bold text-red-600 mb-2">Mowing</h3>
                    </div>

                    <div className="text-center">
                        <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl"><Shears className='h-12 w-12 fill-green-100' /></span>
                        </div>
                        <h3 className="text-xl font-bold text-red-600 mb-2">Edging & Trimming</h3>
                    </div>

                    <div className="text-center">
                        <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl"><Broom className='h-12 w-12 fill-green-100' /></span>
                        </div>
                        <h3 className="text-xl font-bold text-red-600 mb-2">Mulch & Cleanups</h3>
                    </div>

                    <div className="text-center">
                        <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl"><Bush className='h-12 w-12 fill-green-100' /></span>
                        </div>
                        <h3 className="text-xl font-bold text-red-600 mb-2">Bush Shaping</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}