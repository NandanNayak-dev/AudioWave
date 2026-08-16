import { useState } from 'react'
import userData from '../../../../utils/userData'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GrClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Menu from './Menu'

const Container = styled.div`
  ${tw`mt-[1px]`}
`
const Avatar = styled.div`
  ${tw`flex items-center justify-center bg-cyan-600 text-white font-bold rounded-full w-9 h-9 cursor-pointer select-none border-2 border-white/20 hover:border-white/50 transition-colors shadow-lg`}
  font-size: 16px;
`

const UserProfile = () => {
  const [menu, showMenu] = useState(false)
  const userdata = userData()
  const navigate = useNavigate()

  function handleClick() {
    showMenu(!menu)
  }

  function handleLogout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    localStorage.removeItem('profilePic')
    localStorage.removeItem('liked')
    localStorage.removeItem('recentlyPlayed')
    localStorage.removeItem('customPlaylists')
    localStorage.removeItem('following')
    window.location.href = '/'
  }

  return (
    <AnimatePresence>
      <Container>
        <div onClick={handleClick}>
          {menu ? (
            <GrClose
              className='right-0 m-1 mt-1 opacity-80 p-[1px] cursor-pointer'
              size={24}
              color="white"
            />
          ) : (
            <Avatar>{userdata.username?.charAt(0)?.toUpperCase() || '?'}</Avatar>
          )}
        </div>

        <div className='relative right-0 w-auto'>
          {menu && <Menu userdata={userdata} handleLogout={handleLogout} closeMenu={() => showMenu(false)} />}
        </div>
      </Container>
    </AnimatePresence>
  )
}

export default UserProfile
