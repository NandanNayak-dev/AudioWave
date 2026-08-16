import { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'

const SendButton = ({ value, onclick }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading)
      }, 1000)
    }
  }, [loading])

  const LoadingComponent = (
    <BallTriangle
      height={30}
      width={30}
      radius={4}
      color='#FFFFFF'
      ariaLabel='ball-triangle-loading'
      visible={true}
    />
  )

  return (
    <button
      onClick={() => {
        if (onclick) onclick()
        setLoading(true)
      }}
      type='submit'
      className='group relative w-full h-14 mt-2 flex justify-center items-center rounded-xl bg-purple-600 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:bg-purple-500 hover:-translate-y-1'
    >
      <div className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      <span className='relative z-10 flex items-center justify-center gap-2 tracking-wide'>
        {loading ? LoadingComponent : value}
      </span>
    </button>
  )
}

export default SendButton
