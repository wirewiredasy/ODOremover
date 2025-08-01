export interface AudioFile {
  id: string;
  filename: string;
  originalName: string;
  fileSize: number;
  duration?: number;
  format: string;
  uploadedAt: string;
  filePath: string;
  metadata?: any;
}

export interface ProcessingJob {
  id: string;
  audioFileId: string;
  toolName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  parameters?: any;
  outputFilePath?: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

class AudioAPI {
  private baseUrl = '/api';

  async uploadFile(file: File): Promise<AudioFile> {
    const formData = new FormData();
    formData.append('audio', file);

    const response = await fetch(`${this.baseUrl}/audio/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  async getFiles(): Promise<AudioFile[]> {
    const response = await fetch(`${this.baseUrl}/audio/files`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    return response.json();
  }

  async getFile(id: string): Promise<AudioFile> {
    const response = await fetch(`${this.baseUrl}/audio/files/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    return response.json();
  }

  async createProcessingJob(
    audioFileId: string, 
    toolName: string, 
    parameters: any = {}
  ): Promise<ProcessingJob> {
    const response = await fetch(`${this.baseUrl}/processing/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audioFileId,
        toolName,
        parameters,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create processing job');
    }

    return response.json();
  }

  async getProcessingJobs(): Promise<ProcessingJob[]> {
    const response = await fetch(`${this.baseUrl}/processing/jobs`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch processing jobs');
    }

    return response.json();
  }

  async getProcessingJob(id: string): Promise<ProcessingJob> {
    const response = await fetch(`${this.baseUrl}/processing/jobs/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch processing job');
    }

    return response.json();
  }

  async getStats() {
    const response = await fetch(`${this.baseUrl}/stats`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return response.json();
  }

  getStreamUrl(fileId: string): string {
    return `${this.baseUrl}/audio/stream/${fileId}`;
  }
}

export const audioAPI = new AudioAPI();
