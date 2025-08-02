import { useState } from "react";
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

interface ToolsProps {
  darkMode: boolean;
}

const audioTools = [
  {
    name: "Vocal Remover",
    description: "AI-powered vocal isolation and removal with superior quality",
    icon: Mic,
    gradient: "from-pink-500 to-rose-500",
    category: "Popular"
  },
  {
    name: "Pitch & Tempo",
    description: "Independent pitch and tempo adjustment without quality loss",
    icon: Music,
    gradient: "from-blue-500 to-cyan-500",
    category: "Audio"
  },
  {
    name: "Audio Converter",
    description: "Convert between all major formats with professional quality",
    icon: FileAudio,
    gradient: "from-green-500 to-emerald-500",
    category: "Convert"
  },
  {
    name: "Audio Joiner",
    description: "Seamlessly merge multiple audio files with smooth transitions",
    icon: Link,
    gradient: "from-orange-500 to-red-500",
    category: "Edit"
  },
  {
    name: "Audio Cutter",
    description: "Precision cutting with waveform visualization",
    icon: Scissors,
    gradient: "from-yellow-500 to-orange-500",
    category: "Edit"
  },
  {
    name: "Noise Reducer",
    description: "Advanced AI noise reduction and audio enhancement",
    icon: Shield,
    gradient: "from-indigo-500 to-purple-500",
    category: "Enhance"
  },
  {
    name: "Bass Booster",
    description: "Professional bass enhancement and frequency tuning",
    icon: Volume2,
    gradient: "from-red-500 to-pink-500",
    category: "Enhance"
  },
  {
    name: "Audio Player",
    description: "High-fidelity playback with advanced controls",
    icon: Play,
    gradient: "from-teal-500 to-blue-500",
    category: "Play"
  },
  {
    name: "Equalizer",
    description: "Professional 10-band EQ with preset configurations",
    icon: Settings,
    gradient: "from-violet-500 to-purple-500",
    category: "Enhance"
  },
  {
    name: "3D Audio",
    description: "Spatial audio processing and binaural enhancement",
    icon: Headphones,
    gradient: "from-cyan-500 to-blue-500",
    category: "Audio"
  }
];

export default function Tools({ darkMode }: ToolsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const categories = ["All", "Popular", "Audio", "Convert", "Edit", "Enhance", "Play"];
  
  const filteredTools = selectedCategory === "All" 
    ? audioTools 
    : audioTools.filter(tool => tool.category === selectedCategory);

  return (
    <section id="tools" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Audio Processing Tools
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Professional-grade tools powered by advanced AI algorithms for superior audio manipulation
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card */}
              <div className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                darkMode 
                  ? 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700/70 hover:border-gray-500' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              } backdrop-blur-sm shadow-lg hover:shadow-2xl`}
              onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
              >
                {/* Category Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-lg text-xs font-medium ${
                  darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tool.category}
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div className={`absolute inset-0 w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>
                
                {/* Content */}
                <h3 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {tool.name}
                </h3>
                
                <p className={`text-sm leading-relaxed mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {tool.description}
                </p>
                
                {/* Action Button */}
                <button className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  darkMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-500' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Use Tool
                </button>

                {/* Expand indicator */}
                {selectedTool === tool.name && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 pointer-events-none"></div>
                )}
              </div>

              {/* Expanded Tool Interface */}
              {selectedTool === tool.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 p-6 rounded-2xl ${
                    darkMode 
                      ? 'bg-gray-700/70 border border-gray-600' 
                      : 'bg-white border border-gray-200'
                  } shadow-lg`}
                >
                  <h4 className={`font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tool.name} Interface
                  </h4>
                  
                  {/* Tool-specific interface would go here */}
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-600/50' : 'bg-gray-50'
                  }`}>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {tool.name} processing interface will be loaded here with drag & drop functionality, settings, and preview options.
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTool(null);
                    }}
                    className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                      darkMode 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    Close
                  </button>
                </motion.div>
              )}
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
          <button className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 transition-transform duration-300">
              Explore All Tools
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}