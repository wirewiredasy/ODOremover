import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Play, Pause, Download, Volume2, VolumeX, Settings } from "lucide-react";

interface VocalRemoverProps {
  darkMode: boolean;
}

export default function VocalRemover({ darkMode }: VocalRemoverProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setIsComplete(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const processAudio = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with API call
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          AI Vocal Remover
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Separate vocals from music using advanced AI technology
        </p>
      </div>

      {/* Upload Section */}
      {!file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragOver
              ? darkMode ? 'border-blue-400 bg-blue-900/20' : 'border-blue-400 bg-blue-50'
              : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`w-16 h-16 mx-auto mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <h3 className={`text-xl font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Drop your audio file here
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            or click to browse files
          </p>
          <div className="flex justify-center space-x-2 text-sm">
            {['MP3', 'WAV', 'FLAC', 'M4A'].map(format => (
              <span key={format} className={`px-3 py-1 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {format}
              </span>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </motion.div>
      )}

      {/* File Info & Processing */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          {/* File Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-pink-900/30' : 'bg-pink-100'
            }`}>
              <Volume2 className="w-6 h-6 text-pink-500" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {file.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {(file.size / 1024 / 1024).toFixed(1)} MB • {file.type.split('/')[1].toUpperCase()}
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className={`mb-6 p-4 rounded-lg ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <Settings className="w-4 h-4" />
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Processing Settings
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Quality
                </label>
                <select className={`w-full px-3 py-2 rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } border focus:ring-2 focus:ring-pink-500`}>
                  <option>High Quality</option>
                  <option>Standard</option>
                  <option>Fast</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Output Format
                </label>
                <select className={`w-full px-3 py-2 rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } border focus:ring-2 focus:ring-pink-500`}>
                  <option>WAV</option>
                  <option>MP3</option>
                  <option>FLAC</option>
                </select>
              </div>
            </div>
          </div>

          {/* Processing */}
          {isProcessing && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Processing Audio...
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {progress}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          {!isComplete && (
            <button
              onClick={processAudio}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Remove Vocals'}
            </button>
          )}
        </motion.div>
      )}

      {/* Results */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Vocals Track */}
          <div className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center space-x-3 mb-4">
              <Volume2 className="w-8 h-8 text-pink-500" />
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Vocals Only
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Isolated vocal track
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <button className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </button>
              <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 bg-pink-500 rounded-full w-1/3"></div>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                2:34
              </span>
            </div>

            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Vocals</span>
            </button>
          </div>

          {/* Instrumental Track */}
          <div className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center space-x-3 mb-4">
              <VolumeX className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Instrumental
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Music without vocals
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <button className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </button>
              <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-2 bg-purple-500 rounded-full w-2/3"></div>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                2:34
              </span>
            </div>

            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Instrumental</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* New File Button */}
      {file && (
        <div className="text-center">
          <button
            onClick={() => {
              setFile(null);
              setIsComplete(false);
              setIsProcessing(false);
              setProgress(0);
            }}
            className={`font-medium transition-colors ${
              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            Process Another File
          </button>
        </div>
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
          How to Use Vocal Remover
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-pink-900/30' : 'bg-pink-100'
            }`}>
              <Upload className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1. Upload Audio
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Drag and drop your audio file or click to browse. Supports MP3, WAV, FLAC, and M4A formats.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              2. Choose Settings
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select quality level and output format. Higher quality takes longer but produces better results.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Download className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              3. Download Results
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get two separate files: vocals only and instrumental only. Both in high-quality WAV format.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}