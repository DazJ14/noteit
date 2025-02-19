import UserIcon from './UserIcon/UserIcon'
import { useSelector } from 'react-redux'

const UserLabel = () => {
  const user = useSelector((state) => state.user?.username)

  return (
    <>
      <UserIcon username={user} />
      <span className='line-clamp-1 shrink grow text-left text-sm text-white'>
        {user}
      </span>
    </>
  )
}

export default UserLabel
