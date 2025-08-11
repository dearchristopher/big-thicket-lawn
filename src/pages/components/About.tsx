import { TreesIcon } from "lucide-react"

export const About = () => {
    return (
        <div id="about" className="bg-yellow-50 py-16 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-green-700 text-4xl"><TreesIcon className='h-12 w-12' /></div>
                            <h2 className="text-4xl font-bold text-red-600 font-futura">ABOUT US</h2>
                        </div>
                        <div className="space-y-4 text-lg text-gray-700">
                            <p>
                                We're a local family-owned business offering reliable, affordable lawn care with attention to detail.
                            </p>
                            <p className="font-semibold text-xl text-green-700">
                                Serving Southeast Texas with pride.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4"><img src="/images/terrytodd.jpg" alt="Big Thicket Lawn Services - Owners" className="rounded" /></div>
                                <p className="text-sm text-gray-600">Family-owned & operated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}