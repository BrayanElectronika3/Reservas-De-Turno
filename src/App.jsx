import './App.css'

import AppRouter from './AppRouter'
import HomePage from './pages/HomePage/HomePage'

function App() {
  return (
    <AppRouter>
      <HomePage/>
    </AppRouter>
  )
}

export default App