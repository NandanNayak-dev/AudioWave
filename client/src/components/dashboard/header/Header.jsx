import { FaHistory } from 'react-icons/fa'
import { MdQueueMusic } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Buttons from './Buttons'
import UserProfile from './profile/UserProfile'

const Header = ({ onOpenArtistsPanel }) => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between w-full'>
      {/* Left: Navigation Buttons */}
      <div className='flex items-center gap-3'>
        <Buttons name='backward' />
        <Buttons name='forward' />
      </div>

      {/* Right: Actions */}
      <div className='flex items-center gap-4'>

        <button
          onClick={() => navigate('/dashboard/recently-played')}
          className='text-gray-400 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full bg-black/40 hover:bg-black/80'
          title='Recently Played'
        >
          <FaHistory size={20} />
        </button>
        <button
          aria-label='Open now playing panel'
          className='xl:hidden text-gray-400 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full bg-black/40 hover:bg-black/80'
          onClick={onOpenArtistsPanel}
          title='Now Playing'
        >
          <MdQueueMusic size={22} />
        </button>
        <div className='ml-2'>
          <UserProfile />
        </div>
      </div>
    </div>
  )
}

export default Header
