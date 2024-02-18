import { Route, Routes, Navigate } from 'react-router-dom'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  useEffect,
  useState
} from 'react'
import { initializeAuth } from './redux/reducers/userSlice'
import App from './pages/App'
import Body from './layout/app/Body'
import NoNoteSelected from './components/NoNoteSelected'
import Landing from './pages/Landing'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Register from './pages/Register'

const AppContainer = () => {
  const dispatch = useDispatch()
  const appAccess = useSelector((state) => state.user.access)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const logginUser = async () => {
      try {
        await dispatch(initializeAuth()).unwrap()
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('error status: ' + error)
      }
    }

    const localData = window.localStorage.getItem('loggedNoteitAppUser')

    if (localData) {
      setLoading(true)
      logginUser()
    }
  }, [])

  if (loading) {
    return (
      <div className='w-full h-full bg-orange-100 grid place-items-center'>
        <span className=' text-5xl font-bold'>
          Processing...
        </span>
      </div>
    )
  }

  return (
    <Routes>
      <Route element={appAccess ? <Navigate to='/notes' /> : <Landing />} path='/' errorElement={<ErrorPage />} />
      <Route element={appAccess ? <Navigate to='/notes' /> : <Register />} path='register' />
      <Route element={appAccess ? <Navigate to='/notes' /> : <Login />} path='login' />
      <Route element={appAccess ? <App /> : <Navigate to='/login' />} path='notes'>
        <Route element={<NoNoteSelected />} index />
        <Route element={<Body />} path=':noteId' />
      </Route>
    </Routes>
  )
}

export default AppContainer
