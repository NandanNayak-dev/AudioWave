const TopArtists = ({
  image,
  menuName,
  menuIcon1,
  menuIcon2,
  heading,
  subHeading,
  buttonText,
  buttonImage,
}) => {
  return (
    <div className='relative w-full flex-1 min-h-[420px] flex flex-col p-8 lg:p-10 bg-black/60 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10'>
      
      {/* Top: Badges and Arrow */}
      <div className='flex justify-between items-start w-full relative z-10'>
        <div className='flex gap-3 text-sm font-bold opacity-90 text-white'>
          <button className='rounded-3xl border-2 border-white/40 px-5 py-2 hover:bg-white hover:text-black transition-colors'>
            {menuName}
          </button>
          <button className='rounded-full border-2 border-white/40 p-2.5 hover:bg-white hover:text-black transition-colors flex items-center justify-center'>
            {menuIcon1}
          </button>
        </div>
        <button className='text-3xl p-4 rounded-full border-2 border-white/40 text-white hover:bg-white hover:text-black transition-colors shadow-lg'>
          {menuIcon2}
        </button>
      </div>

      {/* Middle: Artist Visual */}
      <div className='flex-1 flex items-center justify-center relative w-full my-10'>
        {image && (
          <div className='relative flex items-center transform transition-transform duration-500 hover:scale-105'>
            <img
              className='w-32 h-32 lg:w-44 lg:h-44 rounded-full object-cover relative z-10 shadow-2xl border-4 border-gray-900 animate-[spin_20s_linear_infinite] hover:[animation-play-state:paused]'
              src={image}
              alt='Top Artist'
            />
            <div className='w-16 h-16 lg:w-20 lg:h-20 rounded-r-full bg-yellow-400 -ml-10 shadow-lg' />
          </div>
        )}
      </div>

      {/* Lower: EXPLORE and Waveform */}
      <div className='flex items-center gap-4 mb-8 z-10 flex-wrap'>
        <button className='rounded-3xl text-sm font-bold border-2 border-white/40 text-white px-8 py-3 hover:bg-white hover:text-black transition-colors shadow-md'>
          {buttonText}
        </button>
        {buttonImage && (
          <img
            src={buttonImage}
            className='h-12 w-36 object-cover rounded-full border border-white/20 opacity-80 p-2 mix-blend-screen bg-white/5'
            alt='Waveform preview'
          />
        )}
      </div>

      {/* Bottom: Texts */}
      <div className='flex flex-col gap-3 relative z-10'>
        <h1 className='text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md'>
          {heading}
        </h1>
        <p className='text-sm font-medium text-white opacity-80 leading-relaxed max-w-[280px]'>
          {subHeading}
        </p>
      </div>

    </div>
  )
}

export default TopArtists
