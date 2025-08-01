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
    </div>
  );
}
