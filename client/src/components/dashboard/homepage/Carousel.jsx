import { useState } from 'react'
import { FaCirclePlay } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { songDetails, albumDetails, playlistDetails } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const Carousel = ({ CarouselData, typeId, isArtistPage }) => {
  const navigate = useNavigate()

  function handleMenu(id) {
    if (typeId == 1) navigate(`/dashboard/track/${id}`)
    if (typeId == 2 || typeId == 4) navigate(`/dashboard/playlist/${id}`)
    if (typeId == 3) navigate(`/dashboard/album/${id}`)
  }

  return (
    <div className='flex overflow-x-auto scrollbar-hide gap-5 pb-4 -mx-2 px-2 snap-x'>
      {CarouselData &&
        CarouselData?.map((data) => (
          <div
            key={data.id}
            onClick={() => handleMenu(data.id)}
            className='group flex flex-col min-w-[180px] max-w-[180px] md:min-w-[200px] md:max-w-[200px] p-4 bg-[#181818] hover:bg-[#282828] rounded-xl transition-all duration-300 cursor-pointer snap-start'
          >
            <CarouselImage
              image={data.image}
              id={data.id}
              typeId={typeId}
              CarouselData={CarouselData}
              isArtistPage={isArtistPage}
            />
            <div className='mt-4 flex flex-col gap-1'>
              <CarouselTitle title={data.name || data.title} />
              {isArtistPage ? (
                <span className='text-xs font-medium text-gray-400'>
                  {data?.year || data?.songCount + ' Songs'} •{' '}
                  {data?.type
                    ? data?.type?.charAt(0).toUpperCase() + data?.type?.slice(1)
                    : data?.label || data?.firstname}
                </span>
              ) : (
                <CarouselArtists
                  artists={data.primaryArtists}
                  followers={data.subtitle}
                  typeId={typeId}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

const CarouselImage = ({ image, id, typeId, CarouselData, isArtistPage }) => {
  const [data, setData] = useRQGlobalState('playbackQueue', null)

  const handleClick = async (newId) => {
    if (typeId == 1) {
      const { data } = await songDetails(newId)
      setData(data)
    }
    if (typeId == 3) {
      const { data } = await albumDetails(newId)
      if (data?.songs) setData(data.songs)
    }
    if (typeId == 2 || typeId == 4) {
      const { data } = await playlistDetails(newId)
      if (data?.songs) setData(data.songs)
    }
  }

  return (
    <div className='relative w-full aspect-square rounded-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]'>
      <img
        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        src={
          Array.isArray(image)
            ? image[2]?.link || image[1]?.link || image[0]?.link || image[2]?.url || image[1]?.url || image[0]?.url || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
            : typeof image === 'string'
            ? image
            : 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
        }
        alt='artwork'
      />
      <div
        className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'
        onClick={(e) => {
          e.stopPropagation()
          handleClick(id)
        }}
      >
        <div className='transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl rounded-full'>
          <FaCirclePlay size={48} className='text-[#1ed760] hover:scale-105 transition-transform hover:text-[#1fdf64] bg-black rounded-full' />
        </div>
      </div>
    </div>
  )
}

const CarouselTitle = ({ title }) => {
  return <h3 className='text-sm font-bold text-white truncate w-full'>{title || 'Unknown Title'}</h3>
}

const CarouselArtists = ({ artists, followers, typeId }) => {
  var shortedNames

  if (typeId == 1) {
    if (artists) {
      const arrayOfArtists = []
      artists?.map((artist) => arrayOfArtists.push(artist.name))
      const artistNames = arrayOfArtists.join(', ')
      shortedNames = artistNames
    }
    if (typeId == 3) {
      shortedNames = artists
    }
  }

  return (
    <span className='text-xs font-medium text-gray-400 truncate w-full'>
      {artists ? (shortedNames ? shortedNames : 'Unknown Artist') : followers}
    </span>
  )
}

export default Carousel
