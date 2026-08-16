import { lazy, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'
import { addLanguages } from '../../../api/user'
import { useDocumentTitle } from '@uidotdev/usehooks'
const SendButton = lazy(() => import('../SendButton'))
const Button = lazy(() => import('./Button'))

const Heading = styled.h1`
  ${tw`text-2xl font-bold text-center mb-5`}
`
const SubContainer = styled.div`
  ${tw`grid grid-cols-3`}
`
const Error = styled.div`
  ${tw`flex justify-center text-lg font-medium`}
`

const Languages = ({ isMenu, onNext }) => {
  const [selectedLang, setSelectedLang] = useState([])
  const [response, setResponse] = useState('')
  const navigate = useNavigate()
  const values = [
    'English',
    'Hindi',
    'Punjabi',
    'Haryanvi',
    'Telugu',
    'Marathi',
    'Gujarati',
    'Bengali',
    'Rajasthani',
  ]
  const handleSelection = (lang) => {
    const isSelected = selectedLang.includes(lang)
    if (!isSelected) {
      setSelectedLang([...selectedLang, lang])
    } else {
      const updatedLang = selectedLang.filter((element) => element !== lang)
      setSelectedLang(updatedLang)
    }
  }

  const handleClick = async () => {
    try {
      if (selectedLang.length === 0) {
        setResponse('Select atleast one language')
        return
      }
      const languageString = selectedLang.join(',')
      localStorage.setItem('languages', languageString)
      if (onNext) {
        onNext()
        window.location.reload()
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.log(error)
    }
  }

  useDocumentTitle('AudioWave - Select Language')

  return (
    <div>
      <Heading className={isMenu ? 'text-lg mb-2' : ''}>Select Language</Heading>
      <SubContainer className={isMenu ? 'grid-cols-2 gap-1' : ''}>
        {values.map((lang, index) => (
          <div key={index}>
            <Button lang={lang} onClick={handleSelection} isMenu={isMenu} />
          </div>
        ))}
      </SubContainer>
      <Error className={isMenu ? 'text-sm mt-1' : ''}>{response}</Error>
      <div className={isMenu ? 'mt-2' : ''}>
        <SendButton value='Finish' onclick={handleClick} />
      </div>
    </div>
  )
}

export default Languages
