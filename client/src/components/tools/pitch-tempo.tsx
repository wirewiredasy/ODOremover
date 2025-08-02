import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Play, Download, Music, RotateCcw } from "lucide-react";

interface PitchTempoProps {
  darkMode: boolean;
}

export default function PitchTempo({ darkMode }: PitchTempoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pitch, setPitch] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
    }
  };

  const processAudio = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 3;
      });
    }, 100);
  };

  const resetSettings = () => {
    setPitch(0);
    setTempo(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Pitch & Tempo Changer
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Adjust pitch and tempo independently without quality loss
        </p>
      </div>

      {/* Upload Section */}
      {!file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`w-16 h-16 mx-auto mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <h3 className={`text-xl font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Upload Audio File
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Click to select your audio file
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Main Interface */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg space-y-6`}
        >
          {/* File Info */}
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Music className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {file.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pitch Control */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pitch
                </h3>
                <span className={`text-sm font-mono px-2 py-1 rounded ${
                  darkMode ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-700'
                }`}>
                  {pitch > 0 ? '+' : ''}{pitch} semitones
                </span>
              </div>
              
              <div className="space-y-4">
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>-12</span>
                  <span>0</span>
                  <span>+12</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[-5, -1, 1, 5, 7, 12].map(value => (
                    <button
                      key={value}
                      onClick={() => setPitch(value)}
                      className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                        darkMode 
                          ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                          : 'bg-white hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {value > 0 ? '+' : ''}{value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tempo Control */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tempo
                </h3>
                <span className={`text-sm font-mono px-2 py-1 rounded ${
                  darkMode ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-700'
                }`}>
                  {(100 + tempo).toFixed(0)}%
                </span>
              </div>
              
              <div className="space-y-4">
                <input
                  type="range"
                  min="-50"
                  max="100"
                  step="1"
                  value={tempo}
                  onChange={(e) => setTempo(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>50%</span>
                  <span>100%</span>
                  <span>200%</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[-25, -10, 10, 25, 50, 75].map(value => (
                    <button
                      key={value}
                      onClick={() => setTempo(value)}
                      className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                        darkMode 
                          ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                          : 'bg-white hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {100 + value}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700/30' : 'bg-blue-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Preview Changes
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Listen before processing
                  </p>
                </div>
              </div>
              
              <button
                onClick={resetSettings}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Processing */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Processing Audio...
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {progress}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={processAudio}
              disabled={isProcessing || (pitch === 0 && tempo === 0)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Apply Changes'}
            </button>
            
            {progress === 100 && (
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-16 p-8 rounded-2xl ${
          darkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/50 border border-gray-200'
        } backdrop-blur-sm shadow-xl`}
      >
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          How to Use Pitch & Tempo Changer
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1. Upload File
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Upload your audio file. The tool works with music, vocals, and any audio content.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-cyan-900/30' : 'bg-cyan-100'
            }`}>
              <Music className="w-8 h-8 text-cyan-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              2. Adjust Controls
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Change pitch (-12 to +12 semitones) and tempo (50% to 200%) independently without quality loss.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              <Download className="w-8 h-8 text-green-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              3. Process & Download
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Preview changes before processing, then download your modified audio file.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}