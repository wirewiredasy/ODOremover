# ODOREMOVER - Audio Processing Platform

## Overview

ODOREMOVER is a modern web-based audio processing platform that provides AI-powered tools for audio manipulation and enhancement. The platform offers 10 CPU-friendly audio processing tools including vocal removal, pitch/tempo adjustment, format conversion, noise reduction, and more. Built with a focus on user experience and performance, it features a BandLab-style interface with glassmorphism design, drag-and-drop functionality, and real-time processing feedback.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)
- **Advanced Professional UI**: Complete redesign matching voice.ai and murf.ai standards with sophisticated interfaces
- **Interactive Hero Section**: Dynamic animated hero with floating elements, waveform visualization, and live demo preview
- **Advanced Sidebar Navigation**: Professional sidebar with search, tool badges, usage stats, and advanced animations
- **Sophisticated Tool Interface**: Multi-tab interface with upload, process, real-time processing, and results sections
- **Professional Audio Visualization**: Real-time waveform displays, audio controls, and processing animations
- **Advanced Color Gradients**: Premium gradient system with sophisticated color combinations and animations
- **Industry-Standard Design**: Professional layouts, typography, and spacing matching industry leaders
- **Interactive Elements**: Hover effects, smooth transitions, floating animations, and advanced micro-interactions
- **Premium User Experience**: Advanced progress tracking, visual feedback, and professional workflow design
- **Enhanced Visual Hierarchy**: Sophisticated information architecture with professional content organization

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom dark theme and neon color palette
- **UI Components**: Radix UI primitives with shadcn/ui component system for accessibility and consistency
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **File Handling**: React Dropzone for intuitive drag-and-drop file uploads

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for the main API server
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API with structured endpoints for audio file management and processing
- **File Processing**: Modular service architecture with dedicated processors for each audio tool
- **Session Management**: Express sessions with PostgreSQL session store
- **File Uploads**: Multer middleware for handling multipart file uploads with validation

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Cloud Database**: Neon serverless PostgreSQL for scalable cloud deployment
- **File Storage**: Local filesystem for uploaded and processed audio files (designed for future cloud storage integration)
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple

### Authentication and Authorization
- **Session-based Authentication**: Traditional session management for secure user state
- **Password Hashing**: Bcrypt for secure password storage
- **Route Protection**: Middleware-based authentication checks for protected endpoints

### Audio Processing Services
- **Modular Service Architecture**: Each audio tool implemented as an independent service class
- **Async Processing**: Background job processing for CPU-intensive audio operations
- **Progress Tracking**: Real-time progress updates for long-running audio processing tasks
- **Error Handling**: Comprehensive error handling with user-friendly error messages

### Development and Deployment
- **Development Environment**: Vite development server with HMR and TypeScript checking
- **Build Process**: Separate frontend (Vite) and backend (esbuild) build pipelines
- **Container Ready**: Structured for Docker containerization and cloud deployment
- **Code Quality**: TypeScript strict mode, ESLint configuration, and modern development practices

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production deployments
- **Drizzle Kit**: Database migration and schema management tools

### Audio Processing Libraries
- **Core Libraries**: Librosa, PyDub, SoundFile for audio manipulation (backend Python services)
- **AI/ML Tools**: Spleeter for vocal separation, noisereduce for noise reduction
- **Format Support**: Mutagen for metadata editing, support for MP3, WAV, FLAC formats

### Frontend Libraries
- **UI Framework**: React with comprehensive Radix UI component primitives
- **Styling**: Tailwind CSS with PostCSS for advanced CSS processing
- **State Management**: TanStack Query for server state, React Hook Form for form handling
- **Media Handling**: HTML5 Audio API for playback, Canvas API for waveform visualization

### Development Tools
- **Build Tools**: Vite, esbuild for optimized bundling and development experience
- **Type Checking**: TypeScript compiler with strict configuration
- **Replit Integration**: Specialized plugins for Replit development environment

### Future Integration Points
- **Cloud Storage**: Designed for Cloudinary or AWS S3 integration for file storage
- **GPU Processing**: Architecture prepared for AI model integration and GPU acceleration
- **Real-time Features**: WebSocket-ready for live collaboration and real-time updates