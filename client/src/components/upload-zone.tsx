import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, File, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export default function UploadZone() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return response.json();
    },
    onSuccess: (data, file) => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'completed' as const, progress: 100 }
            : f
        )
      );
      queryClient.invalidateQueries({ queryKey: ['/api/audio/files'] });
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`,
      });
    },
    onError: (error, file) => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'error' as const, error: error.message }
            : f
        )
      );
      toast({
        title: "Upload failed",
        description: `Failed to upload ${file.name}. Please try again.`,
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const uploadFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
      };

      setUploadedFiles(prev => [...prev, uploadFile]);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === uploadFile.id && f.progress < 90
              ? { ...f, progress: f.progress + 10 }
              : f
          )
        );
      }, 200);

      uploadMutation.mutate(file);

      setTimeout(() => {
        clearInterval(progressInterval);
      }, 2000);
    });
  }, [uploadMutation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`upload-zone glass-dark rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragActive ? 'dragover border-neon-cyan/70' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center animate-float mb-4">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">
            {isDragActive ? 'Drop files here...' : 'Drop your audio files here'}
          </h3>
          <p className="text-gray-400 mb-4">or click to browse from your device</p>
          <p className="text-sm text-gray-500">Supports MP3, WAV, FLAC, M4A • Max 100MB per file</p>
        </div>
        
        <button className="gradient-primary px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary-500/50">
          Choose Files
        </button>
      </div>

      {/* File Processing Queue */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="glass p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neon-cyan/20 rounded-lg flex items-center justify-center">
                  <File className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Progress value={file.progress} className="w-32" />
                  <span className="text-sm text-gray-400 min-w-[3rem]">
                    {file.status === 'completed' ? '✓' : 
                     file.status === 'error' ? '✗' : 
                     `${file.progress}%`}
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
