import { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdGraphicEq } from 'react-icons/md'
const LogoContainer = lazy(() => import('./LogoContainer'))
const MainLogo = lazy(() => import('./MainLogo'))

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className='w-full bg-[#0a0a0a]/60 backdrop-blur-xl px-4 lg:px-12 py-4 flex items-center justify-between border-b border-white/10 z-50'>
      <div className='hidden lg:flex gap-4 w-1/3 items-center'>
        <LogoContainer text='Audio Wave' Icon={MdGraphicEq} />
      </div>
      
      {/* Center Logo */}
      <div className='flex justify-start lg:justify-center w-auto lg:w-1/3 items-center'>
        <MainLogo text='AudioWave' />
      </div>

      {/* Right side */}
      <div className='flex justify-end w-auto lg:w-1/3 items-center'>
        <LogoContainer
          text='Login'
          whiteBg='true'
          navigation={(location) => navigate(location)}
        />
      </div>
    </header>
  )
}

export default Header
