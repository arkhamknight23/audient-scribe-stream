
import React, { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  isActive?: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive = true }) => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    // Initialize with 30 bars for a wider visualization
    setBars(Array(30).fill(0).map(() => Math.random() * 40 + 5));
    
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setBars(prev => 
        prev.map(() => isActive ? Math.random() * 45 + 5 : 5)
      );
    }, 150);
    
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center h-48">
      <div className="audio-wave" aria-hidden="true">
        {bars.map((height, index) => (
          <div
            key={index}
            className="audio-wave-bar"
            style={{ 
              height: `${height}px`,
              backgroundColor: `rgb(255, ${180 + Math.random() * 75}, 50)`,
              opacity: isActive ? 0.6 + Math.random() * 0.4 : 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
