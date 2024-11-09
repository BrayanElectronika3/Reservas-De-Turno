import './App.css'

import AppRouter from './AppRouter'
import HomePage from './pages/HomePage/HomePage'

import { ThemeProvider } from './ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AppRouter>
        <HomePage/>
      </AppRouter>
    </ThemeProvider>
  )
}

export default App