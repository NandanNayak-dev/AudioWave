import { useState } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { SlVolumeOff, SlVolume1, SlVolume2 } from 'react-icons/sl'
import { FaExpandAlt } from 'react-icons/fa'

const VolumeController = ({ isPublic }) => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [currentVolume, setVolume] = useState(100)

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    if (playerRef?.data) {
      playerRef.data.volume = parseFloat(vol / 100).toFixed(2)
      setVolume(vol)
    }
  }

  const volumePercent = currentVolume

  return (
    <div className={`flex items-center gap-3 ${isPublic ? 'mt-8' : ''}`}>
      <button className='text-gray-400 hover:text-white transition-colors' title='Mute'>
        {(currentVolume > 0 && currentVolume < 50 && <SlVolume1 size={18} />) ||
          (currentVolume >= 50 && <SlVolume2 size={18} />) ||
          (currentVolume === 0 && <SlVolumeOff size={18} />)}
      </button>

      <div className='relative flex items-center w-24 h-1 bg-gray-600 rounded-full group hover:h-1.5 transition-all'>
        {/* Fill */}
        <div 
          className='absolute left-0 top-0 h-full bg-white group-hover:bg-[#1db954] rounded-full z-10 pointer-events-none'
          style={{ width: `${volumePercent}%` }}
        ></div>
        
        {/* Slider Input */}
        <input
          type='range'
          min='0'
          max='100'
          value={currentVolume}
          onChange={handleVolumeChange}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0 p-0'
        />
      </div>

      <button className='text-gray-400 hover:text-white transition-colors ml-1' title='Full screen'>
        <FaExpandAlt size={14} />
      </button>
    </div>
  )
}

export default VolumeController
