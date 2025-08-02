import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mic, Music, FileAudio, Link, Scissors, Shield, Volume2, 
  Play, Settings, Headphones, ChevronLeft, ChevronRight 
} from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

const audioTools = [
  { id: "vocal-remover", name: "Vocal Remover", icon: Mic, color: "text-pink-500" },
  { id: "pitch-tempo", name: "Pitch & Tempo", icon: Music, color: "text-blue-500" },
  { id: "converter", name: "Audio Converter", icon: FileAudio, color: "text-green-500" },
  { id: "joiner", name: "Audio Joiner", icon: Link, color: "text-orange-500" },
  { id: "cutter", name: "Audio Cutter", icon: Scissors, color: "text-yellow-500" },
  { id: "noise-reducer", name: "Noise Reducer", icon: Shield, color: "text-indigo-500" },
  { id: "bass-booster", name: "Bass Booster", icon: Volume2, color: "text-red-500" },
  { id: "player", name: "Audio Player", icon: Play, color: "text-teal-500" },
  { id: "equalizer", name: "Equalizer", icon: Settings, color: "text-violet-500" },
  { id: "3d-audio", name: "3D Audio", icon: Headphones, color: "text-cyan-500" }
];

export default function Sidebar({ darkMode, selectedTool, onToolSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-r ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center ${
          darkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-600 border-gray-200'
        } border shadow-lg hover:scale-110 transition-transform`}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Tools List */}
      <div className="p-4 space-y-2">
        {/* Section Title */}
        {!isCollapsed && (
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Audio Tools
          </h3>
        )}

        {audioTools.map((tool) => (
          <motion.button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              selectedTool === tool.id
                ? darkMode 
                  ? 'bg-gray-800 text-white border border-gray-700' 
                  : 'bg-blue-50 text-blue-900 border border-blue-200'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tool.icon className={`w-5 h-5 ${
              selectedTool === tool.id ? tool.color : 'text-current'
            }`} />
            {!isCollapsed && (
              <span className="font-medium text-sm truncate">{tool.name}</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Privacy Badge */}
      {!isCollapsed && (
        <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-lg ${
          darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
        } border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className={`text-xs font-medium ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Privacy First
            </span>
          </div>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Files never leave your device
          </p>
        </div>
      )}
    </motion.div>
  );
}