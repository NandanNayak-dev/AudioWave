import { useEffect, useState } from 'react'
import {
  FaCirclePlay,
  FaCirclePause,
  FaRepeat,
  FaShuffle,
  FaForwardStep,
  FaBackwardStep,
  FaPlay,
  FaPause
} from 'react-icons/fa6'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const ControllerButtons = () => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [playbackDetails, setPlaybackDetails] = useRQGlobalState('playbackQueue')
  const [playing, setPlaying] = useState(false)
  const [isLooping, setLooping] = useState(false)
  const [isShuffling, setShuffling] = useState(false)

  function handleButtons(type) {
    if (type === 'shuffle') setShuffling(!isShuffling)
    if (type === 'loop') setLooping(!isLooping)
    // Note: previous and next should ideally trigger track changes. Here we just mock the active state if not fully implemented.
  }

  function shuffleItems(array) {
    const shuffledArray = array.slice()
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const audioEl = playerRef?.data || document.querySelector('audio')
      if (audioEl) {
        setPlaying(!audioEl.paused)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [playerRef])

  const togglePlay = () => {
    const audioEl = playerRef?.data || document.querySelector('audio')
    if (!audioEl) return

    if (audioEl.paused) {
      const playPromise = audioEl.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => console.error('Playback failed:', error))
      }
      setPlaying(true)
    } else {
      audioEl.pause()
      setPlaying(false)
    }
  }

  useEffect(() => {
    if (!playerRef?.data) return
    playerRef.data.loop = isLooping
  }, [isLooping, playerRef])

  useEffect(() => {
    if (!playbackDetails?.data || !isShuffling) return
    const songs = playbackDetails?.data?.slice()
    const [firstItem, ...restItems] = songs
    const shuffledItems = shuffleItems(restItems)
    const newArray = [firstItem, ...shuffledItems]
    setPlaybackDetails(newArray)
  }, [isShuffling])

  const skipBackward = () => {
    const audioEl = playerRef?.data || document.querySelector('audio')
    if (audioEl) {
      // The app's queue only moves forward (popping items off). 
      // So "Previous" restarts the current track, behaving like a standard player.
      audioEl.currentTime = 0
    }
  }

  const skipForward = () => {
    if (!playbackDetails?.data || playbackDetails.data.length <= 1) {
      // If it's the last song, just skip to the end so the auto-fetch/queue logic handles it
      const audioEl = playerRef?.data || document.querySelector('audio')
      if (audioEl) audioEl.currentTime = audioEl.duration
      return
    }
    // Move to the next song by popping the current one from the queue
    const newData = playbackDetails.data.slice(1)
    setPlaybackDetails(newData)
  }

  return (
    <div className='flex items-center justify-center gap-2 md:gap-6'>
      <button 
        className={`transition-colors ${isShuffling ? 'text-[#1db954]' : 'text-gray-400 hover:text-white'}`}
        onClick={() => handleButtons('shuffle')}
      >
        <FaShuffle size={18} />
      </button>

      <button 
        className='text-gray-400 hover:text-white transition-colors active:scale-95'
        onClick={skipBackward}
        title='Previous Track'
      >
        <FaBackwardStep size={22} />
      </button>

      <button 
        className='flex items-center justify-center w-10 h-10 bg-white rounded-full text-black hover:scale-105 active:scale-95 transition-all shadow-md'
        onClick={togglePlay}
      >
        {playing ? <FaPause size={18} /> : <FaPlay size={18} className='ml-1' />}
      </button>

      <button 
        className='text-gray-400 hover:text-white transition-colors active:scale-95'
        onClick={skipForward}
        title='Next Track'
      >
        <FaForwardStep size={22} />
      </button>

      <button 
        className={`transition-colors ${isLooping ? 'text-[#1db954]' : 'text-gray-400 hover:text-white'}`}
        onClick={() => handleButtons('loop')}
      >
        <FaRepeat size={18} />
      </button>
    </div>
  )
}

export default ControllerButtons
