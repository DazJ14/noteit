const UserIcon = ({ username }) => {
  return (
    <span className='w-7 h-7 grid place-items-center uppercase bg-lime-500 rounded font-medium shrink-0 text-white'>
      {username[0]}
    </span>
  )
}

export default UserIcon
