import { lazy, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { pushUserLibrary } from '../../../api/sync'
import { playlistDetails } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { AnimatePresence, motion } from 'framer-motion'
const Header = lazy(() => import('./components/Header'))

const SongList = lazy(() => import('./components/SongList'))

const Playlist = () => {
  const [newPlaylistDetails, setPlaylistDetails] = useRQGlobalState(
    'playlistDetail',
    null
  )
  const [dominantColor, setDominantColor] = useState()
  const [isCustom, setIsCustom] = useState(false)
  const [customPlaylistsGlobal, setCustomPlaylistsGlobal] = useRQGlobalState('customPlaylists', null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const localData = localStorage.getItem('customPlaylists')
      if (localData) {
        const parsed = JSON.parse(localData)
        const customPlaylist = parsed.find(p => p._id === id || p.id === id)
        if (customPlaylist) {
           setIsCustom(true)
           const localInnerObj = {
             id: customPlaylist._id,
             name: customPlaylist.name,
             image: [{link: customPlaylist.image}, {link: customPlaylist.image}, {link: customPlaylist.image}],
             songCount: customPlaylist.songs ? customPlaylist.songs.length : 0,
             songs: customPlaylist.songs || [],
             firstname: localStorage.getItem('username') || 'AudioWave',
             year: new Date().getFullYear().toString(),
             type: 'playlist'
           }
           setPlaylistDetails(localInnerObj)
           return
        }
      }

      const detailsResponse = await playlistDetails(id)
      setPlaylistDetails(detailsResponse?.data)
      setIsCustom(false)
    }
  }

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this playlist?')) {
      const localData = localStorage.getItem('customPlaylists')
      if (localData) {
        const parsed = JSON.parse(localData)
        const newPlaylists = parsed.filter(p => p._id !== id && p.id !== id)
        localStorage.setItem('customPlaylists', JSON.stringify(newPlaylists))
        setCustomPlaylistsGlobal(newPlaylists)
        pushUserLibrary('customPlaylists', newPlaylists)
        navigate('/dashboard/playlists')
      }
    }
  }

  function handleDate(date) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        key='playlist'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={
            dominantColor && {
              backgroundColor: `rgba(${dominantColor}, 0.7)`,
              boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
            }
          }
        >
          {newPlaylistDetails && (
            <div className='relative pt-24 ml-5'>
              <Header
                data={newPlaylistDetails}
                image={
                  Array.isArray(newPlaylistDetails.data?.image)
                    ? newPlaylistDetails.data?.image[2]?.link || newPlaylistDetails.data?.image[1]?.link || newPlaylistDetails.data?.image[0]?.link || newPlaylistDetails.data?.image[2]?.url || newPlaylistDetails.data?.image[1]?.url || newPlaylistDetails.data?.image[0]?.url
                    : typeof newPlaylistDetails.data?.image === 'string'
                    ? newPlaylistDetails.data?.image
                    : 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
                }
                type='Playlist'
                name={newPlaylistDetails.data?.name}
                artistName={newPlaylistDetails.data?.firstname || 'AudioWave'}
                year={newPlaylistDetails.data?.year || '2024'}
                songCount={newPlaylistDetails.data?.songCount}
                dominantColor={(color) => setDominantColor(color)}
              />
              <div className="flex items-center gap-4">
                {isCustom && (
                  <button 
                    onClick={handleDelete}
                    className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-full transition"
                    title="Delete Playlist"
                  >
                    <MdDelete size={24} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {newPlaylistDetails?.data && (
          <SongList
            songs={newPlaylistDetails.data.songs || []}
            releaseDate={
              newPlaylistDetails.data.songs && newPlaylistDetails.data.songs[0]?.releaseDate
                ? handleDate(newPlaylistDetails.data.songs[0].releaseDate)
                : null
            }
            copyright={
              newPlaylistDetails.data.songs && newPlaylistDetails.data.songs[0]?.copyright
                ? newPlaylistDetails.data.songs[0].copyright
                : ''
            }
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Playlist
