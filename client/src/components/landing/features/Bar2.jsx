import { FaNodeJs } from 'react-icons/fa6'
import { RiReactjsLine } from 'react-icons/ri'
import { SiTailwindcss, SiMongodb } from 'react-icons/si'

const Bar2 = () => {
  return (
    <div className='flex items-center justify-between text-center text-xs lg:text-sm font-medium lg:font-bold text-white w-full max-w-[420px] mx-auto px-4 lg:px-6 h-16 lg:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl'>
      <div className='flex items-center gap-1 shrink-0'>
        <RiReactjsLine size={36} className='hover:animate-spin text-[#17b2b3] transition-colors cursor-pointer' />
        <SiMongodb size={36} className='hover:animate-spin text-[#00694a] transition-colors cursor-pointer' />
      </div>
      <div className='mx-3 flex-1 leading-tight tracking-wide opacity-90 font-sans'>
        Discover Your Sound with Cutting-Edge Technologies
      </div>
      <div className='flex items-center gap-1.5 shrink-0'>
        <FaNodeJs size={32} className='hover:animate-spin text-[#00694a] transition-colors cursor-pointer' />
        <SiTailwindcss size={32} className='hover:animate-spin text-[#17b2b3] transition-colors cursor-pointer' />
      </div>
    </div>
  )
}

export default Bar2
