import { lazy } from 'react'
import ControllerButtons from './ControllerButtons'
import Seekbar from './Seekbar'

const AudioController = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-[600px] gap-2'>
      <ControllerButtons />
      <Seekbar />
    </div>
  )
}

export default AudioController
