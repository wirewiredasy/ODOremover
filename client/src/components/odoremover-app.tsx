import { useState } from "react";
import { Upload, Music, Download, Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function OdoremoverApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleProcessAudio = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep(3);
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl blur-md opacity-30"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  ODOREMOVER
                </h1>
                <p className="text-sm text-gray-500 font-medium">AI-Powered Vocal Separation</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Text */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Separate Vocals from Music
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your audio file and let our AI technology isolate vocals and instrumentals with professional quality.
          </p>
        </div>

        {/* Step 1: Upload */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-12"
          >
            <div
              className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50/50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Drop your audio file here
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  or <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700">browse files</span> from your device
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">MP3</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">WAV</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">FLAC</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">M4A</span>
                </div>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Processing */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-12"
          >
            {uploadedFile && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{uploadedFile.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB • {uploadedFile.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              {isProcessing ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Processing Audio...</h3>
                    <p className="text-gray-600 text-lg">Our AI is separating vocals from instrumentals</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm text-gray-600">
                    <div className={`p-3 rounded-lg ${progress > 20 ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
                      <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${progress > 20 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      Analyzing
                    </div>
                    <div className={`p-3 rounded-lg ${progress > 60 ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
                      <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${progress > 60 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      Separating
                    </div>
                    <div className={`p-3 rounded-lg ${progress > 95 ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
                      <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${progress > 95 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      Finalizing
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Process</h3>
                    <p className="text-gray-600 text-lg">Click the button below to start vocal separation</p>
                  </div>
                  
                  <button
                    onClick={handleProcessAudio}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    Remove Vocals
                  </button>
                  
                  <p className="text-gray-500">Processing typically takes 1-2 minutes</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Download */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Processing Complete!</h3>
              <p className="text-gray-600 text-xl">Your audio has been successfully separated into two tracks</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vocals Track */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Vocals Only</h4>
                    <p className="text-gray-600">Isolated vocal track</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center text-white transition-colors shadow-md">
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full w-1/4"></div>
                    </div>
                    <span className="text-sm text-gray-500">0:45</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
                    <Download className="w-5 h-5" />
                    <span>Download Vocals</span>
                  </button>
                </div>
              </div>

              {/* Instrumental Track */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <VolumeX className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Instrumental</h4>
                    <p className="text-gray-600">Music without vocals</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <button className="w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-xl flex items-center justify-center text-white transition-colors shadow-md">
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full w-3/5"></div>
                    </div>
                    <span className="text-sm text-gray-500">1:52</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
                    <Download className="w-5 h-5" />
                    <span>Download Instrumental</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setUploadedFile(null);
                  setProgress(0);
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
              >
                Process Another File
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 pb-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 ODOREMOVER • Professional AI-powered vocal separation
        </p>
      </footer>
    </div>
  );
}