const ListItem = ({ children, action = null, extraStyles = '', paddingX = 'px-3' }) => {
  return (
    <li onClick={action} className={`text-sm text-[#9B9B9B] font-medium h-8 flex items-center gap-2 rounded cursor-pointer ${paddingX} ${extraStyles}`}>
      {children}
    </li>
  )
}

export default ListItem
