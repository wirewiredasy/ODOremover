import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Download, FileAudio, Settings } from "lucide-react";

interface AudioConverterProps {
  darkMode: boolean;
}

export default function AudioConverter({ darkMode }: AudioConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [quality, setQuality] = useState("high");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formats = [
    { value: "mp3", name: "MP3", desc: "Most compatible format" },
    { value: "wav", name: "WAV", desc: "Uncompressed, highest quality" },
    { value: "flac", name: "FLAC", desc: "Lossless compression" },
    { value: "m4a", name: "M4A", desc: "Apple format, great quality" },
    { value: "ogg", name: "OGG", desc: "Open source format" }
  ];

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setIsComplete(false);
      setProgress(0);
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
          setIsComplete(true);
          return 100;
        }
        return prev + 3;
      });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Audio Format Converter
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Convert between all major audio formats with professional quality
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
            Click to select your audio file for conversion
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

      {/* Conversion Interface */}
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
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              <FileAudio className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {file.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {(file.size / 1024 / 1024).toFixed(1)} MB • {file.type.split('/')[1]?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Format Selection */}
          <div className={`p-6 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Output Format
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setOutputFormat(format.value)}
                  className={`p-4 rounded-lg text-left transition-all duration-200 ${
                    outputFormat === format.value
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : darkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">{format.name}</div>
                  <div className="text-xs opacity-80">{format.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Quality
              </label>
              <select 
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } border focus:ring-2 focus:ring-green-500`}
              >
                <option value="high">High Quality (320kbps)</option>
                <option value="medium">Medium Quality (192kbps)</option>
                <option value="low">Standard Quality (128kbps)</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Sample Rate
              </label>
              <select className={`w-full px-4 py-3 rounded-lg ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:ring-2 focus:ring-green-500`}>
                <option value="44100">44.1 kHz (CD Quality)</option>
                <option value="48000">48 kHz (Professional)</option>
                <option value="96000">96 kHz (High-Res)</option>
              </select>
            </div>
          </div>

          {/* Processing */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Converting to {outputFormat.toUpperCase()}...
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {progress}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={processAudio}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Converting...' : `Convert to ${outputFormat.toUpperCase()}`}
          </button>

          {/* Download Button */}
          {isComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Converted File</span>
            </motion.button>
          )}
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
          How to Use Audio Converter
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              <Upload className="w-8 h-8 text-green-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1. Upload File
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Upload any audio file in MP3, WAV, FLAC, M4A, or OGG format.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'
            }`}>
              <Settings className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              2. Choose Format
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select output format and quality settings for your specific needs.
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Download className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              3. Download
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get your converted file in the new format with preserved quality.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}