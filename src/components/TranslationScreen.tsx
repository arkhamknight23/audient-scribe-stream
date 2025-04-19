
import React, { useState, useEffect } from 'react';
import SubtitleDisplay from './SubtitleDisplay';
import AudioVisualizer from './AudioVisualizer';
import SettingsPanel from './SettingsPanel';
import { Button } from '@/components/ui/button';
import { Settings, Volume2 } from 'lucide-react';

const mockTranslations = [
  "Welcome to our spiritual gathering today.",
  "We will begin with a moment of mindful reflection.",
  "Let the wisdom of ancient teachings guide your journey.",
  "The path to inner peace requires patience and dedication.",
  "Remember that compassion for others is the foundation of spiritual growth.",
  "Through meditation, we connect with our true essence.",
  "The universe speaks to those who listen with an open heart.",
  "Every challenge is an opportunity for spiritual development."
];

const TranslationScreen: React.FC = () => {
  const [currentText, setCurrentText] = useState("");
  const [translating, setTranslating] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState("text-2xl");
  const [highContrast, setHighContrast] = useState(false);

  // Simulate incoming translations
  useEffect(() => {
    if (!translating) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setCurrentText(mockTranslations[index]);
      index = (index + 1) % mockTranslations.length;
    }, 5000);
    
    return () => clearInterval(interval);
  }, [translating]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black p-4 sm:p-6">
      {/* Logo and brand header */}
      <header className="flex justify-center mb-8 mt-4">
        <div className="w-24 h-24 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-srmd-burgundy flex items-center justify-center text-white">
            <span className="font-serif text-xl font-bold">SRMD</span>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full">
        {/* Status indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className={`flex items-center ${translating ? 'text-green-600' : 'text-gray-400'}`}>
            <Volume2 className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              {translating ? 'Translation Active' : 'Waiting for speaker...'}
            </span>
          </div>
        </div>
        
        {/* Audio visualizer */}
        <div className="mb-6">
          <AudioVisualizer isActive={translating} />
        </div>
        
        {/* Subtitles display */}
        <div className="mb-12">
          <SubtitleDisplay 
            text={currentText} 
            fontSize={fontSize}
            highContrast={highContrast}
          />
        </div>
      </div>
      
      {/* Settings button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setSettingsOpen(true)}
          className="rounded-full w-12 h-12 bg-srmd-burgundy hover:bg-srmd-burgundy/90 text-white shadow-lg"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Settings panel */}
      <SettingsPanel
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default TranslationScreen;
