
export default function HeroSection() {
  return (
    <section id="hero">
        <div className="h-screen bg-hover w-screen bg-center bg-no-repeat " style={{backgroundImage: "url('/images/bg.png')"}}>
        <div className="items-center flex justify-center w-full h-full flex-col bg-black/50">
        <h1 className="text-white text-4xl md:text-7xl text-center font-medium drop-shadow-lg ">
            Simplify Your Events With Evenza
        </h1>
        <p className="text-white text-lg md:text-4xl text-center py-5">Poweful tools to manage, organize, and celebrate.</p>
        <div className="mt-7 ">
        <input type="text" placeholder="Search Events By Name" className="bg-white w-[300px] md:w-[600px] px-4 md:px-9 py-4 text-lg rounded-full text-gray-800 focus:outline-none border-none focus:ring-blue-500"/>
        <button className="absolute transform -translate-x-20 py-4 md:mt-0 md:ml-4 px-6 md:px7 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-lg">Search</button>
        </div>
        </div>
        </div>

    </section>
  )
}
