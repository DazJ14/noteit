const ListContainer = ({ children, extraStyles = '', width = 'w-full', header = '', headerColor = '' }) => {
  return (

    <ul className={`${width} p-1 first-of-type:mt-0 mt-3 ${extraStyles}`}>
      {header && <span className={`${headerColor} flex items-center justify-start text-xs px-3 mb-[2px] min-h-[24px]`}>{header}</span>}
      {children}
    </ul>
  )
}

export default ListContainer
