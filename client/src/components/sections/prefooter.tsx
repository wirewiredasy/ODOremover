import { motion } from "framer-motion";
import { Zap, Shield, Headphones, Globe, Star, Users } from "lucide-react";

interface PrefooterProps {
  darkMode: boolean;
}

export default function Prefooter({ darkMode }: PrefooterProps) {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process audio files in seconds with optimized algorithms"
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your files never leave your device. Complete privacy guaranteed"
    },
    {
      icon: Headphones,
      title: "Studio Quality",
      description: "Professional-grade audio processing with no quality loss"
    },
    {
      icon: Globe,
      title: "Universal Support",
      description: "Works with all major audio formats and file types"
    },
    {
      icon: Star,
      title: "AI-Powered",
      description: "Advanced artificial intelligence for superior results"
    },
    {
      icon: Users,
      title: "Trusted by Pros",
      description: "Used by musicians, podcasters, and audio professionals"
    }
  ];

  const stats = [
    { number: "1M+", label: "Files Processed" },
    { number: "50K+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'
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
            Trusted by Professionals Worldwide
          </h2>
          <p className={`text-xl mb-12 max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of creators who trust ODOREMOVER for their audio processing needs
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl ${
                  darkMode 
                    ? 'bg-gray-700/50 border border-gray-600' 
                    : 'bg-white/70 border border-gray-200'
                } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${
                darkMode 
                  ? 'bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50' 
                  : 'bg-white/70 border border-gray-200 hover:bg-white/90'
              } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className={`p-12 rounded-3xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800/70 to-gray-700/70 border border-gray-600' 
              : 'bg-gradient-to-br from-white/70 to-gray-50/70 border border-gray-200'
          } backdrop-blur-sm shadow-2xl`}>
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your Audio?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Start processing your audio files with professional quality tools. No signup required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 transition-transform duration-300">
                  Start Processing Now
                </div>
              </button>
              
              <button className={`px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600' 
                  : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
              } shadow-lg`}>
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}