import { useRef, useState, useEffect } from 'react'
import { homepageData, songDetails } from '../../../api/apiMethods'
import tw from 'twin.macro'
import styled, { keyframes } from 'styled-components'
import { FaPause, FaPlay } from 'react-icons/fa6'
import { useDocumentTitle } from '@uidotdev/usehooks'

const Container = styled.div`
  ${tw`w-[300px] lg:w-[340px] rounded-2xl bg-[#121212]/70 backdrop-blur-[20px] border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)] shadow-cyan-500/10 flex flex-col p-4 overflow-hidden relative`}
`

const TopSection = styled.div`
  ${tw`flex w-full items-center gap-4`}
`

const ImageContainer = styled.div`
  ${tw`relative shrink-0`}
`

const Image = styled.img`
  ${tw`w-[72px] h-[72px] object-cover rounded-xl shadow-md border border-white/10`}
`

const InfoContainer = styled.div`
  ${tw`flex flex-col justify-center flex-1 min-w-0`}
`

const NowPlayingText = styled.div`
  ${tw`text-[9px] font-bold tracking-[0.2em] text-cyan-400 mb-1 uppercase`}
`

const Heading = styled.div`
  ${tw`font-bold text-sm lg:text-base text-white truncate w-full`}
  font-family: 'Inter', sans-serif;
`

const SubHeading = styled.div`
  ${tw`font-medium text-xs text-gray-400 truncate w-full mt-0.5`}
  font-family: 'Inter', sans-serif;
`

const EqualizerContainer = styled.div`
  ${tw`flex items-end gap-[3px] h-[18px] mt-2`}
`

const bounce = keyframes`
  0%, 100% { height: 6px; }
  50% { height: 16px; }
`

const Bar = styled.div`
  ${tw`w-[3px] bg-[#CAFC00] rounded-sm`}
  height: ${props => props.staticheight}px;
  animation: ${props => props.isplaying ? bounce : 'none'} ${props => props.speed}s ease-in-out infinite;
`

const ProgressContainer = styled.div`
  ${tw`w-full mt-4`}
`

const ProgressBarWrapper = styled.div`
  ${tw`w-full h-[3px] bg-white/20 rounded-full relative`}
`

const ProgressBarFill = styled.div`
  ${tw`absolute top-0 left-0 h-full bg-[#CAFC00] rounded-full w-0 transition-all duration-300`}
  ${props => props.isplaying && tw`w-1/3`} /* Visual fake progress */
`

const ProgressThumb = styled.div`
  ${tw`absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rounded-full shadow-md`}
`

const TimeLabels = styled.div`
  ${tw`flex justify-between w-full text-[10px] text-gray-400 mt-2 font-medium`}
`

const PlayButton = styled.button`
  ${tw`shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 active:scale-95 transition-all duration-300`}
`

const Player = ({ apiResponse }) => {
  const [data, setData] = useState('')
  const [playbackId, setPlaybackId] = useState('')
  const [songDetailsData, setSongDetailsData] = useState('')
  const [play, setPlay] = useState(false)

  useEffect(() => {
    // We don't block render. We load data async and populate when ready.
    getData()
  }, [])

  useEffect(() => {
    if (apiResponse && data) {
      apiResponse(data)
    }
  }, [data, apiResponse])

  async function getData() {
    try {
      const homepage = await homepageData()
      if (homepage) {
        setPlaybackId(homepage?.data?.trending?.songs[0]?.id)
        setData(homepage)
      }
    } catch (e) {
      console.log('Failed to fetch homepage data', e)
    }
  }

  // Fallback Logic
  const apiSongName = songDetailsData?.data?.[0]?.name
  const apiArtistName = songDetailsData?.data?.[0]?.primaryArtists
  const apiSongImage = songDetailsData?.data?.[0]?.image?.[1]?.link

  const displaySongName = apiSongName || 'Midnight Echoes'
  const displayArtistName = apiArtistName || 'Audiowave'
  const displayImage = apiSongImage || '/icons/Logo.png'

  const decodeTitle = (str) => {
    if (!str) return ''
    const doc = new DOMParser().parseFromString(str, 'text/html')
    return doc.documentElement.textContent
  }

  useDocumentTitle(
    songDetailsData && play
      ? `${decodeTitle(displaySongName)} - ${decodeTitle(displayArtistName)}`
      : 'Audiowave - A music streaming platform'
  )

  return (
    <Container>
      <TopSection>
        <ImageContainer>
          <Image
            src={displayImage}
            alt=''
            onError={(e) => { e.target.onerror = null; e.target.src = '/icons/Logo.png' }}
          />
        </ImageContainer>

        <InfoContainer>
          <NowPlayingText>Now Playing</NowPlayingText>
          <Heading>{decodeTitle(displaySongName)}</Heading>
          <SubHeading>{decodeTitle(displayArtistName)}</SubHeading>
          
          <EqualizerContainer>
            <Bar staticheight={6} speed={0.8} isplaying={play ? 1 : 0} />
            <Bar staticheight={12} speed={1.1} isplaying={play ? 1 : 0} />
            <Bar staticheight={8} speed={0.9} isplaying={play ? 1 : 0} />
            <Bar staticheight={14} speed={1.2} isplaying={play ? 1 : 0} />
          </EqualizerContainer>
        </InfoContainer>

        <PlayButton onClick={() => setPlay(!play)}>
          {play ? <FaPause size={14} /> : <FaPlay size={14} className='ml-0.5' />}
        </PlayButton>
      </TopSection>

      <ProgressContainer>
        <ProgressBarWrapper>
          <ProgressBarFill isplaying={play ? 1 : 0}>
            {play && <ProgressThumb />}
          </ProgressBarFill>
        </ProgressBarWrapper>
        <TimeLabels>
          <span>0:00</span>
          <span>3:42</span>
        </TimeLabels>
      </ProgressContainer>
      
      {playbackId && (
        <AudioPlayer
          songResponse={(data) => setSongDetailsData(data)}
          playingStatus={play}
          playbackId={playbackId}
        />
      )}
    </Container>
  )
}

const AudioPlayer = ({ playbackId, songResponse, playingStatus }) => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current
  const [songData, setSongData] = useState('')

  async function getData() {
    try {
      const playback = await songDetails(playbackId)
      setSongData(playback)
    } catch (e) {
      console.log('Failed to fetch song details', e)
    }
  }

  useEffect(() => {
    if (playbackId) getData()
  }, [playingStatus, playbackId])

  useEffect(() => {
    if (songResponse) songResponse(songData)
  }, [songData, songResponse])

  useEffect(() => {
    if (currentPlayer) {
      if (playingStatus) {
        currentPlayer.play().catch(e => console.log('Audio playback prevented', e))
      } else {
        currentPlayer.pause()
      }
    }
  }, [currentPlayer, playingStatus])

  return (
    <audio
      ref={audioPlayer}
      loop
      src={songData ? songData.data[0]?.downloadUrl?.[4]?.link || songData.data[0]?.downloadUrl?.[0]?.link : ''}
    ></audio>
  )
}

export default Player
