import { MowerTreeIcon } from "./icons/MowerTree"

export const HeaderMower = () => {
    return (<div className="flex items-center relative">
        <div>
            <MowerTreeIcon className="w-12 h-12 fill-white absolute top-[6px] left-[-45px]" />
        </div>
        <div className="flex flex-col gap-0 items-center">
            <span className="font-decorative text-xl">BIG THICKET</span>
            <span className="font-main text-xs tracking-wide">LAWN SERVICES</span>
        </div>
    </div>)
}

export const FooterMower = () => {
    return (<div className="flex items-center relative">
        <div className="flex flex-col gap-0 items-center">
            <span className="font-decorative text-xl">BIG THICKET</span>
            <span className="font-main text-xs tracking-wide">LAWN SERVICES</span>
        </div>
        <div>
            <MowerTreeIcon className="w-12 h-12 fill-white absolute top-[6px] left-[-45px]" />
        </div>
    </div>)
}