import { motion } from "framer-motion";

const audioTools = [
  {
    name: "Vocal Remover",
    description: "Advanced AI-powered vocal isolation and removal from audio tracks",
    icon: "🎤",
    bgColor: "from-pink-500 to-purple-600",
    borderColor: "border-pink-400/50"
  },
  {
    name: "Pitch + Tempo",
    description: "Independently adjust pitch and tempo without quality loss",
    icon: "🎵",
    bgColor: "from-blue-500 to-cyan-600",
    borderColor: "border-blue-400/50"
  },
  {
    name: "Audio Converter",
    description: "Convert between all major audio formats with high fidelity",
    icon: "🔄",
    bgColor: "from-green-500 to-emerald-600",
    borderColor: "border-green-400/50"
  },
  {
    name: "Audio Joiner",
    description: "Seamlessly merge multiple audio files into one track",
    icon: "🔗",
    bgColor: "from-orange-500 to-red-600",
    borderColor: "border-orange-400/50"
  },
  {
    name: "Audio Cutter",
    description: "Precision cutting and trimming with waveform visualization",
    icon: "✂️",
    bgColor: "from-yellow-500 to-orange-600",
    borderColor: "border-yellow-400/50"
  },
  {
    name: "Noise Reducer",
    description: "AI-powered noise reduction and audio enhancement",
    icon: "🔇",
    bgColor: "from-indigo-500 to-purple-600",
    borderColor: "border-indigo-400/50"
  },
  {
    name: "Bass Booster",
    description: "Professional bass enhancement and frequency tuning",
    icon: "🔊",
    bgColor: "from-red-500 to-pink-600",
    borderColor: "border-red-400/50"
  },
  {
    name: "Audio Player",
    description: "High-quality audio playback with advanced controls",
    icon: "▶️",
    bgColor: "from-teal-500 to-blue-600",
    borderColor: "border-teal-400/50"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <h1 className="text-2xl font-bold text-white">ODOREMOVER</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Professional Audio Processing
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your audio with AI-powered tools for vocal removal, format conversion, and professional editing
          </p>

          {/* Animated Waveform */}
          <motion.div
            className="flex justify-center items-end space-x-1 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-green-400 to-blue-500 rounded-full"
                animate={{
                  height: [4, Math.random() * 40 + 10, 4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Start Processing Audio
          </motion.button>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4">Audio Processing Tools</h3>
            <p className="text-gray-400 text-lg">Professional-grade tools for all your audio editing needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audioTools.map((tool, index) => (
              <motion.div
                key={index}
                className={`bg-gray-900/50 backdrop-blur-sm border ${tool.borderColor} rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.bgColor} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">{tool.name}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span>⚡</span>
                    <span>Fast</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🎯</span>
                    <span>Precise</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exact Prefooter Design - Step by Step Implementation */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top Section (Dark) */}
          <motion.div 
            className="bg-gray-900 text-white p-8 flex flex-col md:flex-row justify-between items-center rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-2">Oudio Remover</h1>
              <p className="text-sm opacity-60 mb-6">Music Open Tool Freeway & Basic Feature</p>
              <div className="flex space-x-3">
                <button className="bg-gradient-to-r from-purple-500 to-orange-400 px-6 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-transform">
                  Oudio Rem
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg text-white transition-colors">
                  Cootds
                </button>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-6xl font-bold">
                👤
              </div>
              <div className="absolute top-2 left-2 bg-black/60 px-3 py-1 rounded-md text-xs backdrop-blur-sm">
                Pitho
              </div>
              <div className="absolute top-12 left-2 bg-black/60 px-3 py-1 rounded-md text-xs backdrop-blur-sm">
                Palter Bu
              </div>
            </div>
          </motion.div>

          {/* Mid Section (White) */}
          <motion.div 
            className="bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-300 to-gray-500 rounded-xl shadow-md flex items-center justify-center text-gray-600 text-7xl">
                👨‍💼
              </div>
            </div>
            <div className="text-black">
              <h2 className="text-3xl font-bold mb-2">Features</h2>
              <p className="text-lg text-gray-600 mb-4">Pithu (Phase 1 – Free 2-Stem)</p>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Advanced AI-powered audio processing tools designed for professional music production. 
                Extract vocals, adjust tempo, and convert formats with studio-grade quality.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="px-3 py-1 bg-gray-100 rounded-full">Airicbu</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Dl Toor Pahe</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">XQ O4</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section (Cards with Gradient Backgrounds) */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-purple-300 to-orange-200 p-6 rounded-xl text-gray-800 hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  🎤
                </div>
                <h3 className="text-lg font-bold">Vocal Remover</h3>
              </div>
              <p className="text-sm opacity-80">(Sploter 2x)</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Quality</span>
                  <span>High</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-300 to-blue-200 p-6 rounded-xl text-gray-800 hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  ⚡
                </div>
                <h3 className="text-lg font-bold">Audio Cutter + Tempo Changer</h3>
              </div>
              <p className="text-sm opacity-80">Precision editing tools</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Speed</span>
                  <span>Fast</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-300 to-pink-200 p-6 rounded-xl text-gray-800 hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  🔗
                </div>
                <h3 className="text-lg font-bold">Audio Cutter / Joiner</h3>
              </div>
              <p className="text-sm opacity-80">Merge and split tracks</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Precision</span>
                  <span>Perfect</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls with Sliders */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Volume Control</label>
                <input 
                  type="range" 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-purple"
                  defaultValue="75"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tempo Adjustment</label>
                <input 
                  type="range" 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
                  defaultValue="50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5x</span>
                  <span>2.0x</span>
                </div>
              </div>
            </div>

            {/* Bottom Gradient Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-indigo-500 to-green-400 px-8 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-transform shadow-lg">
                Rasteco Rorretast
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-lg text-black font-semibold transition-colors shadow-lg">
                Sudon Cr'er Roao
              </button>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
