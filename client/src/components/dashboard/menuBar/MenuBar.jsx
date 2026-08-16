import { useEffect, useState } from 'react'
import { MdFavorite, MdHome, MdOutlineHome, MdStar, MdOutlineStarBorder } from 'react-icons/md'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'
import { LuLibrary } from 'react-icons/lu'
import { PiPlaylistFill } from 'react-icons/pi'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import FavoriteArtistsModal from './FavoriteArtistsModal'

const MenuBar = () => {
  const [menu, changeMenu] = useState('home')
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  let { query } = useParams()
  const navigate = useNavigate()
  const localData = localStorage.getItem('following')
  const parsedData = localData ? JSON.parse(localData) : []
  const initialData = Array.isArray(parsedData) ? { data: parsedData } : parsedData
  const [following] = useRQGlobalState('following', initialData)

  function navigateArtist(id) {
    navigate(`/dashboard/artist/${id}`)
    setIsLibraryOpen(false)
  }

  //based on location
  useEffect(() => {
    if (currentPath === '/dashboard') changeMenu('home')
    if (currentPath === '/dashboard/search') changeMenu('search')
    if (query && currentPath === `/dashboard/search/${query}`) changeMenu('search')
  }, [currentPath, query])

  const isHome = menu === 'home'
  const isSearch = menu === 'search'
  const isLiked = currentPath === '/dashboard/liked'
  const isPlaylists = currentPath === '/dashboard/playlists'

  const NavItem = ({ to, icon, activeIcon, isActive, label, onClick }) => {
    const content = (
      <>
        {isActive ? activeIcon : icon}
        <span className='text-sm tracking-wide'>{label}</span>
      </>
    )
    const className = `flex items-center gap-4 px-4 py-3 rounded-lg font-bold transition-all duration-200 ${
      isActive
        ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`
    
    if (to) {
      return (
        <Link to={to} onClick={onClick} className={className}>
          {content}
        </Link>
      )
    }
    
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    )
  }

  const [isArtistsModalOpen, setIsArtistsModalOpen] = useState(false)

  return (
    <>
      {isArtistsModalOpen && (
        <FavoriteArtistsModal onClose={() => setIsArtistsModalOpen(false)} />
      )}
      {/* Desktop Sidebar */}
      <aside className='hidden lg:flex flex-col h-full w-full bg-[#0a0a0a] p-4 gap-6 select-none'>
        
        {/* Main Navigation */}
        <nav className='flex flex-col gap-2'>
          <NavItem 
            to='/dashboard' 
            icon={<MdOutlineHome size={28} />} 
            activeIcon={<MdHome size={28} />} 
            isActive={isHome} 
            label='Home' 
          />
          <NavItem 
            to='/dashboard/search' 
            icon={<RiSearchLine size={26} />} 
            activeIcon={<RiSearchFill size={26} />} 
            isActive={isSearch} 
            label='Search' 
          />
        </nav>

        {/* Library Navigation */}
        <div className='flex flex-col gap-2 bg-[#121212] rounded-xl p-2 flex-1 overflow-y-auto'>
          <NavItem 
            to='/dashboard/liked' 
            icon={<MdFavorite size={24} className='opacity-70' />} 
            activeIcon={<MdFavorite size={24} className='text-purple-500' />} 
            isActive={isLiked} 
            label='Liked Songs' 
            onClick={() => setIsLibraryOpen(false)}
          />

          <NavItem 
            to='/dashboard/playlists' 
            icon={<PiPlaylistFill size={24} className='opacity-70' />} 
            activeIcon={<PiPlaylistFill size={24} className='text-cyan-400' />} 
            isActive={isPlaylists} 
            label='Playlists' 
            onClick={() => setIsLibraryOpen(false)}
          />
          
          <NavItem 
            icon={<MdOutlineStarBorder size={24} className='opacity-70' />} 
            activeIcon={<MdStar size={24} className='text-yellow-400' />} 
            isActive={isArtistsModalOpen} 
            label='Favorite Artists' 
            onClick={() => setIsArtistsModalOpen(true)}
          />

          {/* Followed Artists list if needed */}
          {following?.data && following.data.length > 0 && (
            <div className='mt-6 px-2'>
              <h3 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>Following</h3>
              <div className='flex flex-col gap-3'>
                {following.data.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigateArtist(item?.id)}
                    className='flex items-center gap-3 text-left group'
                  >
                    <img src={item?.image} alt={item?.name} className='w-10 h-10 rounded-full object-cover group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-shadow' />
                    <span className='text-sm font-semibold text-gray-400 group-hover:text-white truncate'>
                      {item?.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className='fixed inset-x-0 bottom-0 h-20 z-50 flex items-center justify-around bg-[#0a0a0a] border-t border-white/5 pb-2 lg:hidden px-1'>
        <Link to='/dashboard' className='flex flex-col items-center gap-1 text-gray-400 hover:text-white'>
          {isHome ? <MdHome size={26} className='text-white' /> : <MdOutlineHome size={26} />}
          <span className='text-[10px] font-semibold'>Home</span>
        </Link>
        <Link to='/dashboard/search' className='flex flex-col items-center gap-1 text-gray-400 hover:text-white'>
          {isSearch ? <RiSearchFill size={26} className='text-white' /> : <RiSearchLine size={26} />}
          <span className='text-[10px] font-semibold'>Search</span>
        </Link>
        <Link to='/dashboard/liked' className='flex flex-col items-center gap-1 text-gray-400 hover:text-white'>
          {isLiked ? <MdFavorite size={26} className='text-purple-500' /> : <MdFavorite size={26} className='opacity-70' />}
          <span className='text-[10px] font-semibold'>Liked</span>
        </Link>
        <Link to='/dashboard/playlists' className='flex flex-col items-center gap-1 text-gray-400 hover:text-white'>
          {isPlaylists ? <PiPlaylistFill size={26} className='text-cyan-400' /> : <PiPlaylistFill size={26} className='opacity-70' />}
          <span className='text-[10px] font-semibold'>Playlists</span>
        </Link>
        <button onClick={() => setIsArtistsModalOpen(true)} className='flex flex-col items-center gap-1 text-gray-400 hover:text-white'>
          {isArtistsModalOpen ? <MdStar size={26} className='text-yellow-400' /> : <MdOutlineStarBorder size={26} className='opacity-70' />}
          <span className='text-[10px] font-semibold'>Artists</span>
        </button>
      </nav>
    </>
  )
}

export default MenuBar
