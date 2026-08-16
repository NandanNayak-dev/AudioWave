import React, { lazy, useState } from 'react'
import { ReactLenis } from 'lenis/react'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const Header = lazy(() => import('../components/landing/header/Header'))
const Hero = lazy(() => import('../components/landing/hero/Hero.jsx'))
const Features = lazy(
  () => import('../components/landing/features/Features.jsx')
)
const Bottom = lazy(() => import('../components/landing/bottom/Bottom.jsx'))
const Footer = lazy(() => import('../components/landing/footer/Footer.jsx'))
const RightBar = lazy(
  () => import('../components/landing/rightBar/RightBar.jsx')
)

const Landing = () => {
  const [response, setApiResponse] = useState('')

  return (
    <ReactLenis root options={{ lerp: 0.15 }}>
      {/* Root container with dark background to prevent white gaps */}
      <div className='bg-[#0a0a0a] text-black min-h-screen relative overflow-x-hidden'>
        
        {/* Fixed background image covering the entire scrollable area */}
        <img
          src='/backgrounds/background.png'
          className='pointer-events-none select-none opacity-60 fixed inset-0 w-full h-full object-cover z-0'
          alt=''
        />
        
        {/* Main Content Area: Leaves space for the RightBar on Desktop */}
        <div className='relative z-10 w-full lg:pr-20'>
          <AutoNavigate location='/dashboard' />
          
          <div className='sticky top-0 z-50'>
            <Header />
          </div>
          
          <Hero apiResponse={(data) => setApiResponse(data)} />
          <Features response={response} />
          <Bottom />
          <Footer />
        </div>

        {/* Sidebar */}
        <RightBar />
      </div>
    </ReactLenis>
  )
}

export default Landing
