import { lazy, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { homepageData } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { AnimatePresence, motion } from 'framer-motion'
const Carousel = lazy(() => import('./Carousel'))
const Skeleton = lazy(() => import('./Skeleton'))

const Heading = styled.div`
  ${tw`mt-5 text-2xl font-bold`}
`

const Homepage = () => {
  const [data, setData] = useRQGlobalState('homepageData', null)

  async function getData() {
    const { data } = await homepageData()
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const types = [
    {
      id: 1,
      heading: 'Trending Songs',
      carouselData: data?.data?.trending?.songs,
    },
    {
      id: 2,
      heading: "Playlists you can't miss",
      carouselData: data?.data?.playlists,
    },
    {
      id: 3,
      heading: 'Popular Albums',
      carouselData: data?.data?.albums,
    },
    {
      id: 4,
      heading: 'Top Charts',
      carouselData: data?.data?.charts,
    },
  ]

  const fallback = [1, 2, 3, 4]

  return (
    <AnimatePresence>
      <motion.div
        className='mt-2 flex flex-col gap-10 pb-10'
        key='homepage'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {data
          ? types.map((type) => (
              <div key={type.id} className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-2xl font-bold text-white tracking-tight'>{type.heading}</h2>
                  <button className='text-sm font-semibold text-gray-400 hover:text-white transition-colors'>See all →</button>
                </div>
                <Carousel CarouselData={type.carouselData} typeId={type.id} />
              </div>
            ))
          : fallback.map((type) => (
              <div key={type} className='flex flex-col gap-4'>
                <div className='w-48 h-6 rounded-md bg-white/10 animate-pulse'></div>
                <Skeleton />
              </div>
            ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default Homepage
