import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div className='w-full h-full bg-[#191919] flex flex-col items-center justify-center'>
      <span className='text-3xl text-[#9B9B9B] block mx-auto w-fit'>Error {error.status} has ocurred!</span>
      <span className='text-xl text-[#9B9B9B] block mx-auto w-fit'>{error.statusText || error.message}</span>
    </div>
  )
}

export default ErrorPage
