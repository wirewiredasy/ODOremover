import { type User, type InsertUser, type AudioFile, type InsertAudioFile, type ProcessingJob, type InsertProcessingJob } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Audio file methods
  getAudioFile(id: string): Promise<AudioFile | undefined>;
  getAudioFilesByUser(userId: string): Promise<AudioFile[]>;
  createAudioFile(audioFile: InsertAudioFile): Promise<AudioFile>;
  deleteAudioFile(id: string): Promise<boolean>;
  
  // Processing job methods
  getProcessingJob(id: string): Promise<ProcessingJob | undefined>;
  getProcessingJobsByUser(userId: string): Promise<ProcessingJob[]>;
  getActiveProcessingJobs(): Promise<ProcessingJob[]>;
  createProcessingJob(job: InsertProcessingJob): Promise<ProcessingJob>;
  updateProcessingJob(id: string, updates: Partial<ProcessingJob>): Promise<ProcessingJob | undefined>;
  deleteProcessingJob(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private audioFiles: Map<string, AudioFile>;
  private processingJobs: Map<string, ProcessingJob>;

  constructor() {
    this.users = new Map();
    this.audioFiles = new Map();
    this.processingJobs = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Audio file methods
  async getAudioFile(id: string): Promise<AudioFile | undefined> {
    return this.audioFiles.get(id);
  }

  async getAudioFilesByUser(userId: string): Promise<AudioFile[]> {
    return Array.from(this.audioFiles.values()).filter(
      (file) => file.userId === userId
    );
  }

  async createAudioFile(insertAudioFile: InsertAudioFile): Promise<AudioFile> {
    const id = randomUUID();
    const audioFile: AudioFile = {
      ...insertAudioFile,
      id,
      uploadedAt: new Date(),
      userId: insertAudioFile.userId || null,
      duration: insertAudioFile.duration || null,
      metadata: insertAudioFile.metadata || null,
    };
    this.audioFiles.set(id, audioFile);
    return audioFile;
  }

  async deleteAudioFile(id: string): Promise<boolean> {
    return this.audioFiles.delete(id);
  }

  // Processing job methods
  async getProcessingJob(id: string): Promise<ProcessingJob | undefined> {
    return this.processingJobs.get(id);
  }

  async getProcessingJobsByUser(userId: string): Promise<ProcessingJob[]> {
    return Array.from(this.processingJobs.values()).filter(
      (job) => job.userId === userId
    );
  }

  async getActiveProcessingJobs(): Promise<ProcessingJob[]> {
    return Array.from(this.processingJobs.values()).filter(
      (job) => job.status === "processing" || job.status === "pending"
    );
  }

  async createProcessingJob(insertJob: InsertProcessingJob): Promise<ProcessingJob> {
    const id = randomUUID();
    const job: ProcessingJob = {
      ...insertJob,
      id,
      createdAt: new Date(),
      completedAt: null,
      userId: insertJob.userId || null,
      audioFileId: insertJob.audioFileId || null,
      status: insertJob.status || "pending",
      progress: insertJob.progress || 0,
      parameters: insertJob.parameters || null,
      outputFilePath: insertJob.outputFilePath || null,
      errorMessage: insertJob.errorMessage || null,
    };
    this.processingJobs.set(id, job);
    return job;
  }

  async updateProcessingJob(id: string, updates: Partial<ProcessingJob>): Promise<ProcessingJob | undefined> {
    const job = this.processingJobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    if (updates.status === "completed" || updates.status === "failed") {
      updatedJob.completedAt = new Date();
    }
    
    this.processingJobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteProcessingJob(id: string): Promise<boolean> {
    return this.processingJobs.delete(id);
  }
}

export const storage = new MemStorage();
