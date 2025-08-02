import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Upload, Sparkles, Activity, Mic, Music } from "lucide-react";

interface AdvancedHeroProps {
  darkMode: boolean;
}

export default function AdvancedHero({ darkMode }: AdvancedHeroProps) {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoFeatures = [
    { title: "Vocal Isolation", desc: "AI-powered vocal separation", icon: Mic },
    { title: "Pitch Control", desc: "Professional pitch adjustment", icon: Music },
    { title: "Audio Enhancement", desc: "Studio-quality processing", icon: Sparkles }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-blue-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-500'
        }`}></div>
        <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
          darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-400 to-pink-400'
        }`}></div>
        
        {/* Floating Audio Waveform */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Activity className="w-96 h-96 text-blue-500 animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50'
              } backdrop-blur-sm`}
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                AI-Powered Audio Processing
              </span>
            </motion.div>

            {/* Main Heading with Gradient Text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight`}
            >
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                Transform
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Audio Magic
              </span>
            </motion.h1>

            {/* Dynamic Feature Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDemo}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg`}>
                    {(() => {
                      const IconComponent = demoFeatures[currentDemo].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {demoFeatures[currentDemo].title}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {demoFeatures[currentDemo].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Professional-grade audio tools powered by cutting-edge AI. 
              Separate vocals, adjust pitch, enhance quality, and more.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3">
                  <Upload className="w-5 h-5" />
                  <span>Start Creating</span>
                </div>
              </button>

              <button className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                darkMode 
                  ? 'bg-gray-800/50 text-white border border-gray-700 hover:bg-gray-700/50 backdrop-blur-sm' 
                  : 'bg-white/50 text-gray-900 border border-gray-200 hover:bg-white/70 backdrop-blur-sm'
              } shadow-lg`}>
                <div className="relative">
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex items-center space-x-8"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 ${
                      darkMode ? 'border-gray-800 bg-gradient-to-br from-blue-500 to-purple-600' : 'border-white bg-gradient-to-br from-blue-400 to-purple-500'
                    }`}></div>
                  ))}
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  50K+ creators
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
                <span className={`text-sm font-medium ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  4.9/5 rating
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className={`relative p-8 rounded-3xl ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white/50 to-gray-50/50 border border-gray-200/50'
            } backdrop-blur-xl shadow-2xl`}>
              {/* Mock Audio Interface */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Live Demo
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Processing
                    </span>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className={`p-6 rounded-2xl ${
                  darkMode ? 'bg-gray-900/50' : 'bg-white/50'
                } backdrop-blur-sm`}>
                  <div className="flex items-end justify-center space-x-1 h-32">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                        initial={{ height: Math.random() * 100 + 20 }}
                        animate={{ 
                          height: [
                            Math.random() * 100 + 20,
                            Math.random() * 120 + 10,
                            Math.random() * 100 + 20
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Control Panel */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                  } backdrop-blur-sm`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mic className="w-4 h-4 text-pink-500" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Vocals
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                  } backdrop-blur-sm`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Music className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Instrumental
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 2, delay: 1.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl shadow-lg flex items-center justify-center"
            >
              <Play className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}