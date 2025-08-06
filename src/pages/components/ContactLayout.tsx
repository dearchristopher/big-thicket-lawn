export const ContactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div id="contact" className="bg-yellow-50 py-16 px-4">
            <div className="max-w-6xl mx-auto flex justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
                    {children}
                </div>
            </div>
        </div>
    )
}