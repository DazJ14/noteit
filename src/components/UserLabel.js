import UserIcon from './UserIcon/UserIcon'
import { useSelector } from 'react-redux'

const UserLabel = () => {
  const user = useSelector((state) => state.user?.username)

  return (
    <>
      <UserIcon username={user} />
      <span className='grow line-clamp-1 shrink text-white text-sm text-left'>{user}</span>
    </>
  )
}

export default UserLabel
