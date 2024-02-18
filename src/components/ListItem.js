const ListItem = ({ children, action = null, extraStyles = '' }) => {
  return (
    <li onClick={action} className={`text-sm text-[#9B9B9B] font-medium h-8 px-3 flex items-center gap-2 rounded cursor-pointer ${extraStyles}`}>
      {children}
    </li>
  )
}

export default ListItem
