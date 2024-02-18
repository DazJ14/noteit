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

  const handleRegister = async (event) => {
    event.preventDefault()

    if ((username && password && repeatedPassword)) {
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
    <div className='w-full h-full flex items-center justify-center bg-orange-100 relative'>
      <Link className='absolute text-2xl font-bold top-4 left-4 py-2 px-3' to='/'>Noteit</Link>
      <div className='bg-white p-5 rounded shadow-2xl w-[100%] h-full flex flex-col justify-center sm:block sm:h-auto sm:w-[400px]'>
        <h1 className='text-xl font-bold text-center'>Register</h1>
        {error && <FormErrorMessage error={error} />}
        <form
          className='my-5' onSubmit={handleRegister}
        >
          <Input inputId='username' value={username} placeholder='Put your username' type='text' labelText='Username' setValue={setUsername} />
          <Input inputId='password' value={password} placeholder='Put your password' type='password' labelText='Password' setValue={setPassword} passwordWithShowButton />
          <Input inputId='confirmPassword' value={repeatedPassword} placeholder='Confirm your password' type='password' labelText='Confirm password' setValue={setRepeatedPassword} />

          <Submit disabled={loading}>Register</Submit>
        </form>

        <span className='text-center block text-sm'>
          Already have an account?
          <Link className='text-blue-600 ml-1' to='/login'>Login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
