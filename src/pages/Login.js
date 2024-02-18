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

    if ((username && password)) {
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
    <div className='w-full h-full flex items-center justify-center bg-orange-100 relative'>
      <Link className='absolute text-2xl font-bold top-4 left-4 py-2 px-3' to='/'>Noteit</Link>
      <div className='bg-white p-5 rounded shadow-2xl w-[100%] h-full flex flex-col justify-center sm:block sm:h-auto sm:w-[400px]'>
        <h1 className='text-xl font-bold text-center'>Login</h1>

        {error && <FormErrorMessage error={error} />}

        <form className='my-5' onSubmit={handleLogin}>
          <Input inputId='username' value={username} placeholder='Put your username' type='text' labelText='Username' setValue={setUsername} />
          <Input inputId='password' value={password} placeholder='Put your password' type='password' labelText='Password' setValue={setPassword} passwordWithShowButton />

          <Submit disabled={loading}>Login</Submit>
        </form>

        <span className='text-center block text-sm'>
          Didn't have an account?
          <Link className='text-blue-600 ml-1' to='/register'>Register</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
