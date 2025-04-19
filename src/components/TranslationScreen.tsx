
import React, { useState } from 'react';
import LiveKitClient from './LiveKitClient';
import AudioVisualizer from './AudioVisualizer';
import SettingsPanel from './SettingsPanel';
import { Button } from '@/components/ui/button';
import { Settings, Volume2, MoreHorizontal } from 'lucide-react';

const TranslationScreen: React.FC = () => {
  const [translating, setTranslating] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState("text-2xl");
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-srmd-burgundy p-4">
      {/* Header */}
      <div className="flex items-center justify-between text-white/90 py-2">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-white/10 rounded text-sm">LIVE</span>
          <span className="text-sm">4.8K</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">🇪🇸 Spanish</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* LiveKit Integration */}
        <LiveKitClient />

        {/* Bottom section */}
        <div className="space-y-6 mt-auto">
          <div className="bg-[#F5F2E9] rounded-t-3xl p-6 space-y-4">
            <h2 className="text-2xl font-serif text-srmd-navy">Live Satsang</h2>
            
            <div className="flex items-center justify-between text-sm text-srmd-navy/60">
              <span>32:34:12</span>
              <span className="text-srmd-burgundy font-medium">Live</span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <Volume2 className="h-6 w-6 text-srmd-navy/70" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <span className="text-xs font-medium text-srmd-navy/70">-10</span>
              </Button>
              
              <Button 
                className="h-14 w-14 rounded-full bg-srmd-burgundy hover:bg-srmd-burgundy/90"
              >
                ⏸️
              </Button>
              
              <Button variant="ghost" size="icon">
                <span className="text-xs font-medium text-srmd-navy/70">+10</span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-6 w-6 text-srmd-navy/70" />
              </Button>
            </div>
          </div>
        </div>
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
