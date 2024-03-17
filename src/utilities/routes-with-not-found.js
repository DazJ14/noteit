import { Route, Routes } from 'react-router-dom'
// import ErrorPage from '../pages/ErrorPage'

const RoutesWithNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  )
}
export default RoutesWithNotFound
