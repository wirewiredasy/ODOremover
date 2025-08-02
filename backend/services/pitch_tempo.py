import librosa
import numpy as np
import soundfile as sf
import pyrubberband as pyrb
from typing import Tuple, Optional
import os

class PitchTempoProcessor:
    """Advanced pitch and tempo manipulation using RubberBand"""
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        
    def load_audio(self, file_path: str) -> Tuple[np.ndarray, int]:
        """Load audio file"""
        try:
            audio, sr = librosa.load(file_path, sr=self.sample_rate, mono=False)
            return audio, sr
        except Exception as e:
            raise ValueError(f"Error loading audio: {str(e)}")
    
    def change_pitch(self, audio: np.ndarray, semitones: float) -> np.ndarray:
        """Change pitch by semitones without affecting tempo"""
        try:
            if audio.ndim == 1:
                # Mono audio
                shifted = pyrb.pitch_shift(audio, sr=self.sample_rate, n_steps=semitones)
            else:
                # Stereo audio - process each channel
                shifted = np.array([
                    pyrb.pitch_shift(audio[0], sr=self.sample_rate, n_steps=semitones),
                    pyrb.pitch_shift(audio[1], sr=self.sample_rate, n_steps=semitones)
                ])
            return shifted
        except Exception as e:
            raise ValueError(f"Error changing pitch: {str(e)}")
    
    def change_tempo(self, audio: np.ndarray, tempo_factor: float) -> np.ndarray:
        """Change tempo without affecting pitch"""
        try:
            if audio.ndim == 1:
                # Mono audio
                stretched = pyrb.time_stretch(audio, sr=self.sample_rate, rate=tempo_factor)
            else:
                # Stereo audio - process each channel
                stretched = np.array([
                    pyrb.time_stretch(audio[0], sr=self.sample_rate, rate=tempo_factor),
                    pyrb.time_stretch(audio[1], sr=self.sample_rate, rate=tempo_factor)
                ])
            return stretched
        except Exception as e:
            raise ValueError(f"Error changing tempo: {str(e)}")
    
    def change_pitch_and_tempo(self, audio: np.ndarray, semitones: float, tempo_factor: float) -> np.ndarray:
        """Change both pitch and tempo independently"""
        try:
            # First change tempo
            if tempo_factor != 1.0:
                audio = self.change_tempo(audio, tempo_factor)
            
            # Then change pitch
            if semitones != 0:
                audio = self.change_pitch(audio, semitones)
            
            return audio
        except Exception as e:
            raise ValueError(f"Error processing audio: {str(e)}")
    
    def process_file(self, input_path: str, output_path: str, pitch_semitones: float = 0, 
                    tempo_percent: float = 0, quality: str = "high") -> dict:
        """Process audio file with pitch and tempo changes"""
        try:
            # Load audio
            audio, sr = self.load_audio(input_path)
            
            # Convert tempo percentage to factor
            tempo_factor = 1.0 + (tempo_percent / 100.0)
            
            # Apply changes if needed
            if pitch_semitones != 0 or tempo_factor != 1.0:
                processed_audio = self.change_pitch_and_tempo(audio, pitch_semitones, tempo_factor)
            else:
                processed_audio = audio
            
            # Save processed audio
            if processed_audio.ndim == 1:
                sf.write(output_path, processed_audio, sr)
            else:
                sf.write(output_path, processed_audio.T, sr)  # Transpose for soundfile
            
            return {
                "success": True,
                "output_path": output_path,
                "original_duration": len(audio[0]) / sr if audio.ndim == 2 else len(audio) / sr,
                "new_duration": len(processed_audio[0]) / sr if processed_audio.ndim == 2 else len(processed_audio) / sr,
                "pitch_change": pitch_semitones,
                "tempo_change": tempo_percent,
                "sample_rate": sr
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_preview(self, input_path: str, pitch_semitones: float = 0, 
                   tempo_percent: float = 0, start_time: float = 30, duration: float = 10) -> dict:
        """Generate a preview of the processed audio"""
        try:
            # Load audio segment
            audio, sr = librosa.load(input_path, sr=self.sample_rate, 
                                   offset=start_time, duration=duration, mono=False)
            
            # Convert tempo percentage to factor
            tempo_factor = 1.0 + (tempo_percent / 100.0)
            
            # Apply changes
            if pitch_semitones != 0 or tempo_factor != 1.0:
                processed_audio = self.change_pitch_and_tempo(audio, pitch_semitones, tempo_factor)
            else:
                processed_audio = audio
            
            return {
                "success": True,
                "preview_audio": processed_audio,
                "sample_rate": sr,
                "duration": len(processed_audio[0]) / sr if processed_audio.ndim == 2 else len(processed_audio) / sr
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def analyze_audio(self, file_path: str) -> dict:
        """Analyze audio properties"""
        try:
            audio, sr = self.load_audio(file_path)
            
            # Basic analysis
            duration = len(audio[0]) / sr if audio.ndim == 2 else len(audio) / sr
            
            # Tempo estimation
            tempo, beats = librosa.beat.beat_track(y=audio[0] if audio.ndim == 2 else audio, sr=sr)
            
            # Pitch analysis (fundamental frequency)
            f0, voiced_flag, voiced_probs = librosa.piecewise_aggregate(
                np.abs(librosa.stft(audio[0] if audio.ndim == 2 else audio)), 
                np.arange(0, len(audio[0]) if audio.ndim == 2 else len(audio), 512),
                np.mean
            )
            
            return {
                "success": True,
                "duration": duration,
                "tempo": float(tempo),
                "sample_rate": sr,
                "channels": audio.shape[0] if audio.ndim == 2 else 1,
                "estimated_key": self._estimate_key(audio, sr)
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _estimate_key(self, audio: np.ndarray, sr: int) -> str:
        """Estimate the musical key of the audio"""
        try:
            # Use chroma features for key estimation
            chroma = librosa.feature.chroma_stft(y=audio[0] if audio.ndim == 2 else audio, sr=sr)
            chroma_mean = np.mean(chroma, axis=1)
            
            # Simple key estimation based on chroma centroid
            keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
            key_index = np.argmax(chroma_mean)
            
            return keys[key_index]
        except:
            return "Unknown"