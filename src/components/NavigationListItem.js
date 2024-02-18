import { NavLink } from 'react-router-dom'

const NavigationListItem = ({ children, href = '', textColor = 'text-black', extraStyles = '' }) => {
  return (
    <NavLink
      to={`/notes/${href}`}
      className={({ isActive }) => isActive
        ? `bg-[#3b3b3b] text-sm ${textColor} font-medium h-8 px-3 flex items-center gap-2 transition-colors rounded cursor-pointer ${extraStyles}`
        : `text-sm ${textColor} font-medium h-8 px-3 flex items-center gap-2 transition-colors rounded cursor-pointer ${extraStyles}`}
    >
      {children}
    </NavLink>
  )
}

export default NavigationListItem
