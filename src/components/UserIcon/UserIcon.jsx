const UserIcon = ({ username }) => {
  return (
    <span className='grid h-7 w-7 shrink-0 place-items-center rounded bg-lime-500 font-medium uppercase text-white'>
      {username[0]}
    </span>
  )
}

export default UserIcon
