import { useQuery } from "@tanstack/react-query";
import { Music, MoreVertical, Play } from "lucide-react";

export default function RecentFiles() {
  const { data: files = [] } = useQuery({
    queryKey: ["/api/audio/files"],
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getToolBadgeColor = (toolName?: string) => {
    switch (toolName) {
      case 'vocal_remover':
        return 'text-cyan-400 bg-cyan-400/20';
      case 'pitch_tempo':
        return 'text-pink-400 bg-pink-400/20';
      case 'noise_reduction':
        return 'text-indigo-400 bg-indigo-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getToolDisplayName = (toolName?: string) => {
    switch (toolName) {
      case 'vocal_remover':
        return 'Vocal Remover';
      case 'pitch_tempo':
        return 'Pitch & Tempo';
      case 'noise_reduction':
        return 'Noise Reduction';
      default:
        return 'Original';
    }
  };

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Files</h3>
        <button className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {files.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No files uploaded yet</p>
            <p className="text-sm">Upload your first audio file to get started</p>
          </div>
        ) : (
          files.slice(0, 5).map((file: any) => (
            <div key={file.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Music className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-grow min-w-0">
                <p className="font-medium truncate">{file.originalName}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{formatFileSize(file.fileSize)}</span>
                  <span>•</span>
                  <span>{formatDate(file.uploadedAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getToolBadgeColor()}`}>
                  {getToolDisplayName()}
                </span>
                
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                  <Play className="w-4 h-4" />
                </button>
                
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
