import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import VocalRemover from "@/components/tools/vocal-remover";
import PitchTempo from "@/components/tools/pitch-tempo";
import AudioConverter from "@/components/tools/audio-converter";
import Prefooter from "@/components/sections/prefooter";
import Footer from "@/components/sections/footer";

const toolComponents = {
  "vocal-remover": VocalRemover,
  "pitch-tempo": PitchTempo,
  "converter": AudioConverter,
  // Add more tools as they're created
  "joiner": () => <div className="p-6 text-center">Audio Joiner - Working Tool</div>,
  "cutter": () => <div className="p-6 text-center">Audio Cutter - Working Tool</div>,
  "noise-reducer": () => <div className="p-6 text-center">Noise Reducer - Working Tool</div>,
  "bass-booster": () => <div className="p-6 text-center">Bass Booster - Working Tool</div>,
  "player": () => <div className="p-6 text-center">Audio Player - Working Tool</div>,
  "equalizer": () => <div className="p-6 text-center">Equalizer - Working Tool</div>,
  "3d-audio": () => <div className="p-6 text-center">3D Audio - Working Tool</div>,
};

export default function DesktopApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState("vocal-remover");

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

  const SelectedToolComponent = toolComponents[selectedTool as keyof typeof toolComponents];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex">
        <Sidebar 
          darkMode={darkMode} 
          selectedTool={selectedTool} 
          onToolSelect={setSelectedTool} 
        />
        
        <main className="flex-1 ml-64 pt-4">
          <div className="transition-colors duration-300">
            {SelectedToolComponent && <SelectedToolComponent darkMode={darkMode} />}
          </div>
          
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