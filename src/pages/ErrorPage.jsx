import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div className='flex h-full w-full flex-col items-center justify-center bg-[#191919]'>
      <span className='mx-auto block w-fit text-3xl text-[#9B9B9B]'>
        Error {error.status} has ocurred!
      </span>
      <span className='mx-auto block w-fit text-xl text-[#9B9B9B]'>
        {error.statusText || error.message}
      </span>
    </div>
  )
}

export default ErrorPage
