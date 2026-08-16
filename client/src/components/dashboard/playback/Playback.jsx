import { useEffect, lazy, useRef } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useLocation } from 'react-router-dom'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { artistSongs, recommendedSongs, songDetails } from '../../../api/apiMethods'
const AudioDetails = lazy(() => import('./AudioDetails'))
const AudioVisualizer = lazy(() => import('./AudioVisualizer'))
const AudioController = lazy(() => import('./AudioController'))
const MenuButtons = lazy(() => import('./MenuButtons'))
const VolumeController = lazy(() => import('./VolumeController'))

const Container = styled.div`
  ${tw`bg-black w-screen p-1 text-sm font-semibold`}
`
const SubContainer = styled.div`
  ${tw`grid grid-cols-2 items-center gap-2 lg:grid-cols-3 lg:justify-between`}
`

const Player = () => {
  const audioRef = useRef()
  const [, setPlayerRef] = useRQGlobalState('playerRef', null)
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)
  const [id, setId] = useRQGlobalState('currentId', currentSong?.data?.id)
  const location = useLocation()
  let currentPath = location.pathname

  useEffect(() => {
    if (!currentSong?.data) return
    setId(currentSong?.data?.id)
    if (!id) {
      setId(currentSong?.data?.id)
    }
  }, [currentSong, id])

  useEffect(() => {
    if (audioRef.current) {
      setPlayerRef(audioRef.current)
      if (!currentSong?.data?.downloadUrl) {
        audioRef.current.pause()
      }
    }
  }, [currentSong?.data?.downloadUrl])

  useEffect(() => {
    if (!playbackDetails?.isPending && playbackDetails?.data != null) {
      setPlaybackDetails(playbackDetails?.data)
      setCurrentSong(playbackDetails?.data[0])
    }
  }, [playbackDetails?.isPending, playbackDetails?.data])

  useEffect(() => {
    const fetchMissingDetails = async () => {
      if (currentSong?.data && !currentSong.data.downloadUrl) {
        const idToFetch = currentSong.data.id || currentSong.data._id
        if (idToFetch) {
          try {
            const res = await songDetails(idToFetch)
            if (res?.data?.[0]) {
              setCurrentSong(res.data[0])
            }
          } catch (error) {
            console.error('Failed to fetch song details', error)
          }
        }
      }
    }
    fetchMissingDetails()
  }, [currentSong?.data?.id])

  // Handle Queue
  useEffect(() => {
    if (!audioRef?.current) return
    const audioElement = audioRef.current

    const handleSongEnd = async () => {
      if (!playbackDetails?.data) return
      const newData = playbackDetails?.data?.filter(
        (song) => song?.id != id?.data
      )
      setPlaybackDetails(newData)
      setCurrentSong(newData[0])
    }
    audioElement.addEventListener('ended', handleSongEnd)
    
    return () => {
      audioElement.removeEventListener('ended', handleSongEnd)
    }
  }, [playbackDetails?.data, id?.data])

  // fetch new data for queue
  useEffect(() => {
    if (playbackDetails?.data?.length == 1) {
      fetchNewData()
    }
  }, [playbackDetails?.data])

  async function fetchNewData() {
    let isPublic = currentPath.startsWith('/public/')
    const songId = playbackDetails?.data[0]?.id
    const artistsId = playbackDetails?.data[0]?.primaryArtistsId?.split(',')
    const albumsResponse = isPublic
      ? await artistSongs(artistsId[0], 1, 'latest')
      : await recommendedSongs(songId)
    if (!isPublic && albumsResponse?.data) {
      const updatedData = [playbackDetails?.data[0], ...albumsResponse.data]

      setPlaybackDetails(updatedData)
    }

    if (isPublic && albumsResponse?.data?.results) {
      const updatedData = [
        playbackDetails?.data[0],
        ...albumsResponse.data.results,
      ]

      setPlaybackDetails(updatedData)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
        src={currentSong?.data?.downloadUrl ? currentSong.data.downloadUrl[4]?.link : undefined}
      ></audio>
    </>
  )
}

const Playback = ({ isPublic, onOpenArtistsPanel }) => {
  const [currentSong] = useRQGlobalState('currentSong', null)

  const decodeTitle = (str) => {
    if (!str) return ''
    const doc = new DOMParser().parseFromString(str, 'text/html')
    return doc.documentElement.textContent
  }

  useDocumentTitle(
    currentSong?.data?.name
      ? `${decodeTitle(currentSong.data.name)} - ${decodeTitle(currentSong.data.primaryArtists)}`
      : 'Audiowave'
  )

  return (
    <>
      {!isPublic && (
        <div className='flex items-center justify-between w-full h-full px-2 lg:px-4 gap-1 lg:gap-4'>
          {/* Left: Song Info */}
          <div className='flex items-center gap-2 lg:gap-4 w-[40%] lg:w-[30%] lg:min-w-[200px]'>
            <div className='flex items-center gap-1 lg:gap-3 w-full'>
              <AudioDetails />
            </div>
          </div>

          {/* Center: Playback Controls & Progress */}
          <div className='flex flex-col items-center justify-center flex-1 lg:w-[40%] lg:max-w-[600px] gap-1 lg:gap-2'>
            <AudioController />
          </div>

          {/* Right: Menu Buttons & Volume */}
          <div className='flex items-center justify-end lg:w-[30%] lg:min-w-[200px] gap-2 lg:gap-4'>
            <MenuButtons onOpenArtistsPanel={onOpenArtistsPanel} />
            <div className='hidden lg:block'>
              <VolumeController />
            </div>
          </div>
        </div>
      )}
      {isPublic && (
        <div className='relative z-10 flex mt-10 ml-20 mr-40 justify-between'>
          <AudioController />
          <MenuButtons isPublic='true' />
          <VolumeController isPublic='true' />
        </div>
      )}
      <Player />
    </>
  )
}

export default Playback
