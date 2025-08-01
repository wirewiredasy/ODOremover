import { useQuery } from "@tanstack/react-query";
import { Music, Settings, Download, Cog } from "lucide-react";
import UploadZone from "@/components/upload-zone";
import AudioPlayer from "@/components/audio-player";
import ToolCard from "@/components/tool-card";
import ProcessingQueue from "@/components/processing-queue";
import RecentFiles from "@/components/recent-files";
import StatsDashboard from "@/components/stats-dashboard";

const audioTools = [
  {
    id: "vocal_remover",
    name: "Vocal Remover",
    description: "Separate vocals from instrumentals using AI-powered Spleeter technology",
    icon: "🎤",
    gradient: "from-blue-500 to-indigo-500",
    tag: "2-stem separation",
    tagColor: "text-cyan-400 bg-cyan-400/20",
  },
  {
    id: "pitch_tempo",
    name: "Pitch & Tempo",
    description: "Adjust speed and pitch independently with Librosa processing",
    icon: "⚡",
    gradient: "from-pink-500 to-red-500",
    tag: "Real-time adjust",
    tagColor: "text-pink-400 bg-pink-400/20",
  },
  {
    id: "converter",
    name: "Format Converter",
    description: "Convert between MP3, WAV, FLAC formats with quality preservation",
    icon: "🔄",
    gradient: "from-green-500 to-teal-500",
    tag: "Multi-format",
    tagColor: "text-green-400 bg-green-400/20",
  },
  {
    id: "cutter_joiner",
    name: "Cut & Join",
    description: "Precise audio cutting and seamless track joining",
    icon: "✂️",
    gradient: "from-orange-500 to-yellow-500",
    tag: "Precision edit",
    tagColor: "text-orange-400 bg-orange-400/20",
  },
  {
    id: "noise_reduction",
    name: "Noise Reduction",
    description: "Remove background noise, hum, and unwanted artifacts",
    icon: "🔇",
    gradient: "from-indigo-500 to-purple-500",
    tag: "AI-powered",
    tagColor: "text-indigo-400 bg-indigo-400/20",
  },
  {
    id: "volume_booster",
    name: "Volume Boost",
    description: "Normalize and boost audio levels without distortion",
    icon: "📢",
    gradient: "from-red-500 to-pink-500",
    tag: "Normalize",
    tagColor: "text-red-400 bg-red-400/20",
  },
  {
    id: "fade",
    name: "Fade In/Out",
    description: "Add smooth fade transitions at track beginnings and endings",
    icon: "🌊",
    gradient: "from-cyan-500 to-blue-500",
    tag: "Smooth transitions",
    tagColor: "text-cyan-400 bg-cyan-400/20",
  },
  {
    id: "metadata_editor",
    name: "Metadata Editor",
    description: "Edit title, artist, album, and other track information",
    icon: "📝",
    gradient: "from-violet-500 to-purple-500",
    tag: "ID3 tags",
    tagColor: "text-violet-400 bg-violet-400/20",
  },
  {
    id: "reverse",
    name: "Reverse Audio",
    description: "Create reverse playback effects for creative audio processing",
    icon: "↩️",
    gradient: "from-teal-500 to-green-500",
    tag: "Creative effects",
    tagColor: "text-teal-400 bg-teal-400/20",
  },
  {
    id: "audio_player",
    name: "Enhanced Player",
    description: "Advanced playback with vocal/instrumental balance controls",
    icon: "🎵",
    gradient: "from-amber-500 to-orange-500",
    tag: "Mix control",
    tagColor: "text-amber-400 bg-amber-400/20",
  },
];

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen gradient-bg text-white">
      {/* Header Navigation */}
      <header className="glass-dark sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center animate-glow">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ODOREMOVER
                </h1>
                <p className="text-sm text-gray-400">Advanced Audio Processing Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-neon-cyan transition-colors">Dashboard</a>
              <a href="#" className="text-white/80 hover:text-neon-cyan transition-colors">Tools</a>
              <a href="#" className="text-white/80 hover:text-neon-cyan transition-colors">Library</a>
              <a href="#" className="text-white/80 hover:text-neon-cyan transition-colors">Settings</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="glass p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="glass p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Upload Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Transform Your Audio with AI Power
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Upload your audio files and choose from our powerful suite of 10 professional-grade processing tools
            </p>
          </div>
          
          <UploadZone />
        </section>

        {/* Audio Player Section */}
        <section className="mb-12">
          <AudioPlayer />
        </section>

        {/* Tools Dashboard */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Processing Tools</h2>
            <div className="flex items-center space-x-4">
              <button className="glass px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm">
                All Tools
              </button>
              <button className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                Favorites
              </button>
              <button className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                Recent
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {audioTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Recent Files & Processing Queue */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentFiles />
            <ProcessingQueue />
          </div>
        </section>

        {/* Stats Dashboard */}
        <StatsDashboard stats={stats} />
      </main>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-lg">ODOREMOVER</h3>
              </div>
              <p className="text-gray-400 text-sm">Advanced audio processing platform powered by AI and machine learning technologies.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Vocal Remover</a></li>
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Pitch & Tempo</a></li>
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Audio Converter</a></li>
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Noise Reduction</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-neon-cyan transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-neon-cyan transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/wirewiredasy/Odoremove" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 ODOREMOVER. Advanced Audio Processing Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
