import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import MidSection from "../components/MidSection"
import Navbar from "../components/Navbar"
import TrendingEvents from "../components/TrendingEvents"


export default function Home() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <TrendingEvents/>
        <MidSection/>
        <Footer/>
    </div>
  )
}
