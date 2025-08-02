import { motion } from "framer-motion";
import { 
  Mic, 
  Music, 
  FileAudio, 
  Link, 
  Scissors, 
  Shield, 
  Volume2, 
  Play, 
  Settings,
  Headphones 
} from "lucide-react";

const audioTools = [
  {
    name: "Vocal Remover",
    description: "AI-powered vocal isolation and removal with superior quality preservation",
    icon: Mic,
    gradient: "from-pink-500 to-rose-500",
    glowColor: "pink"
  },
  {
    name: "Pitch & Tempo",
    description: "Independent pitch and tempo adjustment without quality loss",
    icon: Music,
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "blue"
  },
  {
    name: "Audio Converter",
    description: "Convert between all major formats with professional quality",
    icon: FileAudio,
    gradient: "from-green-500 to-emerald-500",
    glowColor: "green"
  },
  {
    name: "Audio Joiner",
    description: "Seamlessly merge multiple audio files with smooth transitions",
    icon: Link,
    gradient: "from-orange-500 to-red-500",
    glowColor: "orange"
  },
  {
    name: "Audio Cutter",
    description: "Precision cutting with waveform visualization and frame accuracy",
    icon: Scissors,
    gradient: "from-yellow-500 to-orange-500",
    glowColor: "yellow"
  },
  {
    name: "Noise Reducer",
    description: "Advanced AI noise reduction and audio enhancement",
    icon: Shield,
    gradient: "from-indigo-500 to-purple-500",
    glowColor: "indigo"
  },
  {
    name: "Bass Booster",
    description: "Professional bass enhancement and frequency tuning",
    icon: Volume2,
    gradient: "from-red-500 to-pink-500",
    glowColor: "red"
  },
  {
    name: "Audio Player",
    description: "High-fidelity playback with advanced controls and visualization",
    icon: Play,
    gradient: "from-teal-500 to-blue-500",
    glowColor: "teal"
  },
  {
    name: "Equalizer",
    description: "Professional 10-band EQ with preset configurations",
    icon: Settings,
    gradient: "from-violet-500 to-purple-500",
    glowColor: "violet"
  },
  {
    name: "3D Audio",
    description: "Spatial audio processing and binaural enhancement",
    icon: Headphones,
    gradient: "from-cyan-500 to-blue-500",
    glowColor: "cyan"
  }
];

export default function ToolsSection() {
  return (
    <section id="tools" className="py-24 px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-8"
          >
            <Music size={16} className="text-violet-400" />
            <span className="text-sm text-gray-300">Professional Tools</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
            Audio Processing Suite
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Industry-standard tools powered by cutting-edge AI algorithms for professional audio manipulation and enhancement
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {audioTools.map((tool, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-20 rounded-3xl blur-xl group-hover:blur-2xl group-hover:opacity-40 transition-all duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 group-hover:bg-black/60 group-hover:border-white/20 shadow-2xl">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon size={24} />
                  </div>
                  <div className={`absolute inset-0 w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-100 transition-colors duration-300">
                  {tool.name}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {tool.description}
                </p>
                
                {/* Action Button */}
                <motion.button
                  className={`w-full bg-gradient-to-r ${tool.gradient} text-white py-2.5 rounded-xl font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  whileTap={{ scale: 0.95 }}
                >
                  Use Tool
                </motion.button>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            className="group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
            <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              Explore All Tools
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}