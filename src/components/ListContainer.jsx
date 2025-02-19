const ListContainer = ({
  children,
  extraStyles = '',
  width = 'w-full',
  header = '',
  headerColor = '',
  padding = 'p-0',
}) => {
  return (
    <ul
      className={`${width} ${padding} mt-3 first-of-type:mt-0 ${extraStyles}`}
    >
      {header && (
        <span
          className={`${headerColor} mb-[2px] flex min-h-[24px] items-center justify-start px-3 text-xs`}
        >
          {header}
        </span>
      )}
      {children}
    </ul>
  )
}

export default ListContainer
