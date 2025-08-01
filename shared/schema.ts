import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const audioFiles = pgTable("audio_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  fileSize: integer("file_size").notNull(),
  duration: integer("duration"), // in seconds
  format: text("format").notNull(), // mp3, wav, flac, etc.
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  filePath: text("file_path").notNull(),
  metadata: jsonb("metadata"), // audio metadata like title, artist, album
});

export const processingJobs = pgTable("processing_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  audioFileId: varchar("audio_file_id").references(() => audioFiles.id),
  toolName: text("tool_name").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  progress: integer("progress").default(0), // 0-100
  parameters: jsonb("parameters"), // tool-specific parameters
  outputFilePath: text("output_file_path"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAudioFileSchema = createInsertSchema(audioFiles).omit({
  id: true,
  uploadedAt: true,
});

export const insertProcessingJobSchema = createInsertSchema(processingJobs).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AudioFile = typeof audioFiles.$inferSelect;
export type InsertAudioFile = z.infer<typeof insertAudioFileSchema>;
export type ProcessingJob = typeof processingJobs.$inferSelect;
export type InsertProcessingJob = z.infer<typeof insertProcessingJobSchema>;

// Tool definitions
export const AUDIO_TOOLS = {
  VOCAL_REMOVER: 'vocal_remover',
  PITCH_TEMPO: 'pitch_tempo',
  CONVERTER: 'converter',
  CUTTER_JOINER: 'cutter_joiner',
  NOISE_REDUCTION: 'noise_reduction',
  VOLUME_BOOSTER: 'volume_booster',
  FADE: 'fade',
  METADATA_EDITOR: 'metadata_editor',
  REVERSE: 'reverse',
  AUDIO_PLAYER: 'audio_player'
} as const;

export type AudioTool = typeof AUDIO_TOOLS[keyof typeof AUDIO_TOOLS];
