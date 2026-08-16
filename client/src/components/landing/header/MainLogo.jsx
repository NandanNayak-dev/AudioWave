import { CiSearch, CiMicrophoneOn } from 'react-icons/ci'

const MainLogo = () => {
  return (
    <div className='flex items-center justify-between bg-[#dad4f1] text-black w-64 lg:w-96 h-12 rounded-full px-5 group cursor-text transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] border border-transparent'>
      <div className='flex items-center gap-3 opacity-70'>
        <CiSearch size={22} className='text-gray-900 font-bold' />
        <span className='text-sm font-semibold tracking-wide'>Search your music...</span>
      </div>
      <div className='w-8 h-8 rounded-full bg-white/50 flex items-center justify-center cursor-pointer hover:bg-white/80 transition-colors drop-shadow-sm'>
        <CiMicrophoneOn size={18} className='text-gray-900 font-bold' />
      </div>
    </div>
  )
}

export default MainLogo
