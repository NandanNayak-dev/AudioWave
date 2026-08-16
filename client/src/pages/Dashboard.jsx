import { lazy, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
const MainScreen = lazy(
  () => import('../components/dashboard/mainScreen/MainScreen')
)
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))
const MenuBar = lazy(() => import('../components/dashboard/menuBar/MenuBar'))
const ArtistsScreen = lazy(
  () => import('../components/dashboard/artistsScreen/ArtistsScreen')
)

const Container = styled.div`
  ${tw`overflow-hidden bg-black text-white w-screen min-h-screen`}
`

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState('home')
  const [showArtistsPanel, setShowArtistsPanel] = useState(false)
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const location = useLocation()
  let currentPath = location.pathname
  let { query, id } = useParams()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
    }
  }, [userId])

  useEffect(() => {
    switch (true) {
      case currentPath === '/dashboard':
        setShowMenu('home')
        break
      case currentPath === '/dashboard/recently-played':
        setShowMenu('recently-played')
        break
      case currentPath === '/dashboard/liked':
        setShowMenu('liked')
        break
      case currentPath === '/dashboard/playlists':
        setShowMenu('playlists')
        break
      case currentPath === `/dashboard/artist/${id}/discography`:
        setShowMenu('artist-discography')
        break
      case currentPath === '/dashboard/search' ||
        (query && currentPath.startsWith('/dashboard/search/')):
        setShowMenu('search')
        break
      case currentPath.startsWith('/dashboard/track/') ||
        (query && currentPath.startsWith('/dashboard/track/')):
        setShowMenu('track')
        break
      case currentPath.startsWith('/dashboard/playlist/') ||
        (query && currentPath.startsWith('/dashboard/playlist/')):
        setShowMenu('playlist')
        break
      case currentPath.startsWith('/dashboard/album/') ||
        (query && currentPath.startsWith('/dashboard/album/')):
        setShowMenu('album')
        break
      case currentPath.startsWith('/dashboard/artist/') ||
        (query && currentPath.startsWith('/dashboard/artist/')):
        setShowMenu('artist')
        break
      default:
        setShowMenu('home')
        break
    }
  }, [currentPath, query, id])

  return (
    <Container>
      {/* Strict full-screen container with no scrolling */}
      <div className='flex flex-col h-screen w-screen overflow-hidden bg-black pb-20 lg:pb-0'>
        
        {/* Top Section: Sidebar | Main | Right Panel */}
        <div className='flex flex-1 min-h-0 w-full overflow-hidden'>
          
          {/* Left Sidebar */}
          <div className='hidden lg:block w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-white/5'>
            <MenuBar />
          </div>

          {/* Main Content Area */}
          <div className='flex-1 flex flex-col min-w-0 bg-[#121212] overflow-hidden relative'>
            <MainScreen
              showMenu={showMenu}
              onOpenArtistsPanel={() => setShowArtistsPanel(true)}
            />
          </div>

          {/* Right Panel */}
          <div className={`${!showArtistsPanel ? 'hidden' : ''} xl:block xl:w-80 xl:flex-shrink-0 xl:bg-[#0a0a0a] xl:border-l xl:border-white/5 xl:overflow-y-auto`}>
            <ArtistsScreen
              isOpen={showArtistsPanel}
              onClose={() => setShowArtistsPanel(false)}
            />
          </div>

        </div>

        {/* Bottom Player Area */}
        <div className='h-24 w-full flex-shrink-0 bg-[#181818] border-t border-white/10 z-50'>
          <Playback onOpenArtistsPanel={() => setShowArtistsPanel(true)} />
        </div>

        {/* Mobile Navigation (Will be handled inside MenuBar for small screens if needed) */}
        <div className='lg:hidden'>
          <MenuBar />
        </div>

      </div>
    </Container>
  )
}

export default Dashboard
