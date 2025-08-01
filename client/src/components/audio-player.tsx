import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  currentTrack?: {
    id: string;
    name: string;
    url: string;
  };
}

export default function AudioPlayer({ currentTrack }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([70]);
  const [vocalLevel, setVocalLevel] = useState([50]);
  const [instrumentalLevel, setInstrumentalLevel] = useState([75]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Mock waveform data
  const waveformBars = Array.from({ length: 50 }, (_, i) => ({
    height: Math.random() * 100 + 20,
    delay: i * 0.1,
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = value[0] / 100;
    setVolume(value);
  };

  return (
    <div className="glass-dark rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Audio Workspace</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Current Track:</span>
          <span className="text-neon-cyan font-medium">
            {currentTrack?.name || "No track selected"}
          </span>
        </div>
      </div>
      
      {/* Waveform Display */}
      <div className="waveform-container rounded-lg p-6 mb-6" ref={waveformRef}>
        <div className="flex items-end justify-center space-x-1 h-24">
          {waveformBars.map((bar, index) => (
            <div
              key={index}
              className="bg-neon-cyan/60 w-1 rounded-full animate-pulse"
              style={{
                height: `${bar.height}%`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Progress overlay */}
        <div className="mt-4">
          <Slider
            value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Audio Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button 
            onClick={togglePlayback}
            className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-primary-500/50"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>
          
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
          
          <div className="text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume and Mix Controls */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400 min-w-[3rem]">Vocal</span>
            <div className="w-24">
              <Slider
                value={vocalLevel}
                onValueChange={setVocalLevel}
                max={100}
                step={1}
                className="slider-track"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400 min-w-[4rem]">Instrumental</span>
            <div className="w-24">
              <Slider
                value={instrumentalLevel}
                onValueChange={setInstrumentalLevel}
                max={100}
                step={1}
                className="slider-track"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <div className="w-20">
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="slider-track"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
