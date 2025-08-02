
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  Scissors, 
  Volume2, 
  Shuffle, 
  Download, 
  Upload, 
  Play, 
  Pause,
  FileAudio,
  Sliders,
  Headphones,
  Waveform
} from "lucide-react";
import Footer from "./sections/footer";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

export default function DesktopApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const tools: Tool[] = [
    {
      id: "vocal-remover",
      name: "Vocal Remover",
      description: "Remove vocals from any song using AI",
      icon: Music,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
    },
    {
      id: "audio-cutter",
      name: "Audio Cutter",
      description: "Cut and trim audio files precisely",
      icon: Scissors,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    {
      id: "volume-booster",
      name: "Volume Booster",
      description: "Boost audio volume up to 400%",
      icon: Volume2,
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    },
    {
      id: "audio-converter",
      name: "Audio Converter",
      description: "Convert between audio formats",
      icon: Shuffle,
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20"
    },
    {
      id: "pitch-tempo",
      name: "Pitch & Tempo",
      description: "Change pitch and tempo independently",
      icon: Sliders,
      color: "from-indigo-500 to-purple-500",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
    },
    {
      id: "noise-reduction",
      name: "Noise Reduction",
      description: "Remove background noise from audio",
      icon: Headphones,
      color: "from-teal-500 to-green-500",
      gradient: "bg-gradient-to-br from-teal-500/20 to-green-500/20"
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
    }
  };

  const processAudio = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ODOREMOVER
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI-Powered Audio Tools
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!selectedTool ? (
          <>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Professional Audio Processing
              </h2>
              <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Transform your audio with AI-powered tools. Remove vocals, cut audio, boost volume, 
                and much more - all in your browser with complete privacy.
              </p>
            </motion.div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`group cursor-pointer p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  } ${tool.gradient} backdrop-blur-sm`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{tool.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
              ))}
            </div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-24"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Why Choose ODOREMOVER?</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🔒",
                    title: "100% Private",
                    description: "All processing happens locally in your browser. We never store your files."
                  },
                  {
                    icon: "🚀",
                    title: "AI-Powered",
                    description: "Advanced machine learning algorithms for professional-quality results."
                  },
                  {
                    icon: "⚡",
                    title: "Lightning Fast",
                    description: "Optimized processing engines for quick turnaround times."
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`text-center p-8 rounded-2xl ${
                      darkMode 
                        ? 'bg-gray-800/30 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          /* Tool Interface */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => setSelectedTool(null)}
                className={`p-3 rounded-xl transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                ←
              </button>
              <div>
                <h2 className="text-3xl font-bold">
                  {tools.find(t => t.id === selectedTool)?.name}
                </h2>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {tools.find(t => t.id === selectedTool)?.description}
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div className={`relative p-12 border-2 border-dashed rounded-2xl text-center transition-all ${
              darkMode 
                ? 'border-gray-600 bg-gray-800/30 hover:bg-gray-800/50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileAudio className={`w-16 h-16 mx-auto mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <h3 className="text-xl font-semibold mb-2">
                {uploadedFile ? uploadedFile.name : 'Drop your audio file here'}
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {uploadedFile ? 'File ready for processing' : 'Supports MP3, WAV, FLAC, and more'}
              </p>
            </div>

            {/* Processing */}
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                {!isProcessing && progress === 0 && (
                  <button
                    onClick={processAudio}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start Processing
                  </button>
                )}

                {isProcessing && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Processing...</span>
                      <span className="text-sm">{progress}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {progress === 100 && !isProcessing && (
                  <div className="space-y-4">
                    <div className={`p-6 rounded-2xl ${
                      darkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
                    }`}>
                      <h4 className="font-semibold text-green-600 mb-2">Processing Complete!</h4>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Your audio has been processed successfully.
                      </p>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
                      <Download className="w-5 h-5" />
                      <span>Download Result</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </main>

      {/* Pre-Footer Section */}
      <section className={`py-20 px-6 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Trusted by Audio Professionals
            </h2>
            <p className={`text-xl mb-12 max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of creators who trust ODOREMOVER for their audio processing needs
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "1M+", label: "Files Processed" },
                { number: "50K+", label: "Happy Users" },
                { number: "99.9%", label: "Success Rate" },
                { number: "24/7", label: "Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl ${
                    darkMode 
                      ? 'bg-gray-700/30 border border-gray-600' 
                      : 'bg-white/70 border border-gray-200'
                  } backdrop-blur-sm`}
                >
                  <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: "🔒",
                title: "100% Private",
                description: "Your files never leave your device. Complete privacy guaranteed."
              },
              {
                icon: "🚀",
                title: "AI-Powered",
                description: "Advanced machine learning for professional-quality results."
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Optimized processing for quick turnaround times."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl ${
                  darkMode 
                    ? 'bg-gray-800/30 border border-gray-700' 
                    : 'bg-white/50 border border-gray-200'
                } backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
                <p className={`leading-relaxed ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className={`text-center p-12 rounded-3xl ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-700' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
            } backdrop-blur-sm`}
          >
            <h3 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your Audio?
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Start processing your audio files with our AI-powered tools. 
              No signup required, completely free to use.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
