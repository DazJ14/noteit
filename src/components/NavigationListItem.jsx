import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const NavigationListItem = ({
  children,
  href = '',
  extraStyles = '',
  paddingX = 'px-3',
}) => {
  return (
    <NavLink
      to={`/notes/${href}`}
      className={({ isActive }) =>
        clsx(
          isActive && 'bg-[#3b3b3b]',
          `flex h-8 cursor-pointer items-center gap-2 rounded text-sm font-medium text-[#9B9B9B] ${paddingX} ${extraStyles}`
        )
      }
    >
      {children}
    </NavLink>
  )
}

export default NavigationListItem

// text-sm text-[#9B9B9B] font-medium h-8 ${paddingX} flex items-center gap-2 transition-colors rounded cursor-pointer ${extraStyles}
