import { useState, lazy } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import PlayIcon from './components/PlayIcon'
const Header = lazy(() => import('./components/Header'))
import SongList from './components/SongList'

const LikedSongs = () => {
  const [dominantColor, setDominantColor] = useState()
  const userName = localStorage.getItem('username')
  const likedDataLocally = localStorage.getItem('liked')
  const parsedData = likedDataLocally ? JSON.parse(likedDataLocally) : []
  const initialData = Array.isArray(parsedData) ? { data: parsedData } : parsedData
  const [data] = useRQGlobalState('liked', initialData)

  const getArray = () => {
    if (!data?.data) return []
    if (Array.isArray(data.data)) return data.data
    if (Array.isArray(data.data.data)) return data.data.data
    return []
  }
  
  const likedArray = getArray()

  return (
    <div className='w-full min-h-[500px]'>
      {likedArray.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full text-center pt-32 opacity-70'>
          <div className='text-6xl mb-4'>♡</div>
          <h2 className='text-2xl font-bold text-white mb-2'>No liked songs yet</h2>
          <p className='text-gray-400'>Find your favorite tracks and tap the heart icon.</p>
        </div>
      ) : (
        <>
          <div
            style={
              dominantColor && {
                backgroundColor: `rgba(${dominantColor}, 0.7)`,
                boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
              }
            }
          >
            <div className='relative pt-20 ml-5 pb-5'>
              <Header
                data={likedArray}
                image='https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/wgp6vslfpkovzcivmegp?_a=BAMAGSRg0'
                type={`Created By ${userName}`}
                name='Liked Songs'
                verfied={false}
                dominantColor={(color) => setDominantColor(color)}
              />
              <div className='flex gap-4'>
                <PlayIcon />
              </div>
            </div>
          </div>
          <div className='absolute w-full pb-24'>
            <SongList
              songs={likedArray}
              artistName={likedArray[0]?.artist}
              type='liked'
              menu='liked'
            />
          </div>
        </>
      )}
    </div>
  )
}

export default LikedSongs
