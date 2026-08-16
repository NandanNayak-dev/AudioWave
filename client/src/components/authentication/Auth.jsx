import { useState, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { register, login } from '../../api/user.js'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
const SendButton = lazy(() => import('./SendButton'))

const Auth = ({ data }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('Login')
  const [response, setResponse] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const changeMenu = () => {
    type === 'Login' ? setType('Sign Up') : setType('Login')
    setEmail('')
    setPassword('')
    setResponse('')
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      if (email.length === 0 || password.length === 0) {
        setResponse('Fields cannot be empty')
        return
      }
      const userData = { email: email, password: password }
      const registeredUser = await register(userData)
      if (registeredUser && !registeredUser.error) {
        const loggedInUser = await login(userData)
        if (loggedInUser?.data) {
          setResponse(loggedInUser.message || 'Registration successful!')
          data(loggedInUser.data)
        } else {
          setResponse(loggedInUser?.error || 'Login after registration failed')
        }
      } else {
        setResponse(registeredUser?.error || 'Registration failed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (email.length === 0 || password.length === 0) {
        setResponse('Fields cannot be empty')
        return
      }
      const userData = { email: email, password: password }
      const loggedInUser = await login(userData)
      if (loggedInUser?.data) {
        setResponse('Successfully Logged In')
        setDataLocally(loggedInUser.data)
        navigate('/dashboard')
      } else {
        setResponse(loggedInUser?.error || 'Login failed')
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

    localStorage.setItem('userId', data.userId)
    localStorage.setItem('email', data.email)
    localStorage.setItem('username', data.username)
    localStorage.setItem('profilePic', data.profilePic)
    localStorage.setItem('languages', data.languages)

    const { pullUserLibrary } = await import('../../api/sync.js')
    await pullUserLibrary(data.userId)
  }

  return (
    <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative'>
      <div className='mb-8'>
        <h2 className='text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight'>
          Welcome to Audiowave!
        </h2>
        <p className='text-gray-400 font-medium text-sm lg:text-base'>
          Embrace the Rhythm of Your Soul
        </p>
      </div>

      <form onSubmit={type === 'Login' ? handleLogin : handleRegistration} className='flex flex-col gap-5'>
        
        {/* Email Input */}
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
            <FiMail className='text-gray-400' size={20} />
          </div>
          <input
            autoFocus={true}
            placeholder='Email Address'
            type='email'
            value={email}
            onChange={handleEmail}
            autoComplete='off'
            className='w-full h-14 pl-12 pr-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all'
          />
        </div>

        {/* Password Input */}
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
            <FiLock className='text-gray-400' size={20} />
          </div>
          <input
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            autoComplete='off'
            className='w-full h-14 pl-12 pr-12 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors'
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Error Message */}
        <div className='text-pink-400 text-sm font-medium text-center h-4'>
          {response}
        </div>

        <SendButton value={type === 'Login' ? 'Login →' : 'Sign Up →'} />
      </form>

      <div className='mt-8 flex justify-center items-center gap-2'>
        <span className='text-gray-400 text-sm font-medium'>
          {type === 'Login' ? 'New to Audiowave?' : 'Existing User?'}
        </span>
        <button 
          onClick={changeMenu}
          className='text-purple-400 hover:text-cyan-400 font-bold text-sm transition-colors focus:outline-none'
        >
          {type === 'Login' ? 'Sign Up now' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default Auth
