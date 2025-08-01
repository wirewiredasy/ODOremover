import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertAudioFileSchema, insertProcessingJobSchema, AUDIO_TOOLS } from "@shared/schema";

interface MulterFileRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['.mp3', '.wav', '.flac', '.m4a'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload audio file
  app.post("/api/audio/upload", upload.single('audio'), async (req: MulterFileRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const audioFileData = {
        userId: "user-1", // TODO: Get from authentication
        filename: req.file.filename,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        format: path.extname(req.file.originalname).toLowerCase().slice(1),
        filePath: req.file.path,
        duration: null, // TODO: Extract from audio file metadata
        metadata: null,
      };

      const validatedData = insertAudioFileSchema.parse(audioFileData);
      const audioFile = await storage.createAudioFile(validatedData);
      
      res.json(audioFile);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Get user's audio files
  app.get("/api/audio/files", async (req, res) => {
    try {
      const userId = "user-1"; // TODO: Get from authentication
      const files = await storage.getAudioFilesByUser(userId);
      res.json(files);
    } catch (error) {
      console.error("Get files error:", error);
      res.status(500).json({ error: "Failed to get files" });
    }
  });

  // Get audio file by ID
  app.get("/api/audio/files/:id", async (req, res) => {
    try {
      const audioFile = await storage.getAudioFile(req.params.id);
      if (!audioFile) {
        return res.status(404).json({ error: "File not found" });
      }
      res.json(audioFile);
    } catch (error) {
      console.error("Get file error:", error);
      res.status(500).json({ error: "Failed to get file" });
    }
  });

  // Serve audio files
  app.get("/api/audio/stream/:id", async (req, res) => {
    try {
      const audioFile = await storage.getAudioFile(req.params.id);
      if (!audioFile) {
        return res.status(404).json({ error: "File not found" });
      }

      if (!fs.existsSync(audioFile.filePath)) {
        return res.status(404).json({ error: "File not found on disk" });
      }

      const stat = fs.statSync(audioFile.filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(audioFile.filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': `audio/${audioFile.format}`,
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': `audio/${audioFile.format}`,
        };
        res.writeHead(200, head);
        fs.createReadStream(audioFile.filePath).pipe(res);
      }
    } catch (error) {
      console.error("Stream error:", error);
      res.status(500).json({ error: "Failed to stream file" });
    }
  });

  // Create processing job
  app.post("/api/processing/jobs", async (req, res) => {
    try {
      const userId = "user-1"; // TODO: Get from authentication
      const jobData = {
        ...req.body,
        userId,
        status: "pending",
        progress: 0,
      };

      const validatedData = insertProcessingJobSchema.parse(jobData);
      const job = await storage.createProcessingJob(validatedData);
      
      // TODO: Queue job for processing by FastAPI backend
      // For now, we'll simulate processing
      setTimeout(async () => {
        await storage.updateProcessingJob(job.id, {
          status: "processing",
          progress: 50,
        });
        
        // Simulate completion
        setTimeout(async () => {
          await storage.updateProcessingJob(job.id, {
            status: "completed",
            progress: 100,
            outputFilePath: `/processed/${job.id}_output.mp3`,
          });
        }, 5000);
      }, 1000);

      res.json(job);
    } catch (error) {
      console.error("Create job error:", error);
      res.status(500).json({ error: "Failed to create processing job" });
    }
  });

  // Get user's processing jobs
  app.get("/api/processing/jobs", async (req, res) => {
    try {
      const userId = "user-1"; // TODO: Get from authentication
      const jobs = await storage.getProcessingJobsByUser(userId);
      res.json(jobs);
    } catch (error) {
      console.error("Get jobs error:", error);
      res.status(500).json({ error: "Failed to get jobs" });
    }
  });

  // Get processing job by ID
  app.get("/api/processing/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getProcessingJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Get job error:", error);
      res.status(500).json({ error: "Failed to get job" });
    }
  });

  // Update processing job (for status updates from FastAPI backend)
  app.put("/api/processing/jobs/:id", async (req, res) => {
    try {
      const job = await storage.updateProcessingJob(req.params.id, req.body);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Update job error:", error);
      res.status(500).json({ error: "Failed to update job" });
    }
  });

  // Get processing statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const userId = "user-1"; // TODO: Get from authentication
      const files = await storage.getAudioFilesByUser(userId);
      const jobs = await storage.getProcessingJobsByUser(userId);
      
      const completedJobs = jobs.filter(job => job.status === "completed");
      const vocalRemovalJobs = completedJobs.filter(job => job.toolName === AUDIO_TOOLS.VOCAL_REMOVER);
      
      const totalDuration = files.reduce((sum, file) => sum + (file.duration || 0), 0);
      const totalSizeGB = files.reduce((sum, file) => sum + file.fileSize, 0) / (1024 * 1024 * 1024);
      
      const stats = {
        totalFiles: files.length,
        totalTime: `${(totalDuration / 3600).toFixed(1)}h`,
        vocalTracks: vocalRemovalJobs.length,
        avgSpeed: "2.3x", // TODO: Calculate real average processing speed
        totalSizeGB: totalSizeGB.toFixed(2),
        completedJobs: completedJobs.length,
        activeJobs: jobs.filter(job => job.status === "processing" || job.status === "pending").length,
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ error: "Failed to get statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
