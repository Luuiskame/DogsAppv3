
import { Routes, Route } from 'react-router-dom'
import './App.css'

//? components
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'

function App() {
  return(
    <main>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>

        <Route path='/home' element={<Home/>}/>

        <Route path='/detail/:id' element={<Detail/>}/>

      </Routes>
    </main>
  )
  
}

export default App
