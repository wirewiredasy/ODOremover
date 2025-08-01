from pydantic import BaseModel
from enum import Enum
from typing import Optional, Dict, Any
from datetime import datetime

class ProcessingStatus(Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class AudioFileModel(BaseModel):
    id: str
    filename: str
    original_name: str
    file_size: int
    format: str
    duration: Optional[float] = None
    uploaded_at: datetime
    file_path: str
    metadata: Optional[Dict[str, Any]] = None

class ProcessingJobModel(BaseModel):
    id: str
    tool_name: str
    input_file: str
    output_file: Optional[str] = None
    status: ProcessingStatus = ProcessingStatus.PENDING
    progress: int = 0
    parameters: Dict[str, Any] = {}
    error_message: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    result_metadata: Dict[str, Any] = {}

class ProcessingResult(BaseModel):
    success: bool
    output_path: Optional[str] = None
    error: Optional[str] = None
    metadata: Dict[str, Any] = {}
