import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../redux/reducers/userSlice'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../components/forms/Input'
import Submit from '../components/forms/Submit'
import FormErrorMessage from '../components/forms/FormErrorMessage'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async event => {
    event.preventDefault()

    if (username && password && repeatedPassword) {
      if (password === repeatedPassword) {
        try {
          setLoading(true)
          await dispatch(createNewUser({ username, password })).unwrap()

          setUsername('')
          setPassword('')
          setRepeatedPassword('')
          navigate('/notes')
        } catch (error) {
          setLoading(false)
          setError(error.message)
        }
      } else {
        setError("Password didn't match")
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
          Sign up a new account
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        {error && <FormErrorMessage error={error} />}
        <form className='space-y-6' onSubmit={handleRegister}>
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
          <Input
            inputId='confirmPassword'
            value={repeatedPassword}
            placeholder='Confirm your password'
            type='password'
            labelText='Confirm password'
            setValue={setRepeatedPassword}
          />

          <Submit disabled={loading}>Register</Submit>
        </form>

        <p className='mt-10 text-center text-sm text-gray-400'>
          Already have an account?{' '}
          <Link
            className='font-semibold leading-6 text-indigo-500 hover:text-indigo-300'
            to='/login'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
