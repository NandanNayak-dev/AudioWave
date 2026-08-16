import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { searchSpecific } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { pushUserLibrary } from '../../../api/sync'
import { RiSearchLine } from 'react-icons/ri'

const Overlay = styled.div`
  ${tw`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}
`

const ModalContainer = styled.div`
  ${tw`bg-[#181818] w-[90%] max-w-2xl rounded-2xl p-6 shadow-2xl border border-white/10 relative flex flex-col`}
  max-height: 85vh;
`

const Header = styled.div`
  ${tw`flex flex-col gap-4 mb-4`}
`

const TitleRow = styled.div`
  ${tw`flex justify-between items-center`}
`

const Title = styled.h2`
  ${tw`text-2xl font-bold text-white`}
`

const CloseButton = styled.button`
  ${tw`text-gray-400 hover:text-white transition-colors`}
`

const SearchBar = styled.div`
  ${tw`flex items-center bg-white/10 rounded-xl px-4 py-3 gap-3`}
`

const SearchInput = styled.input`
  ${tw`bg-transparent w-full text-white outline-none placeholder-gray-400`}
`

const Grid = styled.div`
  ${tw`grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-2`}
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #404040;
    border-radius: 10px;
  }
`

const ArtistCard = styled.button`
  ${tw`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 relative`}
  ${({ isfollowing }) => isfollowing === 'true' ? tw`bg-white/10 ring-2 ring-cyan-400` : tw`bg-black/20 hover:bg-white/5`}
`

const Image = styled.img`
  ${tw`w-24 h-24 rounded-full object-cover shadow-lg`}
`

const ArtistName = styled.span`
  ${tw`text-sm font-semibold text-white text-center w-full truncate`}
`

const FavoriteArtistsModal = ({ onClose }) => {
  const [artists, setArtists] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const searchTimeout = useRef(null)
  
  const localData = localStorage.getItem('following')
  const parsedData = localData ? JSON.parse(localData) : []
  const initialData = Array.isArray(parsedData) ? { data: parsedData } : parsedData
  const [following, setFollowing] = useRQGlobalState('following', initialData)

  const popularArtistNames = [
    'Arijit Singh', 'Shreya Ghoshal', 'A.R. Rahman', 'Pritam',
    'Taylor Swift', 'The Weeknd', 'Ed Sheeran', 'Dua Lipa',
    'Badshah', 'Neha Kakkar', 'Atif Aslam', 'Darshan Raval'
  ]

  useEffect(() => {
    async function loadArtists() {
      try {
        setLoading(true)
        const results = await Promise.all(
          popularArtistNames.map(name => searchSpecific('artists', name))
        )
        const topArtists = results.map(r => r?.data?.results?.[0]).filter(Boolean)
        setArtists(topArtists)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadArtists()
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        setLoading(true)
        const response = await searchSpecific('artists', query)
        setSearchResults(response?.data?.results || [])
      } catch (error) {
        console.error("Search failed:", error)
      } finally {
        setLoading(false)
      }
    }, 500) // 500ms debounce
  }

  const getFollowingArray = () => {
    const actualData = following?.data || following
    if (Array.isArray(actualData?.data)) return actualData.data
    if (Array.isArray(actualData)) return actualData
    return []
  }

  const [localFollowing, setLocalFollowing] = useState(() => getFollowingArray())

  const toggleArtist = (artist) => {
    const isFollowing = localFollowing.some(a => String(a.id) === String(artist.id))
    
    let newList;
    if (isFollowing) {
      newList = localFollowing.filter(a => String(a.id) !== String(artist.id))
    } else {
      let imageUrl = '/icons/hero_person.png'
      if (Array.isArray(artist.image)) {
        imageUrl = artist.image[1]?.link || artist.image[0]?.link || artist.image[artist.image.length - 1]?.link
      } else if (typeof artist.image === 'string') {
        imageUrl = artist.image
      }
      newList = [...localFollowing, { id: artist.id, name: artist.name || artist.title, image: imageUrl }]
    }
    setLocalFollowing(newList)
  }

  const handleSave = () => {
    const newFollowingObj = { data: localFollowing }
    setFollowing(newFollowingObj)
    localStorage.setItem('following', JSON.stringify(newFollowingObj))
    
    // Trigger sync
    const userId = localStorage.getItem('userId')
    if (userId) {
      pushUserLibrary(userId).catch(console.error)
    }
    onClose()
  }

  const displayArtists = searchQuery.trim() ? searchResults : artists

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Header>
          <TitleRow>
            <Title>Choose Favorite Artists</Title>
            <CloseButton onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </CloseButton>
          </TitleRow>
          <SearchBar>
            <RiSearchLine size={20} className="text-gray-400" />
            <SearchInput 
              type="text" 
              placeholder="Search for any artist..." 
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
          </SearchBar>
        </Header>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center h-48">
            <span className="text-gray-400 font-medium">Loading artists...</span>
          </div>
        ) : displayArtists.length === 0 ? (
          <div className="flex-1 flex items-center justify-center h-48">
            <span className="text-gray-500 font-medium">No artists found</span>
          </div>
        ) : (
          <Grid>
            {displayArtists.map((artist, idx) => {
              const isFollowing = localFollowing.some(a => String(a.id) === String(artist.id))
              
              let imageUrl = '/icons/hero_person.png'
              if (Array.isArray(artist.image)) {
                imageUrl = artist.image[1]?.link || artist.image[0]?.link || artist.image[artist.image.length - 1]?.link
              } else if (typeof artist.image === 'string') {
                imageUrl = artist.image
              }

              return (
                <ArtistCard 
                  key={artist.id || idx} 
                  isfollowing={isFollowing ? 'true' : 'false'}
                  onClick={() => toggleArtist(artist)}
                >
                  <Image src={imageUrl} alt={artist.name || artist.title} onError={(e) => { e.target.onerror = null; e.target.src = '/icons/hero_person.png' }} />
                  <ArtistName>{artist.name || artist.title}</ArtistName>
                </ArtistCard>
              )
            })}
          </Grid>
        )}
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Save Artists
          </button>
        </div>
      </ModalContainer>
    </Overlay>
  )
}

export default FavoriteArtistsModal
