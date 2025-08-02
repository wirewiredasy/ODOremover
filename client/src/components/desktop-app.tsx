import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import AdvancedSidebar from "@/components/advanced-sidebar";
import AdvancedHero from "@/components/advanced-hero";
import AdvancedToolInterface from "@/components/advanced-tool-interface";
import Prefooter from "@/components/sections/prefooter";
import Footer from "@/components/sections/footer";
import { 
  Mic, Music, FileAudio, Link, Scissors, Shield, Volume2, 
  Play, Settings, Headphones 
} from "lucide-react";

const toolData = {
  "vocal-remover": { name: "AI Vocal Remover", icon: Mic, color: "from-pink-500 to-rose-500" },
  "pitch-tempo": { name: "Pitch & Tempo", icon: Music, color: "from-blue-500 to-cyan-500" },
  "converter": { name: "Format Converter", icon: FileAudio, color: "from-green-500 to-emerald-500" },
  "joiner": { name: "Audio Joiner", icon: Link, color: "from-orange-500 to-red-500" },
  "cutter": { name: "Audio Cutter", icon: Scissors, color: "from-yellow-500 to-orange-500" },
  "noise-reducer": { name: "Noise Reducer", icon: Shield, color: "from-indigo-500 to-purple-500" },
  "bass-booster": { name: "Bass Booster", icon: Volume2, color: "from-red-500 to-pink-500" },
  "player": { name: "Audio Player", icon: Play, color: "from-teal-500 to-blue-500" },
  "equalizer": { name: "Equalizer", icon: Settings, color: "from-violet-500 to-purple-500" },
  "3d-audio": { name: "3D Audio", icon: Headphones, color: "from-cyan-500 to-blue-500" }
};

export default function DesktopApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex">
        <AdvancedSidebar 
          darkMode={darkMode} 
          selectedTool={selectedTool || ""} 
          onToolSelect={setSelectedTool} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${selectedTool ? 'ml-80' : 'ml-20'}`}>
          {!selectedTool ? (
            <AdvancedHero darkMode={darkMode} />
          ) : (
            <div className="pt-4">
              <AdvancedToolInterface
                darkMode={darkMode}
                toolId={selectedTool}
                toolName={toolData[selectedTool as keyof typeof toolData]?.name || "Tool"}
                toolIcon={toolData[selectedTool as keyof typeof toolData]?.icon}
                toolColor={toolData[selectedTool as keyof typeof toolData]?.color || "from-blue-500 to-purple-600"}
              />
            </div>
          )}
          
          {/* Prefooter and Footer */}
          <div className="ml-0">
            <Prefooter darkMode={darkMode} />
            <Footer darkMode={darkMode} />
          </div>
        </main>
      </div>
    </div>
  );
}