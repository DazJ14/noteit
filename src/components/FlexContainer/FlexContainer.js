const FlexContainer = ({ children, flexDirection = 'flex-row', height = 'h-full' }) => {
  return (
    <div className={`flex ${flexDirection} flex-nowrap ${height} relative overflow-hidden`}>
      {children}
    </div>
  )
}

export default FlexContainer
