import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from './pages/Login'

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
