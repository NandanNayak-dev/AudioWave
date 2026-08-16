import { useEffect, useState } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const Seekbar = () => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const audioEl = playerRef?.data || document.querySelector('audio')
      if (audioEl) {
        setCurrentTime(audioEl.currentTime)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [playerRef])

  const handleSeekChange = (event) => {
    const newTime = parseFloat(event.target.value)
    const audioEl = playerRef?.data || document.querySelector('audio')
    if (audioEl) {
      audioEl.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  function formatTime(time) {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = playerRef?.data?.duration || 100
  const progressPercent = (currentTime / duration) * 100

  return (
    <div className='flex items-center gap-3 w-full text-xs font-medium text-gray-400 group'>
      <span className='w-10 text-right'>{formatTime(currentTime)}</span>
      
      <div className='relative flex-1 h-1 bg-gray-600 rounded-full flex items-center hover:h-1.5 transition-all'>
        {/* Played track */}
        <div 
          className='absolute left-0 top-0 h-full bg-white group-hover:bg-[#1db954] rounded-full z-10 pointer-events-none'
          style={{ width: `${progressPercent}%` }}
        ></div>
        
        {/* Range input overlay */}
        <input
          type='range'
          min='0'
          max={duration}
          step='0.1'
          value={currentTime}
          onChange={handleSeekChange}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0 p-0'
        />
      </div>

      <span className='w-10 text-left'>{formatTime(duration)}</span>
    </div>
  )
}

export default Seekbar
