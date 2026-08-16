import tw from 'twin.macro'
import styled from 'styled-components'
import { RiLoginCircleFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const HeadingText = styled.span`
  ${tw`drop-shadow-xl text-3xl lg:text-4xl lg:max-w-[300px] font-black opacity-90 leading-tight tracking-tight text-white`}
  font-family: 'Inter', sans-serif;
`

const Heading = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-full items-start'>
      <div className='flex mb-4 items-center gap-0.5'>
        <div className='w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-yellow-400 shadow-lg' />
        <div className='w-4 lg:w-5 h-10 lg:h-12 rounded-r-full bg-[#dad4f1] shadow-md' />
        <div className='w-4 lg:w-5 h-10 lg:h-12 rounded-r-full bg-[#dad4f1] shadow-md' />
      </div>
      <HeadingText>Improve your music taste</HeadingText>
      <button onClick={() => navigate('/auth')} className='flex items-center justify-center gap-3 w-48 border-2 border-white/60 text-white rounded-full text-md font-bold py-3 px-6 my-6 hover:bg-white hover:text-black transition-all duration-300 shadow-xl hover:scale-105 active:scale-95'>
        <span className='tracking-wide mt-0.5'>START NOW</span>
        <RiLoginCircleFill size={26} />
      </button>
    </div>
  )
}

export default Heading
