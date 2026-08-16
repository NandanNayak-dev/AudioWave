import React from 'react'

const AuthVisuals = () => {
  return (
    <div className='relative w-full h-full max-h-[800px] flex items-center justify-center pointer-events-none select-none'>
      
      {/* Decorative Outer Glow */}
      <div className='absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-500/20 rounded-[2.5rem] blur-2xl transform scale-95' />
      
      {/* Main Image Container */}
      <div className='relative w-full h-full max-w-2xl max-h-[90%] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10'>
        <img 
          src='/icons/premium_auth_image.jpg' 
          alt='Premium Music Experience' 
          className='w-full h-full object-cover'
        />
        
        {/* Inner Gradient Overlay for depth */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent' />
      </div>

      {/* Floating Glass Card (NOW PLAYING) */}
      <div className='absolute bottom-4 lg:bottom-20 left-4 lg:-left-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]'>
        <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 shadow-inner' />
        <div>
          <p className='text-[10px] text-cyan-400 font-bold tracking-widest mb-1'>NOW PLAYING</p>
          <p className='text-sm text-white font-bold leading-none mb-1'>Night Vibes</p>
          <p className='text-xs text-gray-400 mb-2'>Vinyl Soul</p>
          <div className='flex items-center gap-2'>
            <div className='w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent' />
            <div className='w-24 h-1 bg-white/20 rounded-full overflow-hidden'>
              <div className='w-1/3 h-full bg-cyan-400 rounded-full' />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className='absolute top-10 lg:top-20 right-4 lg:right-10 w-16 h-16 bg-purple-500/10 backdrop-blur-md rounded-full border border-purple-500/20 flex items-center justify-center animate-[float_8s_ease-in-out_infinite_reverse]'>
        <div className='flex gap-[2px] items-end h-6'>
          <div className='w-1 h-3 bg-purple-400 rounded-full animate-pulse' />
          <div className='w-1 h-5 bg-purple-400 rounded-full animate-pulse delay-75' />
          <div className='w-1 h-2 bg-purple-400 rounded-full animate-pulse delay-150' />
          <div className='w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-200' />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  )
}

export default AuthVisuals
