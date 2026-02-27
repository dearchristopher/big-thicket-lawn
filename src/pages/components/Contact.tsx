import { Mail, Phone } from "lucide-react"
import { useSiteSettings } from '../../hooks/useSanity'

export const Contact = () => {
    const { data: settings } = useSiteSettings()

    const phone = settings?.phoneNumber || '(409) 719-3979'
    const email = settings?.emailAddress || 'info@bigthicketlawn.com'
    
    const title = settings?.contactTitle || 'GET IN TOUCH'
    const subtitle = settings?.contactSubtitle || 'Ready to chat?'
    const description = settings?.contactDescription || "We're here to help with all your lawn care needs!"
    const callButtonText = settings?.contactCallButtonText || 'Call Us'
    const emailButtonText = settings?.contactEmailButtonText || 'Email Us'
    const footer = settings?.contactFooter || 'Family-owned & operated in Southeast Texas'

    const btnCls = 'flex items-center gap-8 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md transform hover:scale-102'

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 flex flex-col items-center h-fit border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent font-main">{title}</h3>
            </div>

            <div className="w-full">
                <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4 font-semibold">{subtitle}</p>
                    <p className="text-gray-600">{description}</p>
                </div>

                <div className="w-full space-y-4">
                    <div onClick={() => window.location.href = `tel:${phone.replace(/\D/g, '')}`} className={btnCls}>
                        <div className="text-green-700 text-2xl"><Phone className='h-6 w-6' /></div>
                        <div className='grid grid-cols-[auto_auto] gap-2 items-center'>
                            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">{callButtonText}</p>
                            <a
                                href={`tel:${phone.replace(/\D/g, '')}`}
                                className="text-lg font-bold text-green-700 hover:text-green-800 transition-colors font-main"
                            >
                                {phone}
                            </a>
                        </div>
                    </div>

                    <div onClick={() => window.location.href = `mailto:${email}`} className={btnCls}>
                        <div className="text-green-700 text-2xl"><Mail className='h-6 w-6' /></div>
                        <div className='grid grid-cols-[auto_auto] items-center'>
                            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">{emailButtonText}</p>
                            <a
                                href={`mailto:${email}`}
                                className="text-lg font-bold text-green-700 hover:text-green-800 transition-colors font-main break-all"
                            >
                                {email}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-semibold">
                        {footer}
                    </p>
                </div>
            </div>
        </div>)
}
