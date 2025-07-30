export const ContactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div id="contact" className="bg-yellow-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {children}
                </div>
            </div>
        </div>
    )
}