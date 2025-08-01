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

      {/* Premium 3D Stats Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50 rounded-3xl backdrop-blur-xl border border-purple-500/20 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-400/30 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h3 className="text-4xl font-bold mb-4 text-white">Trusted by Millions</h3>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Join the community of creators and professionals using ODOREMOVER
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                {[
                  { number: "1M+", label: "Files Processed", color: "text-green-400" },
                  { number: "500K+", label: "Active Users", color: "text-blue-400" },
                  { number: "99.9%", label: "Uptime", color: "text-purple-400" },
                  { number: "10", label: "AI Tools", color: "text-yellow-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className={`text-4xl font-bold ${stat.color} mb-3`}>{stat.number}</div>
                    <div className="text-gray-300 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: "🚀", title: "Lightning Fast", desc: "Process files in seconds with optimized algorithms" },
                  { icon: "🎯", title: "Studio Quality", desc: "Professional-grade processing with zero quality loss" },
                  { icon: "🔒", title: "100% Secure", desc: "Your files are processed locally and never stored" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm"
                    initial={{ opacity: 0, x: index === 0 ? -30 : index === 1 ? 0 : 30, y: index === 1 ? -30 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, rotateX: 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                    <p className="text-gray-300">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Transform Your Audio Today
                </motion.button>
                <p className="text-gray-400 mt-4">Free to start • No credit card required</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
