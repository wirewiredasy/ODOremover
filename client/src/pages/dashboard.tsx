import { motion } from "framer-motion";

const audioTools = [
  {
    name: "Vocal Remover",
    description: "Advanced AI-powered vocal isolation and removal from audio tracks",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12V4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
        <path d="M19 10V12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V10H19Z" fill="currentColor"/>
        <path d="M12 19V22H8V24H16V22H12V19Z" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-pink-500/20 to-purple-600/20",
    borderColor: "border-pink-400/30",
    shadowColor: "shadow-pink-500/20"
  },
  {
    name: "Pitch + Tempo",
    description: "Independently adjust pitch and tempo without quality loss",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V1L16 5L12 9V7C8.69 7 6 9.69 6 13S8.69 19 12 19S18 16.31 18 13H16C16 15.21 14.21 17 12 17S8 15.21 8 13S9.79 9 12 9Z" fill="currentColor"/>
        <circle cx="12" cy="13" r="2" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-blue-500/20 to-cyan-600/20",
    borderColor: "border-blue-400/30",
    shadowColor: "shadow-blue-500/20"
  },
  {
    name: "Audio Converter",
    description: "Convert between all major audio formats with high fidelity",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6H16V4H8V6ZM20 12V6C20 4.9 19.1 4 18 4H6C4.9 4 4 4.9 4 6V12C4 13.1 4.9 14 6 14H18C19.1 14 20 13.1 20 12ZM16 18H8V20H16V18Z" fill="currentColor"/>
        <circle cx="12" cy="9" r="2" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-400/30",
    shadowColor: "shadow-green-500/20"
  },
  {
    name: "Audio Joiner",
    description: "Seamlessly merge multiple audio files into one track",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 7H17V10L21 6L17 2V5H5V9H7V7ZM17 17H7V14L3 18L7 22V19H19V15H17V17Z" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-400/30",
    shadowColor: "shadow-orange-500/20"
  },
  {
    name: "Audio Cutter",
    description: "Precision cutting and trimming with waveform visualization",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.64 7.64C10.37 6.91 10.37 5.73 9.64 5C8.91 4.27 7.73 4.27 7 5C6.27 5.73 6.27 6.91 7 7.64L9.64 7.64ZM21 12L15 6L13.5 7.5L19.5 13.5L13.5 19.5L15 21L21 15V12ZM12.5 7.5L7 13L1.5 7.5L3 6L7 10L12.5 4.5L14 6L12.5 7.5Z" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-yellow-500/20 to-orange-600/20",
    borderColor: "border-yellow-400/30",
    shadowColor: "shadow-yellow-500/20"
  },
  {
    name: "Noise Reducer",
    description: "AI-powered noise reduction and audio enhancement",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 12C16.5 14.21 14.71 16 12.5 16C10.29 16 8.5 14.21 8.5 12C8.5 9.79 10.29 8 12.5 8C14.71 8 16.5 9.79 16.5 12ZM12.5 4C12.5 2.34 11.16 1 9.5 1S6.5 2.34 6.5 4V12C6.5 15.31 9.19 18 12.5 18S18.5 15.31 18.5 12V4C18.5 2.34 17.16 1 15.5 1S12.5 2.34 12.5 4Z" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-indigo-500/20 to-purple-600/20",
    borderColor: "border-indigo-400/30",
    shadowColor: "shadow-indigo-500/20"
  },
  {
    name: "Bass Booster",
    description: "Professional bass enhancement and frequency tuning",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-red-500/20 to-pink-600/20",
    borderColor: "border-red-400/30",
    shadowColor: "shadow-red-500/20"
  },
  {
    name: "Audio Player",
    description: "High-quality audio playback with advanced controls",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
      </svg>
    ),
    bgColor: "from-teal-500/20 to-blue-600/20",
    borderColor: "border-teal-400/30",
    shadowColor: "shadow-teal-500/20"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white">
      {/* Advanced 3D Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 via-purple-800/20 to-indigo-900/30 backdrop-blur-xl"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-xl shadow-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
                <div className="absolute inset-2 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12V4C10 2.9 10.9 2 12 2Z"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                ODOREMOVER
              </h1>
            </motion.div>
            <motion.nav 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">About</a>
              <button className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
                  Get Started
                </div>
              </button>
            </motion.nav>
          </div>
        </div>
      </header>

      {/* Advanced 3D Hero Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.h2 
            className="text-7xl md:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            <span className="text-white font-light">Audio Processing</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transform your audio with cutting-edge AI technology. Remove vocals, adjust tempo, and convert formats with studio-grade precision.
          </motion.p>

          {/* Advanced 3D Waveform */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex justify-center items-end space-x-1 h-24">
                {Array.from({ length: 60 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ height: 4 }}
                  >
                    <motion.div
                      className="w-1 bg-gradient-to-t from-emerald-400 via-blue-500 to-purple-600 rounded-full shadow-lg"
                      animate={{
                        height: [4, Math.random() * 60 + 10, 4],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 w-1 bg-gradient-to-t from-emerald-400 via-blue-500 to-purple-600 rounded-full blur-sm"
                      animate={{
                        height: [4, Math.random() * 60 + 10, 4],
                        opacity: [0.1, 0.5, 0.1]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl">
                Start Processing Audio
              </div>
            </button>
            <button className="group relative">
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300"></div>
              <div className="relative text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-300">
                Watch Demo
              </div>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Advanced 3D Tools Grid */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Audio Processing Tools
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Professional-grade tools powered by advanced AI algorithms for superior audio manipulation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {audioTools.map((tool, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50`}></div>
                <div className={`relative bg-gray-900/80 backdrop-blur-xl border ${tool.borderColor} rounded-3xl p-8 transition-all duration-500 group-hover:bg-gray-800/90 ${tool.shadowColor} shadow-2xl`}>
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.bgColor.replace('/20', '')} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      {tool.iconSvg}
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${tool.bgColor.replace('/20', '')} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors duration-300">
                    {tool.name}
                  </h4>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="font-medium">Fast Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span className="font-medium">High Quality</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced 3D Prefooter Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
          
          {/* Advanced Top Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotateX: 2, rotateY: 5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-slate-800/80 to-gray-900/80 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-left space-y-6">
                  <div>
                    <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      Oudio Remover
                    </h1>
                    <p className="text-gray-400 text-lg font-medium">Music Open Tool Freeway & Basic Feature</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-400 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
                        Oudio Rem
                      </div>
                    </button>
                    <button className="group relative">
                      <div className="absolute inset-0 bg-gray-700/50 rounded-2xl backdrop-blur-xl border border-gray-600/30 group-hover:bg-gray-600/50 transition-all duration-300"></div>
                      <div className="relative text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform duration-300">
                        Cootds
                      </div>
                    </button>
                  </div>
                </div>
                <div className="relative mt-10 md:mt-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="relative w-48 h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-violet-600 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="absolute inset-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-black/60 px-3 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border border-white/10">
                    Pitho
                  </div>
                  <div className="absolute top-16 left-4 bg-black/60 px-3 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border border-white/10">
                    Palter Bu
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Mid Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ rotateX: 2, rotateY: -5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-white/90 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 shadow-2xl"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative w-56 h-56 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 rounded-3xl shadow-2xl overflow-hidden">
                      <div className="absolute inset-6 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12V4C10 2.9 10.9 2 12 2ZM19 10V12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V10H19Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-gray-900 space-y-6">
                  <div>
                    <h2 className="text-4xl font-black mb-3 text-gray-900">Features</h2>
                    <p className="text-xl text-gray-600 font-semibold">Pithu (Phase 1 – Free 2-Stem)</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Advanced AI-powered audio processing tools designed for professional music production. 
                    Extract vocals, adjust tempo, and convert formats with studio-grade quality and precision.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-700 font-medium border border-gray-300 transition-colors duration-300">Airicbu</span>
                    <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-700 font-medium border border-gray-300 transition-colors duration-300">Dl Toor Pahe</span>
                    <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-700 font-medium border border-gray-300 transition-colors duration-300">XQ O4</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Tools Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { title: "Vocal Remover", subtitle: "(Sploter 2x)", gradient: "from-purple-400 to-orange-300", progress: 80, icon: "🎤" },
              { title: "Audio Cutter + Tempo Changer", subtitle: "Precision editing tools", gradient: "from-green-400 to-blue-300", progress: 75, icon: "⚡" },
              { title: "Audio Cutter / Joiner", subtitle: "Merge and split tracks", gradient: "from-indigo-400 to-pink-300", progress: 85, icon: "🔗" }
            ].map((tool, index) => (
              <motion.div 
                key={index}
                className="group relative"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60`}></div>
                <div className={`relative bg-gradient-to-r ${tool.gradient} rounded-3xl p-8 shadow-2xl text-gray-900 backdrop-blur-xl`}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm border border-white/20">
                      <span className="text-2xl">{tool.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{tool.title}</h3>
                      <p className="text-sm opacity-80 font-medium">{tool.subtitle}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Processing Quality</span>
                      <span>{tool.progress}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3 backdrop-blur-sm border border-white/20">
                      <div className="bg-white/70 h-3 rounded-full shadow-lg transition-all duration-1000" style={{ width: `${tool.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Advanced Controls Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ rotateX: 2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gray-800/80 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-gray-200">Volume Control</label>
                  <div className="relative">
                    <input 
                      type="range" 
                      className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider-purple"
                      defaultValue="75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-sm pointer-events-none"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 font-medium">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-gray-200">Tempo Adjustment</label>
                  <div className="relative">
                    <input 
                      type="range" 
                      className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider-orange"
                      defaultValue="50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-sm pointer-events-none"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 font-medium">
                    <span>0.5x</span>
                    <span>2.0x</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                  <div className="relative bg-gradient-to-r from-indigo-500 to-emerald-400 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl">
                    Rasteco Rorretast
                  </div>
                </button>
                <button className="group relative">
                  <div className="absolute inset-0 bg-gray-200/90 rounded-2xl backdrop-blur-xl border border-gray-300/50 group-hover:bg-gray-100/90 transition-all duration-300"></div>
                  <div className="relative text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300">
                    Sudon Cr'er Roao
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
