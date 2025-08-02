import { motion } from "framer-motion";
import { Upload, Settings, Download, Zap } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Upload Your Audio",
    description: "Drag and drop your audio file or browse from your device. Supports MP3, WAV, FLAC, and more formats.",
    icon: Upload,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    step: "02", 
    title: "Choose Processing Tool",
    description: "Select from our suite of professional audio tools. Configure settings with real-time preview.",
    icon: Settings,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    step: "03",
    title: "AI Processing Magic",
    description: "Our advanced AI algorithms process your audio with studio-grade quality and precision.",
    icon: Zap,
    gradient: "from-orange-500 to-red-500"
  },
  {
    step: "04",
    title: "Download Results",
    description: "Get your processed audio in high quality. Compare before and after with our built-in player.",
    icon: Download,
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function HowToUse() {
  return (
    <section className="py-24 px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-8"
          >
            <Zap size={16} className="text-violet-400" />
            <span className="text-sm text-gray-300">Simple Process</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform your audio in just four simple steps. Our intuitive interface makes professional audio processing accessible to everyone.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent transform -translate-y-1/2 z-0"></div>
              )}
              
              {/* Step Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:bg-black/60 group-hover:border-white/20 shadow-2xl">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl`}>
                    {step.step}
                  </div>
                  <div className={`absolute inset-0 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-2xl blur-lg opacity-50`}></div>
                </div>

                {/* Icon */}
                <div className="relative mb-6 mt-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={28} />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-violet-100 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Animated Progress Bar */}
                <div className="mt-6 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${step.gradient} rounded-full`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Transform Your Audio?
            </h3>
            <p className="text-gray-400 mb-6">
              Start processing your audio files with professional-grade tools in just minutes.
            </p>
            <motion.button
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center space-x-3">
                <Upload size={20} />
                <span>Start Processing</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}