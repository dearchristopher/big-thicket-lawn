export const ContactLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div id="contact" className="bg-yellow-50 py-16 px-4 border-t-4 border-yellow-400">
            <div className="max-w-6xl mx-auto flex justify-center">
                <div className="w-full grid grid-cols-1 gap-6">
                    {/* md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] */}
                    {children}
                </div>
            </div>
        </div>
    )
}