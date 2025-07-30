export const Bar = ({ color, className }: { color: string, className?: string }) => {
    return (
        <div className={`h-2 opacity-100 bg-${color} rounded-full w-full ${className}`}></div>
    )
}