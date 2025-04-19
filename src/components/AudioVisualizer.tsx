
import React, { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  isActive?: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive = true }) => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    // Initialize with 15 bars
    setBars(Array(15).fill(0).map(() => Math.random() * 20 + 5));
    
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setBars(prev => 
        prev.map(() => isActive ? Math.random() * 25 + 5 : 5)
      );
    }, 150);
    
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="audio-wave" aria-hidden="true">
      {bars.map((height, index) => (
        <div
          key={index}
          className="audio-wave-bar"
          style={{ 
            height: `${height}px`,
            opacity: isActive ? 0.6 + Math.random() * 0.4 : 0.2
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
