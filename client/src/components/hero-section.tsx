import { motion } from "framer-motion";
import { Play, Upload, Wand2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-8"
          >
            <Wand2 size={16} className="text-violet-400" />
            <span className="text-sm text-gray-300">AI-Powered Audio Processing</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-white/90">Your Audio</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Professional-grade audio processing tools powered by advanced AI. Remove vocals, adjust pitch, convert formats, and enhance your audio with studio-quality precision.
          </motion.p>

          {/* 3D Waveform Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-center items-end space-x-1 h-32">
                {Array.from({ length: 80 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ height: 4 }}
                  >
                    <motion.div
                      className="w-1 bg-gradient-to-t from-violet-500 via-purple-500 to-blue-400 rounded-full shadow-lg"
                      animate={{
                        height: [8, Math.random() * 80 + 20, 8],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 w-1 bg-gradient-to-t from-violet-500 via-purple-500 to-blue-400 rounded-full blur-sm"
                      animate={{
                        height: [8, Math.random() * 80 + 20, 8],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center space-x-3">
                <Upload size={20} />
                <span>Upload & Process</span>
              </div>
            </motion.button>

            <motion.button
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300"></div>
              <div className="relative text-white px-10 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-3">
                <Play size={20} />
                <span>Watch Demo</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10+", label: "Processing Tools" },
              { number: "99%", label: "Audio Quality" },
              { number: "50K+", label: "Files Processed" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}