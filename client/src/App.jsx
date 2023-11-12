
import { Routes, Route } from 'react-router-dom'
import './App.css'

//? components
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import CreateDogForm from './components/CreateDogForm/CreateDogForm'
import ErrorNotFound from './components/ErrorNotFound/ErrorNotFound'

function App() {
  return(
    <main>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>

        <Route path='/home' element={<Home/>}/>

        <Route path='/detail/:id' element={<Detail/>}/>

        <Route path='/create-dog' element={<CreateDogForm/>}/>

        <Route path='/notfound' element={<ErrorNotFound/>}/>

      </Routes>
    </main>
  )
  
}

export default App
