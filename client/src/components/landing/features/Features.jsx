import { lazy, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa6'
import { GoArrowUpRight } from 'react-icons/go'
import { RiCompassDiscoverLine } from 'react-icons/ri'
const Heading = lazy(() => import('./Heading'))
const Bar1 = lazy(() => import('./Bar1'))
const Bar2 = lazy(() => import('./Bar2'))
const MenuCard = lazy(() => import('./MenuCard'))
const TopArtists = lazy(() => import('./TopArtists'))

const Features = ({ response }) => {
  const [count, setCount] = useState(0)

  return (
    <section className='w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 z-10 relative'>
      {/* 
        Unified Layout: 
        Desktop -> 3 Column Grid 
        Mobile -> Vertical Stack (no more swiper) 
      */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 w-full'>
        
        {/* Left Column: Favourites */}
        <div 
          className='flex flex-col w-full h-full'
          onMouseEnter={() => count > 6 ? setCount(0) : setCount((prev) => prev + 1)}
        >
          {/* Note: The "Improve your music taste" heading should be moved somewhere else later if needed, 
              but for now keeping it per original structure above the MenuCard */}
          <MenuCard
            image={response && response?.data?.albums[count]?.image[2]?.link}
            menuName='favourites'
            menuIcon1={<FaHeart />}
            menuIcon2={<GoArrowUpRight />}
            heading='Always your favourites'
            theme='light'
            subHeading='Craft personalized playlists with your favorite artists on an empty canvas.'
          />
        </div>

        {/* Center Column: Waveform & Technology */}
        <div className='flex flex-col w-full h-full items-center justify-between gap-6'>
          <Heading />
          <div className='w-full flex justify-center'>
            <Bar2 />
          </div>
          <div className='w-full'>
            <MenuCard
              image='/icons/bars.png'
              menuName='discovers'
              menuIcon1={<RiCompassDiscoverLine />}
              menuIcon2={<GoArrowUpRight />}
              heading='New albums & recognition'
              theme='dark'
              subHeading='Our database never stop growing, it means endless discovering.'
            />
            <Bar1 response={response} />
          </div>
        </div>

        {/* Right Column: Top Artists */}
        <div className='flex flex-col w-full h-full'>
          <TopArtists
            image={
              (response &&
                response?.data?.trending?.songs[0]?.primaryArtists[0]?.image[2]
                  ?.link) ||
              response?.data?.trending?.songs[1]?.primaryArtists[0]?.image[2]
                ?.link
            }
            menuName='popular'
            menuIcon1={<FaStar />}
            menuIcon2={<GoArrowUpRight />}
            heading='Listen to top artists anywhere'
            subHeading='Listen to most popular, bright and trending musicians'
            buttonText='EXPLORE'
            buttonImage='/icons/visualizer.png'
          />
        </div>

      </div>
    </section>
  )
}

export default Features
