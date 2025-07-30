import { Mower, PineTreeIcon } from "./icons"

export const HeaderMower = () => {
    return (<div className="flex items-center gap-2 relative">
        <div>
            <PineTreeIcon className="w-8 h-8 fill-white absolute top-[8px] left-[-40px]" />
            <Mower className="w-12 h-12 fill-white absolute top-0 left-[-40px]" />
        </div>
        <div className="flex flex-col gap-0 items-center">
            <span className="font-decorative text-xl">BIG THICKET</span>
            <span className="font-main text-xs tracking-wide">LAWN SERVICES</span>
        </div>
    </div>)
}