import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Clock, AlertCircle, Download, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProcessingQueue() {
  const { data: jobs = [] } = useQuery({
    queryKey: ["/api/processing/jobs"],
    refetchInterval: 2000, // Poll every 2 seconds
  });

  const activeJobs = jobs.filter((job: any) => 
    job.status === "processing" || job.status === "pending"
  ).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "processing":
        return (
          <div className="w-4 h-4 rounded-full border-2 border-primary-400 border-t-transparent animate-spin" />
        );
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 border-green-500/30";
      case "processing":
        return "bg-primary-500/10 border-primary-500/30";
      case "failed":
        return "bg-red-500/10 border-red-500/30";
      default:
        return "bg-gray-800/50 border-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "processing":
        return "Processing...";
      case "failed":
        return "Failed";
      default:
        return "Queued";
    }
  };

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Processing Queue</h3>
        <div className="flex items-center space-x-2">
          {activeJobs > 0 && (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">{activeJobs} Active</span>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No processing jobs yet</p>
            <p className="text-sm">Upload a file and select a tool to get started</p>
          </div>
        ) : (
          jobs.slice(0, 5).map((job: any) => (
            <div key={job.id} className={`p-4 border rounded-lg ${getStatusColor(job.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{job.audioFile?.originalName || "Unknown file"}</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(job.status)}
                  <span className="text-sm text-gray-400">{getStatusText(job.status)}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-3 capitalize">
                {job.toolName.replace('_', ' ')} • {job.toolName === 'vocal_remover' ? 'Spleeter 2-stem' : 'AI Enhancement'}
              </p>
              
              {job.status === "processing" || job.status === "pending" ? (
                <div className="flex items-center space-x-3">
                  <Progress value={job.progress || 0} className="flex-grow" />
                  <span className="text-sm text-primary-400">{job.progress || 0}%</span>
                </div>
              ) : job.status === "completed" ? (
                <div className="flex items-center justify-between">
                  <button className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>
              ) : job.status === "failed" ? (
                <p className="text-sm text-red-400">{job.errorMessage || "Processing failed"}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
