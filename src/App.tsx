import { Route,Routes } from 'react-router-dom'
import HistoryPage from './HistoryPage'
import HomePage from './Homepage'

const App = () => {
 
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  )
}

export default App