import tw from 'twin.macro'
import styled from 'styled-components'
import { GoArrowUpRight } from 'react-icons/go'

const Container = styled.aside`
  ${tw`hidden lg:flex fixed right-0 top-0 h-screen select-none z-40 bg-black/40 backdrop-blur-md w-20 flex-col items-center overflow-hidden border-l border-white/10`}
`
const ScrollTrack = styled.div`
  ${tw`flex flex-col items-center gap-12 py-10`}
  animation: scroll 30s linear infinite;

  @keyframes scroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
`
const TextContainer = styled.div`
  ${tw`flex items-center gap-4 font-bold text-xl text-gray-400 opacity-80 transition-all duration-300 hover:opacity-100 hover:text-white hover:scale-105 cursor-pointer`}
  writing-mode: vertical-rl;
  font-family: 'Inter', sans-serif;
  letter-spacing: 6px;
`

const Heading = () => {
  return (
    <TextContainer>
      <span>EXPLORE NOW</span>
      <GoArrowUpRight size={24} className='mt-2' />
    </TextContainer>
  )
}

const RightBar = () => {
  // Use enough elements to ensure a smooth infinite scroll loop
  const headings = Array.from({ length: 16 }, (v, i) => i)

  return (
    <Container>
      <ScrollTrack>
        {headings.map((index) => (
          <Heading key={index} />
        ))}
      </ScrollTrack>
    </Container>
  )
}

export default RightBar
