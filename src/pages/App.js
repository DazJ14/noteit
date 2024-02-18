import Navbar from '../layout/app/Navbar'
import FlexContainer from '../components/FlexContainer/FlexContainer'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <FlexContainer flexDirection='flex-row'>
      <Navbar />
      <Outlet />
    </FlexContainer>
  )
}

export default App
