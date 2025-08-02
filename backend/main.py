from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import tempfile
import shutil
from typing import Optional
import uuid

from services.vocal_separator import VocalSeparator
from services.pitch_tempo import PitchTempoProcessor

app = FastAPI(title="ODOREMOVER API", description="Professional Audio Processing API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize processors
vocal_separator = VocalSeparator()
pitch_tempo_processor = PitchTempoProcessor()

# Create necessary directories
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "ODOREMOVER API - Professional Audio Processing"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "services": ["vocal-separator", "pitch-tempo"]}

# Vocal Separator Endpoints
@app.post("/api/vocal-separator/process")
async def separate_vocals(
    file: UploadFile = File(...),
    quality: str = Form("high")
):
    """Separate vocals from instrumental track"""
    if not file.filename.lower().endswith(('.mp3', '.wav', '.flac', '.m4a')):
        raise HTTPException(status_code=400, detail="Unsupported audio format")
    
    # Generate unique session ID
    session_id = str(uuid.uuid4())
    session_dir = os.path.join(OUTPUT_DIR, session_id)
    os.makedirs(session_dir, exist_ok=True)
    
    try:
        # Save uploaded file
        input_path = os.path.join(UPLOAD_DIR, f"{session_id}_{file.filename}")
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process the file
        result = vocal_separator.process_file(input_path, session_dir, quality)
        
        if result["success"]:
            return {
                "session_id": session_id,
                "success": True,
                "vocals_url": f"/api/download/{session_id}/vocals",
                "instrumental_url": f"/api/download/{session_id}/instrumental",
                "duration": result["duration"],
                "sample_rate": result["sample_rate"]
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up uploaded file
        if os.path.exists(input_path):
            os.remove(input_path)

@app.get("/api/vocal-separator/info")
async def get_audio_info(file: UploadFile = File(...)):
    """Get audio file information"""
    try:
        # Save temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            shutil.copyfileobj(file.file, tmp)
            info = vocal_separator.get_audio_info(tmp.name)
        
        os.unlink(tmp.name)
        return info
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Pitch & Tempo Endpoints
@app.post("/api/pitch-tempo/process")
async def process_pitch_tempo(
    file: UploadFile = File(...),
    pitch_semitones: float = Form(0),
    tempo_percent: float = Form(0),
    quality: str = Form("high")
):
    """Change pitch and tempo of audio file"""
    if not file.filename.lower().endswith(('.mp3', '.wav', '.flac', '.m4a')):
        raise HTTPException(status_code=400, detail="Unsupported audio format")
    
    session_id = str(uuid.uuid4())
    session_dir = os.path.join(OUTPUT_DIR, session_id)
    os.makedirs(session_dir, exist_ok=True)
    
    try:
        # Save uploaded file
        input_path = os.path.join(UPLOAD_DIR, f"{session_id}_{file.filename}")
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Generate output path
        output_filename = f"processed_{file.filename}"
        output_path = os.path.join(session_dir, output_filename)
        
        # Process the file
        result = pitch_tempo_processor.process_file(
            input_path, output_path, pitch_semitones, tempo_percent, quality
        )
        
        if result["success"]:
            return {
                "session_id": session_id,
                "success": True,
                "download_url": f"/api/download/{session_id}/processed",
                "original_duration": result["original_duration"],
                "new_duration": result["new_duration"],
                "pitch_change": result["pitch_change"],
                "tempo_change": result["tempo_change"]
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(input_path):
            os.remove(input_path)

@app.post("/api/pitch-tempo/analyze")
async def analyze_audio_file(file: UploadFile = File(...)):
    """Analyze audio file properties"""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            shutil.copyfileobj(file.file, tmp)
            analysis = pitch_tempo_processor.analyze_audio(tmp.name)
        
        os.unlink(tmp.name)
        return analysis
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Download Endpoints
@app.get("/api/download/{session_id}/vocals")
async def download_vocals(session_id: str):
    """Download separated vocals"""
    session_dir = os.path.join(OUTPUT_DIR, session_id)
    vocals_files = [f for f in os.listdir(session_dir) if f.endswith('_vocals.wav')]
    
    if not vocals_files:
        raise HTTPException(status_code=404, detail="Vocals file not found")
    
    file_path = os.path.join(session_dir, vocals_files[0])
    return FileResponse(file_path, filename=vocals_files[0], media_type='audio/wav')

@app.get("/api/download/{session_id}/instrumental")
async def download_instrumental(session_id: str):
    """Download separated instrumental"""
    session_dir = os.path.join(OUTPUT_DIR, session_id)
    instrumental_files = [f for f in os.listdir(session_dir) if f.endswith('_instrumental.wav')]
    
    if not instrumental_files:
        raise HTTPException(status_code=404, detail="Instrumental file not found")
    
    file_path = os.path.join(session_dir, instrumental_files[0])
    return FileResponse(file_path, filename=instrumental_files[0], media_type='audio/wav')

@app.get("/api/download/{session_id}/processed")
async def download_processed(session_id: str):
    """Download processed audio file"""
    session_dir = os.path.join(OUTPUT_DIR, session_id)
    processed_files = [f for f in os.listdir(session_dir) if f.startswith('processed_')]
    
    if not processed_files:
        raise HTTPException(status_code=404, detail="Processed file not found")
    
    file_path = os.path.join(session_dir, processed_files[0])
    return FileResponse(file_path, filename=processed_files[0], media_type='audio/wav')

# Cleanup endpoint
@app.delete("/api/cleanup/{session_id}")
async def cleanup_session(session_id: str):
    """Clean up session files"""
    session_dir = os.path.join(OUTPUT_DIR, session_id)
    if os.path.exists(session_dir):
        shutil.rmtree(session_dir)
        return {"message": "Session cleaned up successfully"}
    else:
        raise HTTPException(status_code=404, detail="Session not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)