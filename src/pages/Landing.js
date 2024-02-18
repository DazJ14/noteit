import { Link } from 'react-router-dom'
import appDesktopPicture from '../assets/appPicture.PNG'

const Landing = () => {
  return (
    <div className='w-full min-h-screen relative bg-orange-100 overflow-x-hidden'>
      <nav className='fixed z-50 top-4 left-0 w-full'>
        <div className='max-w-[1200px] mx-auto flex justify-between'>
          <Link to='/' className='text-2xl font-bold'>Noteit</Link>
          <div className='flex gap-4'>
            <Link to='/login' className='block px-3 py-1 hover:bg-orange-200 rounded transition-colors'>Login</Link>
            <Link to='/register' className='block px-3 py-1 bg-gray-950 hover:bg-gray-950/80 transition-colors text-white rounded'>Start for free</Link>
          </div>
        </div>
      </nav>
      <div className='h-screen w-full relative after:z-50 after:block after:absolute after:w-full after:h-80 after:content-[""] after:bg-gradient-to-t after:from-stone-900 after:to-transparent after:bottom-0'>
        <span className='absolute block text-4xl font-bold max-w-sm w-full text-center top-56 left-1/2 -translate-x-1/2'>
          The WYSIWYG notes app that grows with you
        </span>
        <img className='max-w-[1000px] w-full h-auto absolute bottom-0 left-1/2 -translate-x-1/2' src={appDesktopPicture} />
      </div>
    </div>
  )
}

export default Landing
