import { useState } from 'react'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { songDetails } from '../../../../api/apiMethods'
import { FaPlay } from 'react-icons/fa6'
import { MdExplicit, MdQueueMusic, MdPlaylistPlay } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Song = ({
  id,
  songData,
  index,
  name,
  artistName,
  time,
  explicit,
  type,
  menu,
}) => {
  const [hover, setHover] = useState(false)
  const [data, setData] = useRQGlobalState('playbackQueue', null)
  const [currentSong] = useRQGlobalState('currentSong', null)
  const navigate = useNavigate()

  const handleClick = async (newId) => {
    if (type === 'discography') {
      navigate(`/dashboard/album/${newId}`)
    } else if (type === 'customPlaylists') {
      navigate(`/dashboard/playlist/${newId}`)
    } else {
      const { data: newSongData } = await songDetails(newId)
      setData(newSongData)
    }
  }

  const handleAddToQueue = async (e, newId) => {
    e.stopPropagation()
    if (type === 'discography' || type === 'customPlaylists') return
    try {
      const response = await songDetails(newId)
      if (response?.data && response.data[0]) {
        const currentQueue = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : [])
        setData([...currentQueue, response.data[0]])
      }
    } catch (err) {
      console.error('Failed to add to queue', err)
    }
  }

  const handlePlayNext = async (e, newId) => {
    e.stopPropagation()
    if (type === 'discography' || type === 'customPlaylists') return
    try {
      const response = await songDetails(newId)
      if (response?.data && response.data[0]) {
        const currentQueue = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : [])
        const playingId = currentSong?.data?.id || currentSong?.id
        const currentIndex = currentQueue.findIndex(s => (s?.id === playingId))
        
        if (currentIndex > -1) {
          const newQueue = [...currentQueue]
          newQueue.splice(currentIndex + 1, 0, response.data[0])
          setData(newQueue)
        } else {
          setData([response.data[0], ...currentQueue])
        }
      }
    } catch (err) {
      console.error('Failed to play next', err)
    }
  }

  function formatTime(time) {
    if (time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  const isPlayable = type !== 'discography' && type !== 'customPlaylists'

  return (
    <div className={menu === 'search' ? '' : 'ml-7 mr-9'}>
      <div
        className='hover:bg-[#353535] hover:cursor-pointer relative rounded-md py-2 px-5 pr-8 grid grid-cols-5 justify-between group'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleClick(songData?.id || songData?._id || id)}
      >
        <div
          className={
            menu === 'search' || menu === 'liked'
              ? 'flex gap-4 col-span-3'
              : 'flex gap-4 col-span-4'
          }
        >
          <h1
            className={
              index + 1 < 10
                ? 'mr-3 pt-2 text-sm font-medium'
                : 'mr-1 pt-2 text-sm font-medium'
            }
          >
            {hover ? (
              <FaPlay className='mt-1 ml-[-6px] pl-1' size={12} />
            ) : (
              index + 1
            )}
          </h1>
          <div className='flex text-sm items-center'>
            {type && (
              <img
                className='w-10 mr-3 rounded-sm'
                src={
                  type === 'liked' || type === 'customPlaylists'
                    ? songData?.image
                    : songData?.image?.[2]?.link
                }
              />
            )}
            <div>
              <h1
                className={
                  type === 'artist' ? 'text-[16px] font-medium' : 'font-bold'
                }
              >
                {songData?.name || name || 'Unknown'}
              </h1>
              <h1 className='flex opacity-80'>
                {songData?.explicitContent == 1 ||
                  (explicit && <MdExplicit size={20} className='opacity-80' />)}
                {type != 'artist' ||
                  (type != 'customPlaylists' && (
                    <>
                      {(songData?.primaryArtists?.length > 0 &&
                        songData?.primaryArtists[0]?.name) ||
                        songData?.primaryArtists ||
                        artistName ||
                        songData?.artist ||
                        'Unknown'}
                    </>
                  ))}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={
            menu === 'search' || menu === 'liked'
              ? 'flex justify-between items-center col-span-2'
              : 'absolute right-8 flex justify-end items-center h-full pr-2'
          }
        >
          {menu === 'search' ||
            (menu === 'liked' && (
              <h1 className='mt-3 text-sm font-medium opacity-80 mr-auto'>
                {songData?.album?.name || songData?.album}
              </h1>
            ))}
            
          <h1 className='hidden sm:block pt-2 font-medium p-2 text-sm opacity-80 group-hover:hidden whitespace-nowrap'>
            {type != 'discography' && type != 'customPlaylists'
              ? formatTime(songData?.duration) || time || '0:00'
              : songData?.songCount || songData?.songs?.length + ' Songs'}
          </h1>
          
          {isPlayable && (
            <div className="flex lg:hidden lg:group-hover:flex items-center gap-4">
              <MdPlaylistPlay 
                size={24} 
                className="hover:text-cyan-400 text-white/60 transition-colors" 
                onClick={(e) => handlePlayNext(e, songData?.id || songData?._id || id)} 
                title="Play Next" 
              />
              <MdQueueMusic 
                size={22} 
                className="hover:text-cyan-400 text-white/60 transition-colors" 
                onClick={(e) => handleAddToQueue(e, songData?.id || songData?._id || id)} 
                title="Add to Queue" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Song
