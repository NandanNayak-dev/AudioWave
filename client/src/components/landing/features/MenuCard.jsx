const MenuCard = ({
  image,
  menuName,
  menuIcon1,
  menuIcon2,
  heading,
  theme,
  subHeading,
}) => {
  const isLight = theme === 'light';
  
  return (
    <div className={`relative w-full flex-1 min-h-[420px] flex flex-col justify-between p-8 lg:p-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 ${isLight ? 'bg-black text-white' : 'bg-white/5 backdrop-blur-sm text-white'}`}>
      
      {/* Background Image handling for 'dark' theme (Center waveform card) */}
      {!isLight && image && (
        <img 
          src={image} 
          className='absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none mix-blend-screen'
          alt='' 
        />
      )}
      
      {/* Top Header */}
      <div className='flex justify-between items-start w-full relative z-10'>
        <div className='flex gap-3 text-sm font-bold opacity-90'>
          <button className={`rounded-3xl border-2 px-5 py-2 transition-colors ${isLight ? 'border-gray-500 hover:bg-white hover:text-black' : 'border-white/40 hover:bg-white hover:text-black'}`}>
            {menuName}
          </button>
          <button className={`rounded-full border-2 p-2.5 transition-colors flex items-center justify-center ${isLight ? 'border-gray-500 hover:bg-white hover:text-black' : 'border-white/40 hover:bg-white hover:text-black'}`}>
            {menuIcon1}
          </button>
        </div>
        <button className={`text-3xl p-4 rounded-full transition-colors shadow-lg ${isLight ? 'bg-white text-black hover:bg-gray-200' : 'bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black'}`}>
          {menuIcon2}
        </button>
      </div>

      {/* Middle Visual for 'light' theme (Left Card artwork) */}
      {isLight && image && (
        <div className='absolute inset-0 flex items-center justify-center z-0 pointer-events-none'>
          <div className='relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border-4 border-gray-900'>
            <img src={image} className='w-full h-full object-cover transition-opacity duration-700 opacity-60' alt='' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
          </div>
        </div>
      )}

      {/* Bottom Content */}
      <div className='flex flex-col gap-3 relative z-10 mt-auto pt-10'>
        <h1 className='text-3xl lg:text-4xl font-black max-w-[250px] leading-[1.1] drop-shadow-md tracking-tight'>
          {heading}
        </h1>
        <p className='text-sm font-medium opacity-80 max-w-[280px] leading-relaxed'>
          {subHeading}
        </p>
      </div>
    </div>
  )
}

export default MenuCard
