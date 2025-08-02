import { useState } from "react";
import { Upload, Music, Download, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function VocalRemover() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const handleRemoveVocals = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep(3);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const steps = [
    { number: 1, title: "Upload Audio", active: currentStep >= 1, completed: currentStep > 1 },
    { number: 2, title: "AI Processing", active: currentStep >= 2, completed: currentStep > 2 },
    { number: 3, title: "Download Results", active: currentStep >= 3, completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">AI Vocal Remover</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300 ${
                    step.completed 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : step.active 
                        ? 'border-blue-500 text-blue-500 bg-blue-50' 
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {step.completed ? '✓' : step.number}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    step.active ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.completed ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Upload */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Upload Your Audio File</h2>
              <p className="text-gray-600 text-lg">Drag and drop your audio file or click to browse</p>
            </div>

            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-medium text-gray-700 mb-2">Drop your audio file here</p>
              <p className="text-gray-500 mb-4">Supports MP3, WAV, FLAC, M4A</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Browse Files
              </button>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                {isProcessing ? 'Processing Audio...' : 'Ready to Process'}
              </h2>
              {uploadedFile && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
                  <div className="flex items-center space-x-3">
                    <Music className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">{uploadedFile.name}</span>
                    <span className="text-gray-500 text-sm">
                      {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                </div>
              )}
            </div>

            {isProcessing ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">{progress}%</div>
                  <p className="text-gray-600">AI is separating vocals from instruments...</p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={handleRemoveVocals}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-xl text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Remove Vocals
                </button>
                <p className="text-gray-500 mt-4">Processing typically takes 30-60 seconds</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Download */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Processing Complete!</h2>
              <p className="text-gray-600 text-lg">Your vocals have been successfully separated</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Vocal Track */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Vocals Only</h3>
                    <p className="text-sm text-gray-600">Isolated vocal track</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors">
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                  <div className="flex-1 bg-white rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Vocals</span>
                </button>
              </div>

              {/* Instrumental Track */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instrumental</h3>
                    <p className="text-sm text-gray-600">Music without vocals</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <button className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-colors">
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                  <div className="flex-1 bg-white rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>

                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Instrumental</span>
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setUploadedFile(null);
                  setProgress(0);
                }}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Process Another File
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}