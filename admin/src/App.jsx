import { BrowserRouter } from 'react-router-dom'
import DataProvider from './Context/DataProvider'
import HomePage from './Pages/HomePage'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
