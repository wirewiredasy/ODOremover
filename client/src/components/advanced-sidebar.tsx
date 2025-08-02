import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, Music, FileAudio, Link, Scissors, Shield, Volume2, 
  Play, Settings, Headphones, ChevronLeft, ChevronRight, 
  Sparkles, Zap, Star, Search
} from "lucide-react";

interface AdvancedSidebarProps {
  darkMode: boolean;
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

const audioTools = [
  { 
    id: "vocal-remover", 
    name: "Vocal Remover", 
    icon: Mic, 
    color: "from-pink-500 to-rose-500",
    badge: "Popular",
    description: "AI-powered vocal isolation"
  },
  { 
    id: "pitch-tempo", 
    name: "Pitch & Tempo", 
    icon: Music, 
    color: "from-blue-500 to-cyan-500",
    badge: "Pro",
    description: "Independent pitch/tempo control"
  },
  { 
    id: "converter", 
    name: "Format Converter", 
    icon: FileAudio, 
    color: "from-green-500 to-emerald-500",
    badge: "Fast",
    description: "Universal format conversion"
  },
  { 
    id: "joiner", 
    name: "Audio Joiner", 
    icon: Link, 
    color: "from-orange-500 to-red-500",
    badge: "New",
    description: "Seamless audio merging"
  },
  { 
    id: "cutter", 
    name: "Audio Cutter", 
    icon: Scissors, 
    color: "from-yellow-500 to-orange-500",
    badge: "Precise",
    description: "Professional audio trimming"
  },
  { 
    id: "noise-reducer", 
    name: "Noise Reducer", 
    icon: Shield, 
    color: "from-indigo-500 to-purple-500",
    badge: "AI",
    description: "Advanced noise removal"
  },
  { 
    id: "bass-booster", 
    name: "Bass Booster", 
    icon: Volume2, 
    color: "from-red-500 to-pink-500",
    badge: "Studio",
    description: "Professional bass enhancement"
  },
  { 
    id: "player", 
    name: "Audio Player", 
    icon: Play, 
    color: "from-teal-500 to-blue-500",
    badge: "HD",
    description: "High-fidelity playback"
  },
  { 
    id: "equalizer", 
    name: "Equalizer", 
    icon: Settings, 
    color: "from-violet-500 to-purple-500",
    badge: "Pro",
    description: "10-band professional EQ"
  },
  { 
    id: "3d-audio", 
    name: "3D Audio", 
    icon: Headphones, 
    color: "from-cyan-500 to-blue-500",
    badge: "Beta",
    description: "Spatial audio processing"
  }
];

const badgeColors = {
  "Popular": "bg-gradient-to-r from-pink-500 to-red-500",
  "Pro": "bg-gradient-to-r from-blue-500 to-purple-600",
  "Fast": "bg-gradient-to-r from-green-500 to-teal-500",
  "New": "bg-gradient-to-r from-orange-500 to-yellow-500",
  "Precise": "bg-gradient-to-r from-yellow-500 to-orange-500",
  "AI": "bg-gradient-to-r from-indigo-500 to-purple-500",
  "Studio": "bg-gradient-to-r from-red-500 to-pink-500",
  "HD": "bg-gradient-to-r from-teal-500 to-cyan-500",
  "Beta": "bg-gradient-to-r from-cyan-500 to-blue-500"
};

export default function AdvancedSidebar({ darkMode, selectedTool, onToolSelect }: AdvancedSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const filteredTools = audioTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-80'
      } ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-r ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } shadow-2xl`}
      animate={{ width: isCollapsed ? 80 : 320 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Audio Tools
                </h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Professional Suite
                </p>
              </div>
            </motion.div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <AnimatePresence>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <button
                onClick={() => onToolSelect(tool.id)}
                className={`w-full relative group transition-all duration-300 ${
                  isCollapsed ? 'p-3' : 'p-4'
                } rounded-xl ${
                  selectedTool === tool.id
                    ? darkMode 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-gray-600 shadow-lg' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 border border-blue-200 shadow-lg'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } hover:scale-[1.02] hover:shadow-lg`}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-center space-x-3">
                  {/* Icon with Gradient Background */}
                  <div className={`relative ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'} rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`${isCollapsed ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
                    
                    {/* Animated Badge */}
                    {!isCollapsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredTool === tool.id ? 1 : 0 }}
                        className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${
                          badgeColors[tool.badge as keyof typeof badgeColors]
                        } shadow-lg`}
                      >
                        {tool.badge}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Tool Info */}
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-semibold text-sm group-hover:text-white transition-colors ${
                          selectedTool === tool.id ? 'text-current' : ''
                        }`}>
                          {tool.name}
                        </h3>
                        {selectedTool === tool.id && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className={`text-xs opacity-75 group-hover:opacity-100 transition-opacity ${
                        selectedTool === tool.id ? 'text-current' : 'text-gray-500'
                      }`}>
                        {tool.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Selection Indicator */}
                {selectedTool === tool.id && (
                  <motion.div
                    layoutId="selectedTool"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"
                  />
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          {/* Usage Stats */}
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
          } backdrop-blur-sm mb-4`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Processing Power
                </h4>
                <div className={`flex items-center space-x-2 mt-1`}>
                  <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <motion.div
                      className="h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    85%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Badge */}
          <div className={`p-3 rounded-lg ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className={`text-xs font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                100% Private Processing
              </span>
            </div>
            <p className={`text-xs mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your files never leave your device
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}