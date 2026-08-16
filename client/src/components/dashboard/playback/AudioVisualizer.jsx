import { useEffect, useState } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const AudioVisualizer = () => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasSong, setHasSong] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef?.data) {
        setHasSong(true)
        setIsPlaying(!playerRef.data.paused)
      } else {
        setHasSong(false)
        setIsPlaying(false)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [playerRef])

  if (!hasSong) return null

  const bars = [
    { delay: '0s', height: '8px' },
    { delay: '0.2s', height: '16px' },
    { delay: '0.4s', height: '10px' },
    { delay: '0.1s', height: '20px' },
    { delay: '0.3s', height: '12px' },
  ]

  return (
    <div className='flex items-end justify-center gap-[3px] h-[20px] px-2 shrink-0'>
      {bars.map((bar, i) => (
        <div
          key={i}
          className='w-[3px] bg-[#1db954] rounded-t-sm transition-all duration-300'
          style={{
            height: isPlaying ? '20px' : bar.height,
            animation: isPlaying ? `eq 1.2s ease-in-out ${bar.delay} infinite` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default AudioVisualizer
