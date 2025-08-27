import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import TrendingEvents from "../components/TrendingEvents"


export default function Home() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <TrendingEvents/>
        <Footer/>
    </div>
  )
}
