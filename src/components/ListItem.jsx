const ListItem = ({
  children,
  action = null,
  extraStyles = '',
  paddingX = 'px-3',
}) => {
  return (
    <li
      onClick={action}
      className={`flex h-8 cursor-pointer items-center gap-2 rounded text-sm font-medium text-[#9B9B9B] ${paddingX} ${extraStyles}`}
    >
      {children}
    </li>
  )
}

export default ListItem
