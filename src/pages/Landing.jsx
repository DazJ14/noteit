import { Link } from 'react-router-dom'
import appDesktopPicture from '../assets/landingpage-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Landing = () => {
  return (
    <div className='relative isolate min-h-full overflow-hidden bg-gray-900'>
      <div
        aria-hidden
        className='absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
      >
        <div
          className='aspect-1108/632 w-[69.25rem] bg-linear-to-r from-sky-300 to-indigo-600 opacity-20'
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>

      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
          <Link to='/' className='h-11 text-3xl font-bold text-white'>
            Noteit
          </Link>
          <h1 className='mt-24 text-4xl font-bold tracking-tight text-white sm:mt-32 sm:text-6xl lg:mt-16'>
            The WYSIWYG notes app that grows with you
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            Discover a new way to organize your projects with our all-in-one
            application. Organize ideas and tasks to keep everything in order.
            Connect elements together for a seamless and uninterrupted working
            experience.
          </p>
          <div className='mt-10 flex items-center gap-x-6'>
            <Link
              to='/register'
              className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400'
            >
              Start for free
            </Link>
            <Link
              to='/login'
              className='bg-transparent text-sm font-semibold leading-6 text-white'
            >
              sign in
              <FontAwesomeIcon
                className='ml-2'
                icon={faArrowRight}
                aria-hidden
              />
            </Link>
          </div>
        </div>
        <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
          <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
            <img
              className='w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10'
              src={appDesktopPicture}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
