import { Mower, PineTreeIcon } from "../../components/icons"

export const HeroLogo = () => {
    return (
        <h1 className="text-9xl font-bold mb-4 tracking-wider font-stable">
            <span className="font-decorative tracking-tighter flex flex-col items-center pb-2" style={{ lineHeight: '95px' }}>
                <p>BIG</p>
                <p>THICKET</p>
            </span>
            <div className='relative'>
                <div className="absolute top-0 right-0" >
                    <Mower className="w-72 h-72 fill-green-900 absolute left-[-170px] top-[-135px]" />
                    <PineTreeIcon className="w-46 h-46 fill-green-900 absolute top-[-30px] right-[320px]" />
                    <PineTreeIcon className="w-52 h-52 fill-green-900 absolute top-[-55px] right-[365px]" />
                </div>
                <div className="flex flex-col items-center gap-[4px] mb-6 w-full">
                    <div className='h-8 rounded-full bg-red-600 w-full'></div>
                    <div className='h-8 rounded-full bg-orange-400 w-full'></div>
                    <div className='h-8 rounded-full bg-yellow-400 w-full'></div>
                    <div className='h-8 rounded-full bg-teal-700 w-full'></div>
                    <div className='h-8 rounded-full bg-green-900 w-full'></div>
                </div>
                <div className="flex flex-col items-center gap-1">

                    <span className="text-6xl font-main tracking-tight">LAWN SERVICES</span>
                </div>
            </div>
        </h1>
    )
}