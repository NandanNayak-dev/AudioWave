import { useState, lazy } from 'react'
import { useDocumentTitle } from '@uidotdev/usehooks'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const Auth = lazy(() => import('../components/authentication/Auth'))
const Profile = lazy(() => import('../components/authentication/Profile'))
const AuthVisuals = lazy(() => import('../components/authentication/Video'))

const Languages = lazy(() => import('../components/authentication/firstLogin/Languages'))

const Authentication = () => {
  const [menu, setMenu] = useState('')
  const [userData, setUserData] = useState('')

  useDocumentTitle('Audiowave - Authentication')

  return (
    <div className='relative w-screen min-h-screen lg:h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-[#030014] text-white font-sans'>
      
      {/* Background Glow Effects */}
      <div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-700/30 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-700/20 rounded-full blur-[150px] pointer-events-none' />
      <div className='absolute top-[40%] left-[30%] w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none' />

      <AutoNavigate location='/dashboard' />
      
      <div className='relative z-10 flex flex-col lg:grid lg:grid-cols-2 w-full h-full min-h-screen'>
        
        {/* Left Side: Login Form */}
        <div className='flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-12 lg:py-0 order-2 lg:order-1 min-h-[100vh] lg:min-h-0'>
          
          {/* Branding */}
          <div className='mb-12'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]' />
              <h1 className='text-2xl font-black tracking-tight'>Audiowave</h1>
            </div>
            <p className='text-sm text-gray-400 font-medium mt-2 tracking-wide'>
              Your music. Your mood. Your world.
            </p>
          </div>

          <div className='w-full max-w-md mx-auto lg:mx-0'>
            {menu != 'languages' ? (
              <>
                {userData != '' ? (
                  <Profile data={userData} onNext={() => setMenu('languages')} />
                ) : (
                  <Auth data={(data) => setUserData(data)} />
                )}
              </>
            ) : (
              <Languages />
            )}
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className='order-1 lg:order-2 w-full h-[60vh] lg:h-full p-4 lg:p-8 flex items-center justify-center relative'>
          <AuthVisuals />
        </div>

      </div>
    </div>
  )
}

export default Authentication
