import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { songDetails } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { MdQueueMusic, MdPlaylistPlay } from 'react-icons/md'

const Container = styled.div`
  ${tw`w-full h-auto py-3 rounded-xl p-2 grid grid-rows-3`}
`
const SubContainer = styled.div`
  ${tw`flex items-center gap-2 p-1 w-full rounded-lg cursor-pointer`}
  transition: background 0.3s ease;
  &:hover {
    background: #2a2a2a;
  }
`

const Heading = styled.div`
  ${tw`text-lg font-bold truncate`}
`
const SubHeading = styled.div`
  ${tw`text-sm font-bold opacity-50 truncate`}
`
const Image = styled.img`
  ${tw`rounded-lg w-14 p-1`}
`

const Songs = ({ data }) => {
  const navigate = useNavigate()
  const [playbackQueue, setPlaybackQueue] = useRQGlobalState('playbackQueue', null)
  const [currentSong] = useRQGlobalState('currentSong', null)

  function handleMenu(id) {
    navigate(`/dashboard/track/${id}`)
  }

  const handleAddToQueue = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await songDetails(id)
      if (response?.data && response.data[0]) {
        const currentQueue = Array.isArray(playbackQueue?.data) ? playbackQueue.data : (Array.isArray(playbackQueue) ? playbackQueue : [])
        setPlaybackQueue([...currentQueue, response.data[0]])
      }
    } catch (err) {
      console.error('Failed to add to queue', err)
    }
  }

  const handlePlayNext = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await songDetails(id)
      if (response?.data && response.data[0]) {
        const currentQueue = Array.isArray(playbackQueue?.data) ? playbackQueue.data : (Array.isArray(playbackQueue) ? playbackQueue : [])
        const playingId = currentSong?.data?.id || currentSong?.id
        const currentIndex = currentQueue.findIndex(s => (s?.id === playingId))
        
        if (currentIndex > -1) {
          const newQueue = [...currentQueue]
          newQueue.splice(currentIndex + 1, 0, response.data[0])
          setPlaybackQueue(newQueue)
        } else {
          setPlaybackQueue([response.data[0], ...currentQueue])
        }
      }
    } catch (err) {
      console.error('Failed to play next', err)
    }
  }

  return (
    <Container>
      {data &&
        data?.map((song, index) => (
          <SubContainer
            className="group"
            key={index}
            id={song?.id}
            onClick={() => handleMenu(song?.id)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Image
                src={
                  song?.image[0]?.link ||
                  'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
                }
                alt={song?.title + "'s Image"}
              />
              <div className="flex-1 min-w-0">
                <Heading>{song?.title}</Heading>
                <SubHeading>{song?.singers}</SubHeading>
              </div>
            </div>
            <div className="flex lg:hidden lg:group-hover:flex items-center gap-3 pr-4">
              <MdPlaylistPlay 
                size={24} 
                className="hover:text-cyan-400 text-white/50 transition-colors cursor-pointer" 
                onClick={(e) => handlePlayNext(e, song?.id)} 
                title="Play Next" 
              />
              <MdQueueMusic 
                size={22} 
                className="hover:text-cyan-400 text-white/50 transition-colors cursor-pointer" 
                onClick={(e) => handleAddToQueue(e, song?.id)} 
                title="Add to Queue" 
              />
            </div>
          </SubContainer>
        ))}
    </Container>
  )
}

export default Songs
