import { lazy } from 'react'
import Header from '../header/Header'
const Homepage = lazy(() => import('../homepage/Homepage'))
const Search = lazy(() => import('../searchMenu/Search'))
const Playlist = lazy(() => import('../routeTypes/Playlist'))
const Track = lazy(() => import('../routeTypes/Track'))
const Album = lazy(() => import('../routeTypes/Album'))
const Artist = lazy(() => import('../routeTypes/Artist'))
const RecentlyPlayed = lazy(() => import('../routeTypes/RecentlyPlayed'))
const Discography = lazy(() => import('../routeTypes/components/Discography'))
const LikedSongs = lazy(() => import('../routeTypes/LikedSongs'))
const Playlists = lazy(() => import('../routeTypes/Playlists'))

const MainScreen = ({ showMenu, onOpenArtistsPanel }) => {
  return (
    <div className='w-full h-full overflow-y-auto overflow-x-hidden bg-[#121212] relative pb-24 lg:pb-8'>
      <div className='sticky top-0 z-40 w-full bg-[#121212]/95 backdrop-blur-md pt-5 pb-3 px-6 shadow-sm'>
        <Header onOpenArtistsPanel={onOpenArtistsPanel} />
      </div>
      <div className='px-6'>
        {showMenu === 'search' && <Search />}
        {showMenu === 'home' && <Homepage />}
        {showMenu === 'playlist' && <Playlist />}
        {showMenu === 'track' && <Track />}
        {showMenu === 'album' && <Album />}
        {showMenu === 'artist' && <Artist />}
        {showMenu === 'artist-discography' && <Discography />}
        {showMenu === 'recently-played' && <RecentlyPlayed />}
        {showMenu === 'liked' && <LikedSongs />}
        {showMenu === 'playlists' && <Playlists />}
      </div>
    </div>
  )
}

export default MainScreen
