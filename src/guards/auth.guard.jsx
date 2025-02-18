import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PublicRoutes } from '../routes'

const AuthGuard = () => {
  const userState = useSelector(state => state.user)
  return (
    userState.token ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />
  )
}

export default AuthGuard
