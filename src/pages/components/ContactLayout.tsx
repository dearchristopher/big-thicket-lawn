export const ContactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div id="contact" className="bg-yellow-50 py-16 px-4">
            <div className="max-w-6xl mx-auto flex justify-center">
                <div className="flex items-center gap-2">
                    {children}
                </div>
            </div>
        </div>
    )
}