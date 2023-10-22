
import { Routes, Route } from 'react-router-dom'
import './App.css'

//? components
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'

function App() {
  return(
    <main>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>

        <Route path='/home' element={<Home/>}/>

      </Routes>
    </main>
  )
  
}

export default App
