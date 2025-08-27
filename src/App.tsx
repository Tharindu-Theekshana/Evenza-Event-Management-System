import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from './pages/Login'
import EachEvent  from './components/EachEvent'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/eachEvent/:id' element={<EachEvent/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
