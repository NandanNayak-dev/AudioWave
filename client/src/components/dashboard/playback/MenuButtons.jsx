import { useState } from 'react'
import { CgPlayButtonR } from 'react-icons/cg'
import { MdOutlineLyrics } from 'react-icons/md'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { LuMonitorSpeaker } from 'react-icons/lu'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { DownloadURL } from '../artistsScreen/ArtistsScreen'

const MenuButtons = ({ isPublic, onOpenArtistsPanel }) => {
  const [, setSelectedScreen] = useRQGlobalState('contentPlay', 'nowPlaying')
  const [isShowNowPlaying, showNowPlaying] = useState(true)
  const [isShowLyrics, showLyrics] = useState(false)
  const [isShowqueue, showQueue] = useState(false)
  const [isDevices, setDevices] = useState(false)
  const [currentSong] = useRQGlobalState('currentSong', null)

  function handleButtons(type) {
    if (type === 'nowPlaying') {
      showNowPlaying(!isShowNowPlaying)
      showLyrics(false)
      showQueue(false)
      setSelectedScreen('nowPlaying')
      onOpenArtistsPanel?.()
    }
    if (type === 'lyrics') {
      showNowPlaying(false)
      showLyrics(!isShowLyrics)
      showQueue(false)
      setSelectedScreen('lyrics')
      onOpenArtistsPanel?.()
    }
    if (type === 'queue') {
      showNowPlaying(false)
      showLyrics(false)
      showQueue(!isShowqueue)
      setSelectedScreen('queue')
      onOpenArtistsPanel?.()
    }
    if (type === 'devices') {
      setDevices(!isDevices)
    }
  }

  return (
    <div className={`flex items-center gap-4 ${isPublic ? 'mt-10 opacity-80' : 'opacity-70'}`}>
      <button 
        className={`transition-colors hover:text-white ${isShowNowPlaying ? 'text-[#1db954]' : 'text-gray-400'}`}
        onClick={() => handleButtons('nowPlaying')}
        title='Now Playing'
      >
        <CgPlayButtonR size={18} />
      </button>

      <button 
        className={`transition-colors hover:text-white ${isShowLyrics ? 'text-[#1db954]' : 'text-gray-400'}`}
        onClick={() => handleButtons('lyrics')}
        title='Lyrics'
      >
        <MdOutlineLyrics size={18} />
      </button>

      <button 
        className={`transition-colors hover:text-white ${isShowqueue ? 'text-[#1db954]' : 'text-gray-400'}`}
        onClick={() => handleButtons('queue')}
        title='Queue'
      >
        <HiOutlineQueueList size={18} />
      </button>

      {!isPublic && (
        <button 
          className={`transition-colors hover:text-white ${isDevices ? 'text-[#1db954]' : 'text-gray-400'}`}
          onClick={() => handleButtons('devices')}
          title='Devices'
        >
          <LuMonitorSpeaker size={18} />
        </button>
      )}

      {isPublic && (
        <DownloadURL songData={currentSong?.data} isPublic={isPublic} />
      )}
    </div>
  )
}

export default MenuButtons
