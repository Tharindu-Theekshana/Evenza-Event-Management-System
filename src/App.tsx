import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from './pages/Login'
import EachEvent  from './components/EachEvent'

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/eachEvent/:id' element={<EachEvent/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
