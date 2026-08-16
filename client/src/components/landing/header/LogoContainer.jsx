import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.button`
  ${tw`px-6 h-12 rounded-full border-2 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-105 active:scale-95`}
`

const LogoContainer = ({ text, image, whiteBg, Icon, navigation }) => {
  function handleNavigation() {
    if (text === 'Login') {
      navigation('/auth')
    }
  }

  return (
    <Container
      className={
        whiteBg
          ? 'bg-white text-black border-transparent hover:bg-gray-200 shadow-xl'
          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 shadow-md backdrop-blur-md'
      }
      onClick={handleNavigation}
    >
      {image && <img src={image} className='w-6 h-6 object-contain pointer-events-none' alt='' />}
      <span className='text-sm tracking-wide'>{text}</span>
      {Icon && <Icon size={20} className='text-current' />}
    </Container>
  )
}

export default LogoContainer
