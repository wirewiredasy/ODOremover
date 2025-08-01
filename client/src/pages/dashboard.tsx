import { motion } from "framer-motion";
import WaveformAnimation from "@/components/waveform-animation";

const audioTools = [
  {
    id: "vocal_remover",
    name: "Vocal Remover",
    description: "Advanced feature to extract vocals from audio tracks with precision",
    value: "360.0000",
  },
  {
    id: "pitch_tempo",
    name: "Pitch + Tempo",
    description: "Adjust pitch and tempo of your audio files independently",
    value: "100.000",
  },
  {
    id: "audio_converter_joiner",
    name: "Audio Converter / Joiner",
    description: "Convert between formats and join multiple audio files seamlessly",
    value: "25.74.00",
  },
  {
    id: "audio_converter",
    name: "Audio Converter",
    description: "High quality audio conversion with customizable settings",
    value: "83.20.00/85",
  },
  {
    id: "audio_converter_batch",
    name: "Audio Converter",
    description: "Batch conversion for multiple files with different formats",
    value: "30.207.08.00",
  },
  {
    id: "cutting",
    name: "Cutting",
    description: "Precision cutting tool for audio editing and trimming",
    value: "22.200.080",
  },
  {
    id: "cutter_joiner",
    name: "Cutter / Joiner",
    description: "Cut and join audio files with sample-accurate precision",
    value: "25.74.00",
  },
  {
    id: "player",
    name: "Player",
    description: "High fidelity audio player with advanced controls",
    value: "29.82.00",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, hsl(220, 80%, 15%) 0%, hsl(10, 20%, 5%) 100%)' }}>
      <div className="odo-container">
        <motion.div 
          className="odo-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="odo-header px-6 py-8 text-center relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="odo-gradient-logo">
                <span className="text-white font-bold">🎵</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="odo-nav-link">Features</a>
                <a href="#" className="odo-nav-link">Pricing</a>
                <a href="#" className="odo-nav-link">Sign Up</a>
                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Sign up
                </button>
              </nav>
            </div>
            
            <motion.h1 
              className="text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              OdoRemover
            </motion.h1>
            <motion.p 
              className="text-purple-200 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Audio editing for multimedia editing
            </motion.p>

            <WaveformAnimation />

            <motion.button 
              className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Eodermover
            </motion.button>
          </div>

          {/* Tools Section */}
          <div className="p-6">
            {audioTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="odo-tool-card border-b border-gray-700/30 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="odo-tool-title">{tool.name}</div>
                <div className="odo-tool-desc">{tool.description}</div>
                <div className="odo-tool-value">{tool.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Terms Section */}
          <motion.div 
            className="bg-gray-900/50 px-6 py-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-4">
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-purple-400 transition-colors">Copyright Info</a>
            </div>

            <motion.button 
              className="odo-cta-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start editing free
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
