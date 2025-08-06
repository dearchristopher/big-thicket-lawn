import { Mail, Phone } from "lucide-react"

export const Contact = () => {

    const btnCls = 'flex items-center gap-8 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer'

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center h-fit">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-red-600 font-main">GET IN TOUCH</h3>
            </div>

            <div className="w-full">
                <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4 font-semibold">Ready to chat?</p>
                    <p className="text-gray-600">We're here to help with all your lawn care needs!</p>
                </div>

                <div className="w-full space-y-4">
                    <div onClick={() => window.location.href = "tel:14097193979"} className={btnCls}>
                        <div className="text-green-700 text-2xl"><Phone className='h-6 w-6' /></div>
                        <div className='grid grid-cols-[auto_auto] gap-2 items-center'>
                            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Call Us</p>
                            <a
                                href="tel:14097193979"
                                className="text-lg font-bold text-green-700 hover:text-green-800 transition-colors font-main"
                            >
                                (409)719-3979
                            </a>
                        </div>
                    </div>

                    <div onClick={() => window.location.href = "mailto:contact@bigthicketlawn.com"} className={btnCls}>
                        <div className="text-green-700 text-2xl"><Mail className='h-6 w-6' /></div>
                        <div className='grid grid-cols-[auto auto] items-center'>
                            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Email Us</p>
                            <a
                                href="mailto:contact@bigthicketlawn.com"
                                className="text-lg font-bold text-green-700 hover:text-green-800 transition-colors font-main break-all"
                            >
                                contact@bigthicketlawn.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-semibold">
                        Family-owned & operated in Southeast Texas
                    </p>
                </div>
            </div>
        </div>)
}