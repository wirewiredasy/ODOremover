import { Music, Clock, Mic, Zap } from "lucide-react";

interface Stats {
  totalFiles: number;
  totalTime: string;
  vocalTracks: number;
  avgSpeed: string;
  completedJobs?: number;
  activeJobs?: number;
}

interface StatsDashboardProps {
  stats?: Stats;
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
  const defaultStats = {
    totalFiles: 0,
    totalTime: "0h",
    vocalTracks: 0,
    avgSpeed: "0x",
  };

  const displayStats = stats || defaultStats;

  const statItems = [
    {
      icon: Music,
      value: displayStats.totalFiles,
      label: "Files Processed",
      color: "text-neon-cyan",
      bgGradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Clock,
      value: displayStats.totalTime,
      label: "Audio Processed",
      color: "text-neon-pink",
      bgGradient: "from-pink-500 to-red-500",
    },
    {
      icon: Mic,
      value: displayStats.vocalTracks,
      label: "Vocals Separated",
      color: "text-green-400",
      bgGradient: "from-green-500 to-teal-500",
    },
    {
      icon: Zap,
      value: displayStats.avgSpeed,
      label: "Avg Process Speed",
      color: "text-amber-400",
      bgGradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <div key={index} className="glass-dark rounded-xl p-6 text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${item.bgGradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${item.color} mb-1`}>
              {item.value}
            </h3>
            <p className="text-sm text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
