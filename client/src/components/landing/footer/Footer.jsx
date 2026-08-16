import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`w-full mt-20 mb-10 text-center text-white opacity-80`}
`
const Heading = styled.div`
  ${tw`text-lg font-bold mb-2 flex justify-center drop-shadow-md`}
`
const SubHeading = styled.div`
  ${tw`text-sm mr-2 drop-shadow-md`}
`

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <Container>
      <Heading>
        <div>Crafted By</div>
        <a
          href='#'
          className='text-white hover:text-yellow-400 ml-2 transition-colors'
        >
          Nandan
        </a>
      </Heading>
      <SubHeading>{year} © All rights reserved</SubHeading>
    </Container>
  )
}

export default Footer
