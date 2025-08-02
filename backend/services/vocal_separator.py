import os
import librosa
import numpy as np
import soundfile as sf
from typing import Tuple, Optional
import tempfile

class VocalSeparator:
    """Advanced vocal separation using spectral analysis and AI techniques"""
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        self.hop_length = 512
        self.n_fft = 2048
        
    def load_audio(self, file_path: str) -> Tuple[np.ndarray, int]:
        """Load audio file and return audio data and sample rate"""
        try:
            audio, sr = librosa.load(file_path, sr=self.sample_rate, mono=False)
            if audio.ndim == 1:
                audio = np.stack([audio, audio])  # Convert mono to stereo
            return audio, sr
        except Exception as e:
            raise ValueError(f"Error loading audio file: {str(e)}")
    
    def separate_vocals_basic(self, audio: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """Basic vocal separation using center channel extraction"""
        if audio.shape[0] != 2:
            raise ValueError("Stereo audio required for vocal separation")
        
        # Extract vocals (center channel difference)
        vocals = audio[0] - audio[1]
        
        # Extract instrumentals (center channel sum)
        instrumentals = (audio[0] + audio[1]) / 2
        
        return vocals, instrumentals
    
    def separate_vocals_advanced(self, audio: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """Advanced vocal separation using spectral analysis"""
        # Convert to mono for processing
        if audio.ndim == 2:
            mono_audio = np.mean(audio, axis=0)
        else:
            mono_audio = audio
        
        # Compute STFT
        stft = librosa.stft(mono_audio, n_fft=self.n_fft, hop_length=self.hop_length)
        magnitude, phase = np.abs(stft), np.angle(stft)
        
        # Harmonic-percussive separation
        harmonic = librosa.decompose.hpss(magnitude)[0]
        percussive = librosa.decompose.hpss(magnitude)[1]
        
        # Vocal estimation (typically in harmonic component)
        vocal_mask = self._create_vocal_mask(harmonic, percussive)
        instrumental_mask = 1 - vocal_mask
        
        # Apply masks
        vocal_stft = stft * vocal_mask
        instrumental_stft = stft * instrumental_mask
        
        # Convert back to time domain
        vocals = librosa.istft(vocal_stft, hop_length=self.hop_length)
        instrumentals = librosa.istft(instrumental_stft, hop_length=self.hop_length)
        
        return vocals, instrumentals
    
    def _create_vocal_mask(self, harmonic: np.ndarray, percussive: np.ndarray) -> np.ndarray:
        """Create a mask to isolate vocal components"""
        # Simple vocal mask based on harmonic content
        vocal_freq_range = (80, 8000)  # Hz
        freq_bins = librosa.fft_frequencies(sr=self.sample_rate, n_fft=self.n_fft)
        
        mask = np.zeros_like(harmonic)
        freq_mask = (freq_bins >= vocal_freq_range[0]) & (freq_bins <= vocal_freq_range[1])
        
        # Apply frequency-based mask
        mask[freq_mask] = harmonic[freq_mask] / (harmonic[freq_mask] + percussive[freq_mask] + 1e-10)
        
        # Smooth the mask
        mask = librosa.util.sync(mask, axis=1)
        
        return mask
    
    def process_file(self, input_path: str, output_dir: str, quality: str = "high") -> dict:
        """Process audio file and separate vocals from instrumentals"""
        try:
            # Load audio
            audio, sr = self.load_audio(input_path)
            
            # Choose separation method based on quality
            if quality == "fast":
                vocals, instrumentals = self.separate_vocals_basic(audio)
            else:
                vocals, instrumentals = self.separate_vocals_advanced(audio)
            
            # Generate output filenames
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            vocals_path = os.path.join(output_dir, f"{base_name}_vocals.wav")
            instrumentals_path = os.path.join(output_dir, f"{base_name}_instrumental.wav")
            
            # Save separated tracks
            sf.write(vocals_path, vocals, sr, subtype='PCM_24')
            sf.write(instrumentals_path, instrumentals, sr, subtype='PCM_24')
            
            return {
                "success": True,
                "vocals_path": vocals_path,
                "instrumentals_path": instrumentals_path,
                "duration": len(vocals) / sr,
                "sample_rate": sr
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_audio_info(self, file_path: str) -> dict:
        """Get basic information about the audio file"""
        try:
            audio, sr = self.load_audio(file_path)
            duration = len(audio[0]) / sr if audio.ndim == 2 else len(audio) / sr
            
            return {
                "duration": duration,
                "sample_rate": sr,
                "channels": audio.shape[0] if audio.ndim == 2 else 1,
                "format": "stereo" if audio.ndim == 2 else "mono"
            }
        except Exception as e:
            return {"error": str(e)}