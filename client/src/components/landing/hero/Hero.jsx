import { lazy } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { GoArrowUpRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
const Player = lazy(() => import('./Player'))
const ArrowDesign = lazy(() => import('./ArrowDesign'))

const Heading = styled.h1`
  ${tw`hidden lg:block drop-shadow-xl text-white text-5xl lg:text-6xl xl:text-8xl font-black opacity-90 tracking-tighter leading-[1.1]`}
  font-family: 'Inter', sans-serif;
`
const HeadingMobile = styled.h1`
  ${tw`lg:hidden drop-shadow-xl text-white text-5xl font-black opacity-90 tracking-tighter leading-tight`}
  font-family: 'Inter', sans-serif;
`

const SubHeading = styled.p`
  ${tw`hidden lg:block text-gray-200 text-lg font-medium opacity-90 max-w-md mt-8 mb-10 leading-relaxed`}
`
const Button = styled.button`
  ${tw`flex items-center justify-center gap-2 px-8 h-14 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95`}
`

const Hero = ({ apiResponse }) => {
  const navigate = useNavigate()
  return (
    <div className='min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-16 w-full items-center pt-10 pb-20 lg:pt-0 lg:pb-0 gap-10 lg:gap-0'>
      
      {/* Left Column: Typography & CTA */}
      <div className='flex flex-col justify-center h-full pt-10 lg:pt-0'>
        <div className='w-full'>
          <ArrowDesign />
          <div className='mt-6 lg:mt-8'>
            <Heading>LIVE YOUR DAY<br/>WITH MUSIC</Heading>
            <HeadingMobile>LIVE YOUR DAY<br/>WITH MUSIC</HeadingMobile>
          </div>
          <SubHeading>
            Make your day more lively with a variety of music that suits your
            mood, and get premium-like features at no cost.
          </SubHeading>
        </div>
        
        {/* Mobile Player & Image */}
        <div className='block lg:hidden w-full max-w-[320px] my-10 mx-auto flex flex-col items-center gap-6'>
          <img
            className='w-full aspect-square object-cover rounded-3xl drop-shadow-2xl pointer-events-none select-none'
            src='/icons/hero_person.png'
            alt='Person enjoying music'
          />
          <div className='w-full flex justify-center z-10 scale-95'>
            <Player apiResponse={apiResponse} />
          </div>
        </div>
        
        <div className='flex w-full mt-8 lg:mt-4 justify-center lg:justify-start'>
          <Button onClick={() => navigate('/auth')} className='bg-black text-white shadow-xl hover:shadow-2xl hover:bg-gray-900'>
            TRY FOR FREE <GoArrowUpRight size={24} />
          </Button>
        </div>
      </div>
      
      {/* Right Column: Visuals & Desktop Player */}
      <div className='hidden lg:flex justify-center lg:justify-end items-center w-full h-full relative xl:pr-20'>
        <div className='relative w-[350px] xl:w-[450px] aspect-square transition-transform hover:scale-[1.02] duration-500'>
          <img 
            className='w-full h-full object-cover rounded-[2rem] drop-shadow-2xl pointer-events-none select-none border border-gray-100' 
            src='/icons/hero_person.png' 
            alt='Person enjoying music' 
          />
          {/* Floating Player */}
          <div className='absolute -bottom-8 -right-8 xl:-right-16 z-10 origin-bottom-right lg:scale-[0.85] xl:scale-100'>
            <Player apiResponse={apiResponse} />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Hero
