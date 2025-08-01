import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  tag: string;
  tagColor: string;
}

interface ToolCardProps {
  tool: Tool;
  audioFileId?: string;
}

export default function ToolCard({ tool, audioFileId }: ToolCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const processMutation = useMutation({
    mutationFn: async () => {
      if (!audioFileId) {
        throw new Error("No audio file selected");
      }

      const response = await fetch('/api/processing/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioFileId,
          toolName: tool.id,
          parameters: {},
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start processing');
      }

      return response.json();
    },
    onSuccess: () => {
      setIsProcessing(false);
      queryClient.invalidateQueries({ queryKey: ['/api/processing/jobs'] });
      toast({
        title: "Processing started",
        description: `${tool.name} processing has been queued.`,
      });
    },
    onError: (error) => {
      setIsProcessing(false);
      toast({
        title: "Processing failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleProcess = () => {
    if (!audioFileId) {
      toast({
        title: "No audio file",
        description: "Please upload an audio file first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    processMutation.mutate();
  };

  return (
    <div className="tool-card glass-dark rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-lg flex items-center justify-center text-xl`}>
          {tool.icon}
        </div>
        {isProcessing && (
          <div className="processing-indicator w-6 h-6 rounded-full flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          </div>
        )}
      </div>
      
      <h3 className="font-semibold mb-2">{tool.name}</h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{tool.description}</p>
      
      <div className="flex items-center justify-between">
        <span className={`text-xs px-3 py-1 rounded-full ${tool.tagColor}`}>
          {tool.tag}
        </span>
        <button 
          onClick={handleProcess}
          disabled={isProcessing}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${
            isProcessing 
              ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
              : `${tool.tagColor} hover:opacity-80`
          }`}
        >
          {isProcessing ? 'Processing...' : 'Process'}
        </button>
      </div>
    </div>
  );
}
