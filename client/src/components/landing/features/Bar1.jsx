import styled from 'styled-components'
import tw from 'twin.macro'

const Logo = styled.img`
  ${tw`w-12 h-12 lg:w-16 lg:h-16 rounded-full drop-shadow-xl border-2 border-white object-cover`}
`

const Bar1 = ({ response }) => {
  const data = response && response.data.trending.songs
  const filteredSongs =
    data &&
    data.filter((song) => {
      return song.primaryArtists[0]?.image[2]?.link !== undefined
    })
  let finalData = filteredSongs?.slice(1, 8)

  return (
    <div className='flex items-center justify-center p-2 mt-6 w-full max-w-sm mx-auto -space-x-3 overflow-hidden h-16 lg:h-20 rounded-full bg-[#dad4f1] shadow-2xl'>
      {finalData &&
        finalData.map((song) => (
          <Logo
            key={song?.id}
            className='transition transform hover:-translate-y-2 hover:scale-110 duration-300 hover:z-10 relative'
            src={song?.primaryArtists[0]?.image[2]?.link}
            alt='Artist'
          />
        ))}
    </div>
  )
}

export default Bar1
