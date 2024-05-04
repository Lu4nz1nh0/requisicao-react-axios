import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Rotas from './Rotas'
import Navbar from './components/Navbar'
import { AuthProvider } from './AuthContext'

function App() { 
   
   return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Rotas/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
