from fastapi import FastAPI, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
import shutil
from pathlib import Path
import uuid
from typing import Dict, Any, Optional
import json
from datetime import datetime

from models import AudioFileModel, ProcessingJobModel, ProcessingStatus
from services.vocal_remover import VocalRemoverService
from services.pitch_tempo import PitchTempoService
from services.converter import ConverterService
from services.cutter_joiner import CutterJoinerService
from services.noise_reduction import NoiseReductionService
from services.volume_booster import VolumeBoosterService
from services.fade import FadeService
from services.metadata_editor import MetadataEditorService
from services.reverse import ReverseService

app = FastAPI(title="ODOREMOVER API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create necessary directories
os.makedirs("uploads", exist_ok=True)
os.makedirs("processed", exist_ok=True)

# In-memory storage (replace with database in production)
audio_files: Dict[str, AudioFileModel] = {}
processing_jobs: Dict[str, ProcessingJobModel] = {}

# Initialize services
services = {
    "vocal_remover": VocalRemoverService(),
    "pitch_tempo": PitchTempoService(),
    "converter": ConverterService(),
    "cutter_joiner": CutterJoinerService(),
    "noise_reduction": NoiseReductionService(),
    "volume_booster": VolumeBoosterService(),
    "fade": FadeService(),
    "metadata_editor": MetadataEditorService(),
    "reverse": ReverseService(),
}

@app.get("/")
async def root():
    return {"message": "ODOREMOVER FastAPI Backend", "version": "1.0.0"}

@app.post("/process/{tool_name}")
async def process_audio(
    tool_name: str,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    parameters: Optional[str] = None
):
    """Process audio file with specified tool"""
    
    if tool_name not in services:
        raise HTTPException(status_code=400, detail=f"Unknown tool: {tool_name}")
    
    # Generate unique job ID
    job_id = str(uuid.uuid4())
    
    # Save uploaded file
    file_extension = Path(file.filename).suffix
    input_path = f"uploads/{job_id}_input{file_extension}"
    
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Parse parameters
    params = {}
    if parameters:
        try:
            params = json.loads(parameters)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid parameters JSON")
    
    # Create processing job
    job = ProcessingJobModel(
        id=job_id,
        tool_name=tool_name,
        input_file=input_path,
        status=ProcessingStatus.PENDING,
        parameters=params,
        created_at=datetime.utcnow()
    )
    
    processing_jobs[job_id] = job
    
    # Start background processing
    background_tasks.add_task(process_file_background, job_id)
    
    return {"job_id": job_id, "status": "started"}

async def process_file_background(job_id: str):
    """Background task to process audio file"""
    job = processing_jobs.get(job_id)
    if not job:
        return
    
    try:
        # Update status to processing
        job.status = ProcessingStatus.PROCESSING
        job.progress = 10
        
        # Get the service for this tool
        service = services[job.tool_name]
        
        # Generate output filename
        output_extension = ".mp3"  # Default output format
        if job.tool_name == "converter":
            output_extension = job.parameters.get("output_format", ".mp3")
        
        output_path = f"processed/{job_id}_output{output_extension}"
        
        # Update progress
        job.progress = 25
        
        # Process the file
        result = await service.process(job.input_file, output_path, job.parameters)
        
        if result.get("success"):
            job.status = ProcessingStatus.COMPLETED
            job.progress = 100
            job.output_file = output_path
            job.completed_at = datetime.utcnow()
            job.result_metadata = result.get("metadata", {})
        else:
            job.status = ProcessingStatus.FAILED
            job.error_message = result.get("error", "Processing failed")
            
    except Exception as e:
        job.status = ProcessingStatus.FAILED
        job.error_message = str(e)
        job.progress = 0

@app.get("/jobs/{job_id}")
async def get_job_status(job_id: str):
    """Get processing job status"""
    job = processing_jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {
        "id": job.id,
        "tool_name": job.tool_name,
        "status": job.status.value,
        "progress": job.progress,
        "error_message": job.error_message,
        "created_at": job.created_at.isoformat(),
        "completed_at": job.completed_at.isoformat() if job.completed_at else None,
        "result_metadata": job.result_metadata
    }

@app.get("/jobs")
async def list_jobs():
    """List all processing jobs"""
    return [
        {
            "id": job.id,
            "tool_name": job.tool_name,
            "status": job.status.value,
            "progress": job.progress,
            "created_at": job.created_at.isoformat(),
            "completed_at": job.completed_at.isoformat() if job.completed_at else None,
        }
        for job in processing_jobs.values()
    ]

@app.get("/download/{job_id}")
async def download_result(job_id: str):
    """Download processed file"""
    job = processing_jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job.status != ProcessingStatus.COMPLETED or not job.output_file:
        raise HTTPException(status_code=400, detail="Job not completed or no output file")
    
    if not os.path.exists(job.output_file):
        raise HTTPException(status_code=404, detail="Output file not found")
    
    return FileResponse(
        job.output_file,
        media_type="audio/mpeg",
        filename=f"{job.tool_name}_output.mp3"
    )

@app.get("/tools")
async def list_tools():
    """List available processing tools"""
    return {
        "tools": [
            {
                "name": "vocal_remover",
                "display_name": "Vocal Remover",
                "description": "Separate vocals from instrumentals using AI",
                "parameters": {
                    "model": {"type": "string", "default": "spleeter:2stems-16kHz", "options": ["spleeter:2stems-16kHz", "spleeter:4stems-16kHz"]}
                }
            },
            {
                "name": "pitch_tempo",
                "display_name": "Pitch & Tempo",
                "description": "Adjust pitch and tempo independently",
                "parameters": {
                    "pitch_shift": {"type": "float", "default": 0.0, "range": [-12.0, 12.0]},
                    "tempo_change": {"type": "float", "default": 1.0, "range": [0.5, 2.0]}
                }
            },
            {
                "name": "converter",
                "display_name": "Format Converter",
                "description": "Convert between audio formats",
                "parameters": {
                    "output_format": {"type": "string", "default": ".mp3", "options": [".mp3", ".wav", ".flac"]},
                    "bitrate": {"type": "int", "default": 128, "options": [128, 192, 256, 320]}
                }
            },
            {
                "name": "noise_reduction",
                "display_name": "Noise Reduction",
                "description": "Remove background noise and artifacts",
                "parameters": {
                    "noise_reduction_strength": {"type": "float", "default": 0.5, "range": [0.1, 1.0]}
                }
            },
            {
                "name": "volume_booster",
                "display_name": "Volume Booster",
                "description": "Boost and normalize audio levels",
                "parameters": {
                    "target_lufs": {"type": "float", "default": -14.0, "range": [-30.0, -6.0]},
                    "normalize": {"type": "boolean", "default": True}
                }
            }
        ]
    }

@app.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete processing job and associated files"""
    job = processing_jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Clean up files
    if os.path.exists(job.input_file):
        os.remove(job.input_file)
    
    if job.output_file and os.path.exists(job.output_file):
        os.remove(job.output_file)
    
    # Remove from memory
    del processing_jobs[job_id]
    
    return {"message": "Job deleted successfully"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True if os.environ.get("NODE_ENV") == "development" else False
    )
