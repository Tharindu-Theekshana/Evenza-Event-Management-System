import { ArrowDown, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative">
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{backgroundImage: "url('/images/bg.png')"}}
      >
        <div className="absolute inset-0 "></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white leading-tight">
                Simplify Your Events With Evenza
                
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 font-light max-w-3xl mx-auto">
                Powerful tools to manage, organize, and celebrate.
              </p>
            </div>

            <div className="mt-12 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-2xl overflow-hidden border border-white/20">
                  <input
                    type="text"
                    placeholder="Search events by name..."
                    className="flex-1 px-6 sm:px-8 py-4 sm:py-4 text-base sm:text-lg text-gray-800 bg-transparent focus:outline-none placeholder-gray-500"
                  />
                  <button className="flex items-center gap-2 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats or features preview */}
            <div className="md:mt-16 mt-0 grid grid-cols-1 sm:grid-cols-3 md:gap-8 gap-4 max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">10K+</div>
                <div className="text-sm sm:text-base text-blue-100">Events Managed</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">50K+</div>
                <div className="text-sm sm:text-base text-blue-100">Happy Users</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">99%</div>
                <div className="text-sm sm:text-base text-blue-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute md:bottom-8 bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer group">
          <span className="text-sm text-blue-200 mb-3 group-hover:text-white transition-colors">
            Discover More
          </span>
          <div className="p-2 rounded-full border border-blue-300/30 group-hover:border-blue-300/60 transition-colors">
            <ArrowDown className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-500 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-60 left-1/4 w-2 h-2 bg-blue-200 rounded-full animate-pulse opacity-50"></div>
      </div>
    </section>
  );
}