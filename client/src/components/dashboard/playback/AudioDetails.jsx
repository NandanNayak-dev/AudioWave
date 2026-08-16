import useRQGlobalState from '../../../utils/useRQGlobalState'
import { useNavigate } from 'react-router-dom'
import Options from '../routeTypes/components/Options'
import AudioVisualizer from './AudioVisualizer'

const AudioData = () => {
  const [currentSong] = useRQGlobalState('currentSong', null)
  const data = currentSong?.data
  const artistName = data?.primaryArtists?.split(',')?.slice(0, 2)
  const artistId = data?.primaryArtistsId?.replaceAll(' ', '').split(',')?.slice(0, 2)

  const navigate = useNavigate()

  function handleMenu(type, id) {
    navigate(`/dashboard/${type}/${id}`)
  }

  return (
    <>
      {data ? (
        <div className='flex items-center gap-3 w-full pr-2'>
          <img 
            className='w-14 h-14 rounded-md object-cover shadow-sm pointer-events-none select-none' 
            src={data?.image[1]?.link || data?.image[0]?.link} 
            alt={data?.name} 
          />
          <div className='flex flex-col justify-center min-w-0 mr-2'>
            <div className='flex items-center gap-2'>
              <h4
                className='text-sm font-bold text-white hover:underline cursor-pointer truncate'
                onClick={() => handleMenu('track', data?.id)}
                title={data?.name}
              >
                {data?.name}
              </h4>
              <div className='hidden sm:block'>
                <AudioVisualizer />
              </div>
            </div>
            <div className='flex flex-wrap gap-1 text-xs font-medium text-gray-400 truncate'>
              {artistName?.map((name, index) => (
                <span
                  className='hover:text-white hover:underline cursor-pointer'
                  key={index}
                  onClick={() => handleMenu('artist', artistId[index])}
                >
                  {name}{index < artistName.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
          <div className='flex items-center ml-auto shrink-0 gap-2'>
            <Options
              type='customPlaylists'
              style='mt-0'
              id={data?.id}
              image={data?.image[2]?.link}
              name={data?.name}
              artist={data?.primaryArtists?.split(',')?.slice(0, 1)[0]}
              artistId={data?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]}
              album={data?.album?.name}
              albumId={data?.album?.id}
              duration={data?.duration}
            />
            <Options
              type='liked'
              style='mt-0 mr-5'
              id={data?.id}
              image={data?.image[2]?.link}
              name={data?.name}
              artist={data?.primaryArtists?.split(',')?.slice(0, 1)[0]}
              artistId={data?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]}
              album={data?.album?.name}
              albumId={data?.album?.id}
              duration={data?.duration}
            />
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-3 w-full opacity-30'>
          <div className='w-14 h-14 rounded-md bg-white/20 animate-pulse flex-shrink-0' />
          <div className='flex flex-col gap-2 min-w-0 w-full'>
            <div className='w-24 h-3 rounded-md bg-white/20 animate-pulse' />
            <div className='w-16 h-2 rounded-md bg-white/20 animate-pulse' />
          </div>
        </div>
      )}
    </>
  )
}

export default AudioData
