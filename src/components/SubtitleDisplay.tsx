
import React, { useEffect, useState } from 'react';

interface SubtitleDisplayProps {
  text: string;
  fontSize: string;
  highContrast?: boolean;
}

const SubtitleDisplay: React.FC<SubtitleDisplayProps> = ({ 
  text, 
  fontSize = 'text-2xl',
  highContrast = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (text !== displayText) {
      setAnimateIn(false);
      
      // Wait for fade out animation to complete
      const timer = setTimeout(() => {
        setDisplayText(text);
        setAnimateIn(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else if (!animateIn && text) {
      setAnimateIn(true);
    }
  }, [text, displayText, animateIn]);

  return (
    <div className={`
      subtitle-container
      ${highContrast ? 'bg-srmd-navy/95 text-white dark:bg-white/95 dark:text-srmd-navy' : ''}
      transition-all duration-300
    `}>
      <p className={`
        ${fontSize} font-medium leading-relaxed tracking-wide text-center 
        ${animateIn ? 'animate-fade-in' : 'animate-fade-out opacity-0'}
        ${highContrast ? 'font-semibold' : ''}
      `}>
        {displayText || "Waiting for translation..."}
      </p>
    </div>
  );
};

export default SubtitleDisplay;
