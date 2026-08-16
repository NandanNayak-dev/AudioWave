import { lazy, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { updateUsername } from '../../../../api/user.js'
const Languages = lazy(() => import('../../../authentication/firstLogin/Languages'))

const Heading = styled.div`
  ${tw`text-left px-2 my-1 rounded-md text-sm font-bold`}
  &:hover {
    background-color: #404040;
  }
`
const SubHeading = styled.div`
  ${tw`text-left py-1 rounded-md text-sm opacity-50`}
`

const Menu = ({ userdata, handleLogout, closeMenu }) => {
  const [menu, setMenu] = useState('default')
  const navigate = useNavigate()
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [username, setUsername] = useState(userdata.username)
  
  const localData = localStorage.getItem('following')
  const parsedData = localData ? JSON.parse(localData) : []
  const initialData = Array.isArray(parsedData) ? { data: parsedData } : parsedData
  const [followingResult] = useRQGlobalState('following', initialData)

  const actualData = followingResult?.data || initialData
  const followingList = Array.isArray(actualData?.data) ? actualData.data : (Array.isArray(actualData) ? actualData : [])

  const handleUsernameSave = async () => {
    setIsEditingUsername(false)
    if (username.trim() && username !== userdata.username) {
      try {
        const response = await updateUsername({
          username: username.trim(),
          profilePic: userdata.profilePic,
          userId: userdata.userId,
        })
        if (response) {
          localStorage.setItem('username', username.trim())
          // We could update userdata.username but relying on local state is fine here
        }
      } catch (error) {
        console.error(error)
        setUsername(userdata.username)
      }
    } else {
      setUsername(userdata.username)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUsernameSave()
    }
  }

  return (
    <motion.div
      className='absolute mt-3 drop-shadow-2xl right-0 z-10 p-2 w-64 rounded-md rounded-b-md bg-[#282828] border border-white/10'
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      {menu === 'languages' && (
        <Languages
          isMenu={true}
          onNext={() => setMenu('default')}
        />
      )}
      {menu === 'default' && (
        <>
          <Heading className="cursor-default hover:bg-transparent">
            Username <span className="text-xs text-gray-400 font-normal ml-2">(Click to edit)</span>
            {isEditingUsername ? (
              <input
                autoFocus
                type="text"
                className="w-full bg-black/50 text-white rounded px-2 py-1 mt-1 text-sm outline-none border border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={handleUsernameSave}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <SubHeading 
                onClick={() => setIsEditingUsername(true)} 
                className="cursor-pointer hover:text-cyan-400 hover:opacity-100 transition-colors"
              >
                {username}
              </SubHeading>
            )}
          </Heading>
          <Heading className="cursor-default hover:bg-transparent">
            Email<SubHeading>{userdata.email}</SubHeading>
          </Heading>
          <Heading className='cursor-pointer' onClick={() => setMenu('languages')}>
            Languages <span className="text-xs text-gray-400 font-normal">(Click to edit)</span><SubHeading>{userdata.languages}</SubHeading>
          </Heading>
          <Heading className="cursor-default hover:bg-transparent mb-2">
            Favorite Artists
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2 custom-scrollbar">
              {followingList.length === 0 ? (
                <span className="text-xs text-gray-500 font-normal">No favorite artists yet.</span>
              ) : (
                followingList.map((artist, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center gap-1 min-w-[50px] cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      navigate(`/dashboard/artist/${artist.id}`);
                      if (closeMenu) closeMenu();
                    }}
                  >
                    <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="text-[10px] font-semibold text-gray-400 text-center w-full truncate">{artist.name}</span>
                  </div>
                ))
              )}
            </div>
          </Heading>

          <Heading
            className='p-2 text-red-500 opacity-90 cursor-pointer mt-1 border-t border-white/10'
            onClick={handleLogout}
          >
            Log out
          </Heading>
        </>
      )}
    </motion.div>
  )
}

export default Menu
