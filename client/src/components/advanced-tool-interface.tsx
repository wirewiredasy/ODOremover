import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Play, Pause, Download, Settings, Activity, 
  Volume2, VolumeX, Mic, Music, FileAudio, Sparkles,
  RotateCcw, Share, Heart, Eye, Clock, Zap
} from "lucide-react";

interface AdvancedToolInterfaceProps {
  darkMode: boolean;
  toolId: string;
  toolName: string;
  toolIcon: React.ComponentType<any>;
  toolColor: string;
}

export default function AdvancedToolInterface({ 
  darkMode, 
  toolId, 
  toolName, 
  toolIcon: ToolIcon, 
  toolColor 
}: AdvancedToolInterfaceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setIsComplete(false);
      setProgress(0);
      setActiveTab("process");
    }
  }, []);

  const processAudio = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    setActiveTab("processing");

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsComplete(true);
          setActiveTab("results");
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Advanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${toolColor} flex items-center justify-center shadow-xl`}>
            <ToolIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {toolName}
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Professional AI-powered audio processing
            </p>
          </div>
        </div>

        {/* Tool Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${toolColor} bg-clip-text text-transparent`}>
              50K+
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Files Processed
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${toolColor} bg-clip-text text-transparent`}>
              99.9%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Success Rate
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${toolColor} bg-clip-text text-transparent`}>
              &lt;2min
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Avg Processing
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className={`flex rounded-2xl p-1 ${
          darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-100 border border-gray-200'
        } backdrop-blur-sm`}>
          {[
            { id: "upload", label: "Upload", icon: Upload },
            { id: "process", label: "Process", icon: Settings },
            { id: "processing", label: "Processing", icon: Zap },
            { id: "results", label: "Results", icon: Download }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={tab.id === "process" && !file || tab.id === "processing" && !isProcessing || tab.id === "results" && !isComplete}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${toolColor} text-white shadow-lg`
                  : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Interface */}
      <AnimatePresence mode="wait">
        {activeTab === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`relative rounded-3xl p-12 transition-all duration-300 ${
              isDragOver
                ? darkMode ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-400'
                : darkMode ? 'bg-gray-800/30 border-2 border-dashed border-gray-600 hover:border-gray-500' : 'bg-white/30 border-2 border-dashed border-gray-300 hover:border-gray-400'
            } backdrop-blur-sm shadow-2xl cursor-pointer group`}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) handleFileSelect(droppedFile);
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${toolColor} flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
              >
                <Upload className="w-12 h-12 text-white" />
              </motion.div>
              
              <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Drop your audio file here
              </h3>
              <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                or click to browse from your device
              </p>
              
              <div className="flex justify-center flex-wrap gap-3">
                {['MP3', 'WAV', 'FLAC', 'M4A', 'OGG', 'AAC'].map(format => (
                  <span key={format} className={`px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  } group-hover:scale-105 transition-transform`}>
                    {format}
                  </span>
                ))}
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-lg flex items-center justify-center opacity-80"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        )}

        {activeTab === "process" && file && (
          <motion.div
            key="process"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`rounded-3xl p-8 ${
              darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
            } backdrop-blur-sm shadow-2xl space-y-8`}
          >
            {/* File Preview */}
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${toolColor} flex items-center justify-center shadow-xl`}>
                <FileAudio className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {file.name}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {file.type.split('/')[1]?.toUpperCase()}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
              
              {/* Audio Controls */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${toolColor} flex items-center justify-center shadow-lg hover:scale-105 transition-transform`}
                >
                  {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                </button>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className={`p-6 rounded-2xl ${
              darkMode ? 'bg-gray-900/50' : 'bg-gray-50'
            } backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Audio Waveform
                </h4>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-blue-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-end justify-center space-x-1 h-24 mb-4">
                {Array.from({ length: 60 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 rounded-full bg-gradient-to-t ${toolColor}`}
                    style={{ 
                      height: `${Math.random() * 80 + 20}%`,
                      opacity: i <= (currentTime / duration) * 60 ? 1 : 0.3
                    }}
                    animate={isPlaying ? {
                      height: [
                        `${Math.random() * 80 + 20}%`,
                        `${Math.random() * 100 + 10}%`,
                        `${Math.random() * 80 + 20}%`
                      ]
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: isPlaying ? Infinity : 0,
                      delay: i * 0.05
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Processing Settings */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quality Settings
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Processing Quality
                    </label>
                    <select className={`w-full px-4 py-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                      <option>Ultra High (Slow)</option>
                      <option>High Quality (Recommended)</option>
                      <option>Standard (Fast)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Output Format
                    </label>
                    <select className={`w-full px-4 py-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                      <option>WAV (Uncompressed)</option>
                      <option>FLAC (Lossless)</option>
                      <option>MP3 320kbps</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700/50' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/50'
              } backdrop-blur-sm`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Processing Preview
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      AI Model: Advanced Neural Network
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Estimated time: ~2 minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Button */}
            <div className="flex justify-center">
              <button
                onClick={processAudio}
                className={`group relative px-12 py-4 rounded-2xl font-bold text-lg text-white shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r ${toolColor}`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${toolColor} blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                <span className="relative flex items-center space-x-3">
                  <Zap className="w-5 h-5" />
                  <span>Start Processing</span>
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "processing" && isProcessing && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`rounded-3xl p-12 text-center ${
              darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
            } backdrop-blur-sm shadow-2xl`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${toolColor} flex items-center justify-center mx-auto mb-8 shadow-2xl`}
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>
            
            <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Processing in Progress
            </h3>
            
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our advanced neural networks are analyzing your audio...
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Processing Progress
                </span>
                <span className={`font-bold text-xl bg-gradient-to-r ${toolColor} bg-clip-text text-transparent`}>
                  {progress}%
                </span>
              </div>
              
              <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <motion.div
                  className={`h-3 rounded-full bg-gradient-to-r ${toolColor} shadow-lg`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "results" && isComplete && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Success Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <Download className="w-12 h-12 text-white" />
              </motion.div>
              
              <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Processing Complete!
              </h3>
              
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your audio has been successfully processed with AI precision
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-8 rounded-3xl ${
                  darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
                } backdrop-blur-sm shadow-2xl`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Processed Track 1
                    </h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      High-quality output • 24-bit WAV
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <button className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </button>
                    <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className="h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full w-1/3"></div>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      2:34
                    </span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
                    <Download className="w-4 h-4" />
                    <span>Download Track 1</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`p-8 rounded-3xl ${
                  darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
                } backdrop-blur-sm shadow-2xl`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Processed Track 2
                    </h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Studio quality • 24-bit WAV
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <button className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </button>
                    <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-2/3"></div>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      2:34
                    </span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
                    <Download className="w-4 h-4" />
                    <span>Download Track 2</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                <Share className="w-5 h-5" />
                <span>Share Results</span>
              </button>
              
              <button 
                onClick={() => {
                  setFile(null);
                  setIsComplete(false);
                  setIsProcessing(false);
                  setProgress(0);
                  setActiveTab("upload");
                }}
                className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600' 
                    : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                } shadow-lg`}
              >
                <RotateCcw className="w-5 h-5" />
                <span>Process Another File</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}