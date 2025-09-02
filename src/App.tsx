import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from './pages/Login'
import EachEvent  from './components/EachEvent'
import About from './pages/About'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import CustomerDashboard from './components/CustomerDashboard'
import OrganizerDashboard from './components/OrganizerDashboard'
import AdminDashboard from './components/AdminDashboard'
import MakeBooking from './components/MakeBooking'
import TotalEvents from './components/TotalEvents'
import EventsByStatus from './components/EventsByStatus'
import CreateEvent from './components/CreateEvent'
import Settings from './components/Settings'
import MyBookings from './components/MyBookings'
import RefundedBookings from './components/RefundedBookings'
import CreateAdmin from './components/CreateAdmin'
import AllCustomers from './components/AllCustomers'
import AllOrganizers from './components/AllOrganizers'
import AdminEventsByStatys from './components/AdminEventsByStatys'

function App() {
 

  return (
    <>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/eachEvent/:id' element={<EachEvent/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
          <Route path='/organizerDashboard' element={<OrganizerDashboard/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/makeBooking' element={<MakeBooking/>}/>
          <Route path='/totalEvents' element={<TotalEvents/>}/>
          <Route path='/eventsByStatus' element={<EventsByStatus/>}/>
          <Route path='/createEvent' element={<CreateEvent/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/myBookings' element={<MyBookings/>}/>
          <Route path='/refundedBookings' element={<RefundedBookings/>}/>
          <Route path='/createAdmin' element={<CreateAdmin/>}/>
          <Route path='/allCustomers' element={<AllCustomers/>}/>
          <Route path='/allOrganizers' element={<AllOrganizers/>}/>
          <Route path='/adminEvents' element={<AdminEventsByStatys/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
