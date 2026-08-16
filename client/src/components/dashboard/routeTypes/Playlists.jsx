import { useState, lazy } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import PlayIcon from './components/PlayIcon'
import { FaPlus } from 'react-icons/fa6'
const Header = lazy(() => import('./components/Header'))
import SongList from './components/SongList'

const Playlists = () => {
  const [dominantColor, setDominantColor] = useState()
  const [isCreating, setIsCreating] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  
  const userName = localStorage.getItem('username')
  const customPlaylistsLocally = localStorage.getItem('customPlaylists')
  const parsedData = customPlaylistsLocally ? JSON.parse(customPlaylistsLocally) : []
  const initialData = Array.isArray(parsedData) ? { data: parsedData } : parsedData
  const [data, setData] = useRQGlobalState('customPlaylists', initialData)

  const getArray = () => {
    if (!data?.data) return []
    if (Array.isArray(data.data)) return data.data
    if (Array.isArray(data.data.data)) return data.data.data
    return []
  }
  
  const playlistsArray = getArray()

  const handleCreatePlaylist = (e) => {
    e.preventDefault()
    if (!newPlaylistName.trim()) {
      setIsCreating(false)
      return
    }

    const newPlaylist = {
      _id: Date.now().toString(),
      name: newPlaylistName.trim(),
      image: 'https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/gkgkol3qvikb8byg2x6x?_a=BAMAGSRg0',
      songs: []
    }
    const newArray = [...playlistsArray, newPlaylist]
    
    setData({ data: newArray })
    localStorage.setItem('customPlaylists', JSON.stringify(newArray))
    import('../../../api/sync').then(({ pushUserLibrary }) => {
      pushUserLibrary('customPlaylists', newArray)
    })
    
    setNewPlaylistName('')
    setIsCreating(false)
  }

  return (
    <div className='w-full min-h-[500px] pb-32'>
      {playlistsArray.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full text-center pt-32 opacity-70'>
          <div className='text-6xl mb-4'>🎵</div>
          <h2 className='text-2xl font-bold text-white mb-2'>No playlists yet</h2>
          <p className='text-gray-400 mb-6'>Create your own custom playlists to save your favorite tracks.</p>
          
          {isCreating ? (
            <form onSubmit={handleCreatePlaylist} className='flex gap-2 items-center'>
              <input
                autoFocus
                type='text'
                placeholder='Playlist name...'
                className='px-4 py-2 rounded-full bg-white/10 text-white outline-none border border-white/20 focus:border-white/50 w-64'
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <button type='submit' className='bg-white text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition'>
                Save
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsCreating(true)}
              className='bg-white text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition flex items-center gap-2'
            >
              <FaPlus size={16} /> Create Playlist
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            style={
              dominantColor && {
                backgroundColor: `rgba(${dominantColor}, 0.7)`,
                boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
              }
            }
          >
            <div className='relative pt-20 ml-5 pb-5'>
              <Header
                data={playlistsArray}
                image='https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/gkgkol3qvikb8byg2x6x?_a=BAMAGSRg0'
                type={`Created By ${userName}`}
                name='Custom Playlists'
                verfied={false}
                dominantColor={(color) => setDominantColor(color)}
              />
              <div className='flex gap-4 items-center'>
                <PlayIcon />
                
                {isCreating ? (
                  <form onSubmit={handleCreatePlaylist} className='flex gap-2 items-center ml-4'>
                    <input
                      autoFocus
                      type='text'
                      placeholder='Playlist name...'
                      className='px-4 py-2 rounded-full bg-black/40 text-white outline-none border border-white/20 focus:border-white/50 w-48'
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                    <button type='submit' className='bg-white text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition'>
                      Save
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setIsCreating(true)}
                    className='ml-4 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-full transition flex items-center gap-2 border border-white/10'
                  >
                    <FaPlus size={14} /> Create Playlist
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='absolute w-full pb-24 mt-4'>
            <SongList songs={playlistsArray} type='customPlaylists' />
          </div>
        </>
      )}
    </div>
  )
}

export default Playlists
