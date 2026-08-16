import { lazy, useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { MdOutlineLyrics, MdIosShare, MdClose } from 'react-icons/md'
import { TbCornerRightUp } from 'react-icons/tb'
import { artistDetails, lyrics } from '../../../api/apiMethods'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QueueList, QueueScreen } from './QueueScreen'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const LyricsScreen = lazy(() => import('./LyricsScreen'))
const Options = lazy(() => import('../routeTypes/components/Options'))
const ShareScreen = lazy(() => import('./ShareScreen'))

const ArtistsScreen = ({ isPublic, isOpen = false, onClose }) => {
  const [currentSong] = useRQGlobalState('currentSong', null)
  const [playbackDetails] = useRQGlobalState('playbackQueue')
  const [artistsData, setArtistsData] = useState(null)
  const [currentLyrics, setCurrentLyrics] = useState(null)
  const [selectedScreen, setSelectedScreen] = useRQGlobalState(
    'contentPlay',
    'nowPlaying'
  )
  const data = currentSong?.data
  const navigate = useNavigate()

  function handleMenu(type, id) {
    navigate(`/dashboard/${type}/${id}`)
  }

  useEffect(() => {
    const listId = data && data?.primaryArtistsId
    if (listId) {
      const artistIdsArray = listId.split(',').map((id) => id.trim())
      const artistId = artistIdsArray[0]
      getData(artistId)
    }
  }, [data])

  async function getData(artistId) {
    const getArtistData = await artistDetails(artistId)
    if (getArtistData) {
      setArtistsData(getArtistData)
      if (data?.name && data?.primaryArtists) {
        const name = data?.name?.replaceAll(' ', '+')
        const artistName = data?.primaryArtists
          ?.split(',')[0]
          ?.replaceAll(' ', '+')
        const getLyrics = await lyrics(name, artistName)
        setCurrentLyrics(getLyrics)
      }
    }
  }

  const panelContent = (
    <div className='flex flex-col h-full overflow-y-auto scrollbar-hide'>
      {/* display nowPlaying screen*/}
      {selectedScreen?.data === 'nowPlaying' && (
        <motion.div
          key='details'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='flex flex-col h-full'
        >
          {data ? (
            <div className='flex flex-col gap-6'>
              {!isPublic && (
                <SongDetails
                  handleMenu={(type, id) => handleMenu(type, id)}
                  songData={data}
                  showMenu={(type) => setSelectedScreen(type)}
                />
              )}
              <div className='flex flex-col gap-6 pb-6'>
                {artistsData?.data && (
                  <ArtistDetails
                    handleMenu={(type, id) => handleMenu(type, id)}
                    artistData={artistsData?.data}
                    songData={data}
                    isPublic={isPublic}
                  />
                )}
                <NextQueue
                  showMenu={(type) => setSelectedScreen(type)}
                  queueData={playbackDetails?.data}
                  handleMenu={(type, id) => handleMenu(type, id)}
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full opacity-50 mt-32 text-center'>
              <div className='text-6xl mb-4'>♫</div>
              <h3 className='text-lg font-bold text-white'>Nothing playing</h3>
              <p className='text-sm mt-2 text-gray-400'>Choose a song to start listening</p>
            </div>
          )}
        </motion.div>
      )}

      {/* display lyrics screen*/}
      {selectedScreen?.data === 'lyrics' && (
        <motion.div
          key='lyrics'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LyricsScreen
            lyricsData={currentLyrics}
            songData={data}
            showMenu={(type) => setSelectedScreen(type)}
            isPublic={isPublic}
          />
        </motion.div>
      )}

      {/* display queue screen*/}
      {selectedScreen?.data === 'queue' && (
        <motion.div
          key='queue'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <QueueScreen
            showMenu={(type) => setSelectedScreen(type)}
            handleMenu={(type, id) => handleMenu(type, id)}
            isPublic={isPublic}
          />
        </motion.div>
      )}
    </div>
  )

  return (
    <AnimatePresence>
      {/* Desktop Permanent Right Panel */}
      <div className={isPublic ? 'hidden' : 'hidden xl:block h-full w-full bg-[#0a0a0a] p-5 select-none'}>
        <h2 className='text-lg font-bold text-white mb-6 tracking-tight'>Now Playing</h2>
        {panelContent}
      </div>

      {/* Mobile/Tablet Modal Right Panel */}
      {!isPublic && isOpen && (
        <motion.div
          className='fixed inset-0 z-50 bg-black/80 xl:hidden backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='absolute bottom-0 left-0 right-0 max-h-[85vh] h-[85vh] flex flex-col overflow-hidden rounded-t-3xl bg-[#121212] shadow-2xl border-t border-white/10'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <div className='flex items-center justify-between p-5 border-b border-white/5 flex-shrink-0'>
              <h2 className='text-lg font-bold text-white'>Now playing</h2>
              <button
                aria-label='Close now playing panel'
                className='rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors text-white'
                onClick={onClose}
              >
                <MdClose size={22} />
              </button>
            </div>
            <div className='p-5 overflow-y-auto flex-1'>
              {panelContent}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* handle recently played automatically */}
      {!isPublic && currentSong?.data && (
        <Options
          type='recentlyPlayed'
          autoUpdate={true}
          id={currentSong?.data?.id}
          image={currentSong?.data?.image && currentSong?.data?.image[2]?.link}
          name={currentSong?.data?.name}
          artist={typeof currentSong?.data?.primaryArtists === 'string' ? currentSong?.data?.primaryArtists?.split(',')?.slice(0, 1)[0] : ''}
          artistId={
            typeof currentSong?.data?.primaryArtistsId === 'string'
              ? currentSong?.data?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]
              : ''
          }
          album={currentSong?.data?.album?.name}
          albumId={currentSong?.data?.album?.id}
          duration={currentSong?.data?.duration}
        />
      )}
    </AnimatePresence>
  )
}

const SongDetails = ({ handleMenu, songData, showMenu }) => {
  const [showQR, setShowQR] = useState(false)
  const [url, setUrl] = useState('https://audiowave.vercel.app/')
  const artist = typeof songData?.primaryArtists === 'string' ? songData?.primaryArtists?.split(',').slice(0, 2) : []
  const artistId = typeof songData?.primaryArtistsId === 'string' ? songData?.primaryArtistsId?.replaceAll(' ', '').split(',') : []

  useEffect(() => {
    setUrl(`https://audiowave.vercel.app/public/${songData?.id}`)
  }, [songData])

  return (
    <div className='flex flex-col'>
      <div className='relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl mb-4 group'>
        <img
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          src={songData?.image[2]?.link || songData?.image[1]?.link}
          alt={songData?.name}
        />
        <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            onClick={() => setShowQR(!showQR)}
            className='bg-black/60 backdrop-blur p-2 rounded-full text-white hover:bg-black/80'
          >
            {showQR ? <MdClose size={20} /> : <MdIosShare size={20} />}
          </button>
        </div>
        {showQR && (
          <div className='absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center'>
            <h1 className='text-sm font-bold text-white mb-2'>Share Song</h1>
            <div
              className='cursor-pointer text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 text-white'
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Copy Link
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <h1
          className='text-xl font-bold text-white hover:underline cursor-pointer truncate'
          onClick={() => handleMenu('track', songData?.id)}
        >
          {songData?.name}
        </h1>
        <div className='flex flex-wrap gap-1 text-sm font-medium text-gray-400'>
          {artist.map((name, index) => (
            <span
              className='hover:text-white hover:underline cursor-pointer'
              key={index}
              onClick={() => handleMenu('artist', artistId[index])}
            >
              {name}{index < artist.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-4 mt-6 border-t border-white/10 pt-4'>
        <Options
          type='customPlaylists'
          id={songData?.id}
          image={songData?.image[2]?.link}
          name={songData?.name}
          artist={songData?.primaryArtists?.split(',')?.slice(0, 1)[0]}
          artistId={songData?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]}
          album={songData?.album?.name}
          albumId={songData?.album?.id}
          duration={songData?.duration}
        />
        <Options
          type='liked'
          id={songData?.id}
          image={songData?.image[2]?.link}
          name={songData?.name}
          artist={songData?.primaryArtists?.split(',')?.slice(0, 1)[0]}
          artistId={songData?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]}
          album={songData?.album?.name}
          albumId={songData?.album?.id}
          duration={songData?.duration}
        />
        <button
          onClick={() => showMenu('lyrics')}
          className='text-gray-400 hover:text-white transition-colors'
          title='Lyrics'
        >
          <MdOutlineLyrics size={24} />
        </button>
        <DownloadURL songData={songData} />
      </div>
    </div>
  )
}

export const DownloadURL = ({ songData, isPublic }) => {
  const name = songData?.name
  const fileUrl = songData?.downloadUrl?.[4]?.link || songData?.downloadUrl?.[0]?.link

  const handleDownload = async () => {
    try {
      if (!fileUrl && !name) return
      const data = await fetch(fileUrl)
      const blob = await data.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }
  return (
    <button onClick={handleDownload} className='text-gray-400 hover:text-white transition-colors' title='Download'>
      <LuDownload size={22} />
    </button>
  )
}

const ArtistDetails = ({ handleMenu, artistData, songData }) => {
  return (
    <div className='relative bg-[#181818] rounded-xl overflow-hidden group cursor-pointer' onClick={() => handleMenu('artist', artistData?.id)}>
      <div className='absolute top-3 left-3 z-10 text-xs font-bold bg-black/60 backdrop-blur px-2 py-1 rounded-md text-white'>
        About the artist
      </div>
      <img
        className='w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300'
        src={artistData?.image[2]?.link}
        alt={artistData?.name}
      />
      <div className='p-4'>
        <h1 className='text-lg font-bold text-white group-hover:underline'>
          {artistData?.name}
        </h1>
        <p className='text-xs font-medium text-gray-400 mt-1'>
          {songData?.playCount?.toLocaleString()} monthly listeners
        </p>
      </div>
    </div>
  )
}

const NextQueue = ({ showMenu, queueData, handleMenu }) => {
  if (!queueData || !queueData[1]) return null
  return (
    <div className='bg-[#181818] rounded-xl p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-sm font-bold text-white'>Up Next</h1>
        <button
          className='text-xs font-bold text-gray-400 hover:text-white transition-colors'
          onClick={() => showMenu('queue')}
        >
          View queue
        </button>
      </div>
      <QueueList
        queueData={queueData || []}
        artists={queueData?.[1]?.primaryArtists || queueData?.[0]?.primaryArtists}
        artistsIds={queueData?.[1]?.primaryArtistsId || queueData?.[0]?.primaryArtistsId}
        image={queueData?.[1]?.image?.[1]?.link || queueData?.[0]?.image?.[1]?.link}
        id={queueData?.[1]?.id || queueData?.[0]?.id}
        name={queueData?.[1]?.name || queueData?.[0]?.name}
        handleMenu={handleMenu}
      />
    </div>
  )
}

export default ArtistsScreen
