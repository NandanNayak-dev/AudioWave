import { useState, lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { updateUsername } from '../../api/user.js'
import { motion } from 'framer-motion'
const SendButton = lazy(() => import('./SendButton'))

const Container = styled.div`
  ${tw`grid justify-center`}
`
const Heading = styled.div`
  ${tw`text-2xl mb-2 font-bold text-center`}
`
const Avatar = styled.div`
  ${tw`flex items-center justify-center bg-cyan-600 text-white font-bold rounded-full border-4 border-white/10 shadow-lg`}
  width: 120px;
  height: 120px;
  font-size: 64px;
`
const Input = styled.input`
  ${tw`w-full text-lg p-3 my-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20`}
  &:focus {
    outline: none;
    ${tw`border-white/60 bg-white/20`}
  }
`

const Profile = ({ data, onNext, alreadyLoggedIn }) => {
  const [name, setName] = useState('')
  const userId = data.userId
  const email = data.email

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleSkip = async () => {
    await setDataLocally(data)
    onNext()
  }

  const handleNext = async () => {
    try {
      if (name || data.username) {
        let params
        if (alreadyLoggedIn) {
          params = {
            username: data.username,
            userId: data.userId,
          }
        } else params = { username: name, userId: userId }
        const response = await updateUsername(params)
        if (response) {
          await setDataLocally(response)
          onNext()
        } else {
          console.log(response.error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setDataLocally = async (data) => {
    localStorage.removeItem('liked')
    localStorage.removeItem('recentlyPlayed')
    localStorage.removeItem('customPlaylists')
    localStorage.removeItem('following')

    localStorage.setItem('userId', userId)
    localStorage.setItem('email', email)
    localStorage.setItem('username', data.username)

    const { pullUserLibrary } = await import('../../api/sync.js')
    await pullUserLibrary(userId)
  }

  return (
    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 0.9 }}>
      {!alreadyLoggedIn && (
        <Heading>{'Complete your Profile'}</Heading>
      )}
      <Container>
        <div className="w-full flex justify-center mb-6">
          <Avatar>
            {(alreadyLoggedIn ? data.username : (name || data.username))?.charAt(0)?.toUpperCase() || '?'}
          </Avatar>
        </div>
      </Container>
      {alreadyLoggedIn ? (
        <div className="flex flex-col items-center mt-2 w-full">
          <span className="text-xl font-bold">{data.username}</span>
          <span className="text-sm text-gray-400 mb-6">{data.email}</span>
          
          <div className="w-full">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 text-left">Favorite Artists</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {(() => {
                const followingStr = localStorage.getItem('following')
                let artists = []
                try {
                  const parsed = followingStr ? JSON.parse(followingStr) : []
                  artists = Array.isArray(parsed?.data) ? parsed.data : (Array.isArray(parsed) ? parsed : [])
                } catch(e) {}
                
                if (artists.length === 0) {
                  return <span className="text-sm text-gray-500">No favorite artists yet.</span>
                }
                
                return artists.map((artist, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 min-w-[70px]">
                    <img src={artist.image} alt={artist.name} className="w-14 h-14 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-gray-400 text-center w-full truncate">{artist.name}</span>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>
      ) : (
        <Input
          placeholder='Name'
          type='name'
          value={name}
          onChange={handleName}
          autoComplete='off'
        />
      )}
      {!alreadyLoggedIn && (
        <div className='grid grid-cols-2 space-x-1 mt-4'>
          <SendButton value='Skip' onclick={handleSkip} />
          <SendButton value='Next' onclick={handleNext} />
        </div>
      )}
    </motion.div>
  )
}

export default Profile
