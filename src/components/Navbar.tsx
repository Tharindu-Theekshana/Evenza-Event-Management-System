import { Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from '../lib/utils';

export default function Navbar() {

    const navItem = [
        {name: "Home", href: "/"},
        {name: "About", href: "#about"},
        {name: "Contact", href: "#contact"},
        {name: "Events", href: "#events"},
        {name: (
            <span className="flex items-center gap-1">
              <User size={20} />
              Login
            </span>
          ),
          href: "/login"},
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.screenY > 10);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  return (
    <nav className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
    )}>
      <div className='container flex items-center justify-between md:px-12 px-2'>
        <a className='text-2xl font-bold text-white flex items-center' href='#hero'>
            <span className='relative z-10 px-2'>Evenza</span>
        </a>

        <div className='hidden md:flex space-x-8 '>
            {navItem.map((item, key)=>(
                <a key={key} 
                href={item.href}
                className="text-white/80 hover:text-blue-400 block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 justify-center items-center gap-1 text-center">
                    {item.name}
                </a>
            ))}
        </div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50 mt-[-4px] "
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24}  className="text-white"/> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-black/75 backdroup-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItem.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-white/80 hover:text-white block text-lg px-3 py-2 rounded-md font-medium hover:bg-white/10 transition-all duration-300 justify-center items-center gap-1 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
