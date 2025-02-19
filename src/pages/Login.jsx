/* eslint-disable indent */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/reducers/userSlice'
import { useNavigate, Link } from 'react-router-dom'
import Submit from '../components/forms/Submit'
import Input from '../components/forms/Input'
import FormErrorMessage from '../components/forms/FormErrorMessage'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (username && password) {
      try {
        setLoading(true)

        await dispatch(loginUser({ username, password })).unwrap()
        setUsername('')
        setPassword('')
        navigate('/notes')
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Link
          className='mx-auto block h-10 w-auto text-center text-3xl font-bold text-white'
          to='/'
        >
          Noteit
        </Link>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
          Sign in to your account
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        {error && <FormErrorMessage error={error} />}

        <form className='space-y-6' onSubmit={handleLogin}>
          <Input
            inputId='username'
            value={username}
            placeholder='Put your username'
            type='text'
            labelText='Username'
            setValue={setUsername}
          />
          <Input
            inputId='password'
            value={password}
            placeholder='Put your password'
            type='password'
            labelText='Password'
            setValue={setPassword}
            passwordWithShowButton
          />

          <Submit disabled={loading}>Sign in</Submit>
        </form>

        <p className='mt-10 text-center text-sm text-gray-400'>
          Didn't have an account?{' '}
          <Link
            className='font-semibold leading-6 text-indigo-500 hover:text-indigo-300'
            to='/register'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
