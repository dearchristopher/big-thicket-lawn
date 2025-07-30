export const Bar = ({ color }: { color: string }) => {
    return (
        <div className={`h-2 opacity-100 bg-${color} rounded-full w-full`}></div>
    )
}