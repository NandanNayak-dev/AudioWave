import tw from 'twin.macro'
import styled from 'styled-components'
import { RiLoginCircleFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const HeadingText = styled.span`
  ${tw`drop-shadow-2xl text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight block`}
  font-family: 'Inter', sans-serif;
  letter-spacing: -1px;
`

const SubHeading = styled.div`
  ${tw`drop-shadow-xl text-lg font-medium opacity-80 mt-6 text-gray-200 leading-relaxed max-w-xl`}
`

const Bottom = () => {
  const navigate = useNavigate()
  return (
    <section className='relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 z-10'>
      
      {/* Top Logo + Tagline */}
      <div className='flex items-center gap-4 pointer-events-none select-none mb-16 lg:mb-24 lg:justify-end'>
        <div className='flex items-center drop-shadow-xl'>
          <div className='w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-yellow-400' />
          <div className='w-4 lg:w-6 h-10 lg:h-12 rounded-r-full bg-[#dad4f1] -ml-2' />
          <div className='w-4 lg:w-6 h-10 lg:h-12 rounded-r-full bg-[#dad4f1] -ml-2' />
        </div>
        <div className='font-semibold text-lg lg:text-xl text-white opacity-95 leading-tight drop-shadow-md'>
          Access to millions of songs <br /> on <b className='text-yellow-400'>your fingertips...</b>
        </div>
      </div>

      {/* Main Composition Container */}
      <div className='flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8'>
        
        {/* Left Side: Headings & Text */}
        <div className='flex flex-col w-full lg:w-1/2 order-2 lg:order-1 relative z-20'>
          <div className='mb-12'>
            <HeadingText>
              A OpenSource AI alternative <br /> for all your needs
            </HeadingText>
            <SubHeading>
              Create personalized playlists and find music you love, anytime,
              anywhere, on all your devices - <b className='text-white opacity-100'>Exclusively for you.</b>
            </SubHeading>
          </div>

          <button
            onClick={() => navigate('/auth')}
            className='group flex items-center justify-center gap-3 w-56 bg-white border-2 border-transparent rounded-full text-black text-md font-bold py-4 px-6 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:-translate-y-1'
          >
            <span className='tracking-wide mt-0.5'>START NOW</span>
            <RiLoginCircleFill className='transform group-hover:translate-x-1 transition-transform duration-300' size={26} />
          </button>
        </div>

        {/* Right Side: Visual Composition */}
        <div className='flex flex-col sm:flex-row lg:flex-row items-center justify-center gap-6 lg:gap-4 xl:gap-8 w-full lg:w-1/2 order-1 lg:order-2 pointer-events-none select-none relative z-10'>
          
          <img
            src='/icons/cinematic_listener.jpg'
            className='w-full sm:w-48 lg:w-44 xl:w-56 h-64 lg:h-72 xl:h-80 object-cover rounded-[3rem] lg:rounded-t-[100px] lg:rounded-b-[50px] shadow-2xl border-4 border-white/5'
            alt='Cinematic Listener'
          />
          
          <div className='hidden lg:block w-20 xl:w-28 h-64 xl:h-80 rounded-t-[100px] rounded-b-[50px] bg-gradient-to-r from-purple-500/80 to-yellow-400/80 shadow-lg backdrop-blur-sm' />
          
          <img
            src='/icons/neon_dj.jpg'
            className='w-full sm:w-56 lg:w-52 xl:w-64 h-72 lg:h-80 xl:h-96 object-cover rounded-[4rem] lg:rounded-[100px] lg:mt-20 shadow-2xl border-4 border-white/5'
            alt='Neon DJ Studio'
          />
          
          <div className='hidden lg:block w-20 xl:w-28 h-40 xl:h-48 rounded-full bg-gradient-to-l from-purple-500/80 to-yellow-400/80 shadow-xl backdrop-blur-sm lg:mt-32' />
          
        </div>

      </div>
    </section>
  )
}

export default Bottom
