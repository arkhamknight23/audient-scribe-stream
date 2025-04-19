
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Text } from 'lucide-react';

interface SettingsPanelProps {
  fontSize: string;
  setFontSize: (size: string) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  isOpen,
  onClose
}) => {
  const fontSizeMap: Record<string, number> = {
    'text-xl': 0,
    'text-2xl': 33,
    'text-3xl': 66,
    'text-4xl': 100
  };

  const fontSizeValue = fontSizeMap[fontSize] || 33;

  const handleFontSizeChange = (value: number[]) => {
    if (value[0] < 20) setFontSize('text-xl');
    else if (value[0] < 50) setFontSize('text-2xl');
    else if (value[0] < 80) setFontSize('text-3xl');
    else setFontSize('text-4xl');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center sm:items-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-srmd-navy dark:text-srmd-gold">Display Settings</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="text-lg flex items-center">
                <Text className="mr-2 h-5 w-5" />
                Text Size
              </Label>
              <span className="text-sm text-muted-foreground">
                {fontSize.replace('text-', '').toUpperCase()}
              </span>
            </div>
            <Slider
              id="font-size"
              defaultValue={[fontSizeValue]}
              max={100}
              step={1}
              onValueChange={handleFontSizeChange}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="high-contrast" className="text-lg">High Contrast Mode</Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
