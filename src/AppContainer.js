import { Route, Navigate } from 'react-router-dom'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  Suspense,
  useEffect
  // useState
} from 'react'
import { initializeAuth } from './redux/reducers/userSlice'
import App from './pages/App'
import Body from './layout/app/Body'
import NoNoteSelected from './components/NoNoteSelected'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import RoutesWithNotFound from './utilities/routes-with-not-found'

const AppContainer = () => {
  const dispatch = useDispatch()
  const appAccess = useSelector((state) => state.user.access)
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    const logginUser = async () => {
      try {
        await dispatch(initializeAuth()).unwrap()
        // setLoading(false)
      } catch (error) {
        // setLoading(false)
        console.log('error status: ' + error)
        throw new Error(error)
      }
    }

    const localData = window.localStorage.getItem('loggedNoteitAppUser')

    if (localData) {
      // setLoading(true)
      logginUser()
    }
  }, [])

  // if (loading) {
  //   return (
  //     <div className='w-full h-full bg-orange-100 grid place-items-center'>
  //       <span className=' text-5xl font-bold'>
  //         Processing...
  //       </span>
  //     </div>
  //   )
  // }

  return (
    <Suspense fallback={
      <div>
        Processing...
      </div>
    }
    >
      <RoutesWithNotFound>
        <Route element={appAccess ? <Navigate to='/notes' /> : <Landing />} path='/' />
        <Route element={appAccess ? <Navigate to='/notes' /> : <Register />} path='register' />
        <Route element={appAccess ? <Navigate to='/notes' /> : <Login />} path='login' />
        <Route element={appAccess ? <App /> : <Navigate to='/login' />} path='notes'>
          <Route element={<NoNoteSelected />} index />
          <Route element={<Body />} path=':noteId' />
        </Route>
      </RoutesWithNotFound>
    </Suspense>
  )
}

export default AppContainer
