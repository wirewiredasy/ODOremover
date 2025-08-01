import { motion } from "framer-motion";

const tools = [
  { title: 'Vocal Remover', icon: '🎤', bg: 'bg-green-200', desc: 'Remove vocals from any song' },
  { title: 'Pitch + Tempo', icon: '🎵', bg: 'bg-blue-200', desc: 'Change speed and pitch' },
  { title: 'Audio Converter', icon: '🎧', bg: 'bg-orange-200', desc: 'Convert to any format' },
  { title: 'Audio', icon: '📁', bg: 'bg-indigo-200', desc: 'Manage your files' },
  { title: 'Audio Converter', icon: '🔄', bg: 'bg-gray-200', desc: 'Batch conversion tool' },
  { title: 'Cutting', icon: '✂️', bg: 'bg-yellow-200', desc: 'Trim and cut audio' },
  { title: 'Cutter / Joiner', icon: '➕', bg: 'bg-red-200', desc: 'Split and merge tracks' },
  { title: 'Player', icon: '▶️', bg: 'bg-white text-black', desc: 'Advanced audio player' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-gray-900 to-black text-white font-sans">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 px-8">
        <div className="text-xl font-bold flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-400" />
          Odoremover
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">Sign Up</a>
          <button className="bg-white text-black px-4 py-1 rounded-full font-semibold">Sign up</button>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold">Odoremover</h1>
        <p className="text-gray-400 mt-2">Audio editing for free illusion detections</p>

        {/* Animated waveform */}
        <motion.div
          className="flex justify-center gap-1 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-400 rounded"
              animate={{ height: [10, 30, 10] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        <button className="mt-10 px-6 py-2 bg-white text-black rounded-full font-bold shadow-lg hover:scale-105 transition">
          Eodermover
        </button>
      </div>

      {/* Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 mt-16">
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-800 rounded-2xl p-4 hover:shadow-xl transition hover:scale-[1.02]"
            whileHover={{ scale: 1.03 }}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded ${tool.bg} text-xl mb-4`}>
              {tool.icon}
            </div>
            <h2 className="text-lg font-semibold mb-2">{tool.title}</h2>
            <p className="text-sm text-gray-400">{tool.desc}</p>
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>⏱ 02:30</span>
              <span>📥 12,000</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Pre-Footer Section */}
      <div className="relative mt-20 mb-10 mx-8">
        <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden relative">
          {/* 3D Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-800/20 to-blue-800/30"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-400 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 p-12">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transform Your Audio Experience
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of creators using ODOREMOVER's advanced audio processing technology
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-3xl font-bold text-green-400 mb-2">1M+</div>
                <div className="text-sm text-gray-300">Files Processed</div>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">500K+</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-300">Uptime</div>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">10</div>
                <div className="text-sm text-gray-300">AI Tools</div>
              </motion.div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-300 text-sm">Process audio files in seconds with our optimized AI algorithms</p>
              </motion.div>

              <motion.div 
                className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-white mb-2">Precision Quality</h3>
                <p className="text-gray-300 text-sm">Studio-grade processing with lossless quality preservation</p>
              </motion.div>

              <motion.div 
                className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-400/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-2xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
                <p className="text-gray-300 text-sm">Your files are processed securely and never stored permanently</p>
              </motion.div>
            </div>

            {/* CTA Section */}
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
                Start Processing Audio Now
              </motion.button>
              <p className="text-gray-400 text-sm mt-4">No registration required • Free to start</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
