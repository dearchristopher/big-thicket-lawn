import { MowerTreeIcon } from "./icons/MowerTree"

export const HeaderMower = () => {
    return (<div className="flex items-center gap-2">
        <MowerTreeIcon className="w-8 h-8 sm:w-10 sm:h-10 fill-white flex-shrink-0" />
        <div className="flex flex-col gap-0">
            <span className="font-decorative text-lg sm:text-xl leading-tight">BIG THICKET</span>
            <span className="font-main text-[10px] sm:text-xs tracking-wide">LAWN SERVICES</span>
        </div>
    </div>)
}

export const FooterMower = () => {
    return (<div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-0 items-center">
            <span className="font-decorative text-xl">BIG THICKET</span>
            <span className="font-main text-xs tracking-wide">LAWN SERVICES</span>
        </div>
    </div>)
}