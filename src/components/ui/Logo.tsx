
import Image from 'next/image';

export default function Logo() {
    return (
        <div className='flex gap-1 items-center'> 
            <Image src="/pineapple.svg" width={64} height={64} alt='pineapple' className='max-lg:w-14 h-auto max-sm:w-13 max-[480px]:!w-11'/>
            <div className='text-nowrap'>
                <div className="uppercase text-lg font-medium max-lg:text-base max-sm:text-sm max-[480px]:!text-xs ">phu quoc</div>
                <div className="uppercase text-sm text-accent font-bold max-lg:text-xs max-sm:text-[10px] max-[480px]:!text-[9px]">exchange</div>
            </div>
        </div>
    )
}