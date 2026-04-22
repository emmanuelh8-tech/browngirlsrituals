import { useState, useEffect } from 'react';
import { useData } from '../DataContext';
import { Save, RefreshCw, Palette } from 'lucide-react';

const ThemeEditor = () => {
  const { theme, updateTheme } = useData();
  const [saved, setSaved] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [primaryDark, setPrimaryDark] = useState(theme.primaryDark);

  // Update local state when theme changes
  useEffect(() => {
    setPrimaryColor(theme.primaryColor);
    setPrimaryDark(theme.primaryDark);
  }, [theme]);

  const handleSave = () => {
    updateTheme({ primaryColor, primaryDark });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset to default theme colors?')) {
      setPrimaryColor('#8b6d4b');
      setPrimaryDark('#6d5639');
      updateTheme({ primaryColor: '#8b6d4b', primaryDark: '#6d5639' });
    }
  };

  const applyPreset = (color: string, dark: string) => {
    setPrimaryColor(color);
    setPrimaryDark(dark);
    updateTheme({ primaryColor: color, primaryDark: dark });
  };

  const presets = [
    { name: 'Brown & Gold', color: '#8b6d4b', dark: '#6d5639' },
    { name: 'Rose & Blush', color: '#c9a0a0', dark: '#a67c7c' },
    { name: 'Sage & Cream', color: '#7a8b6e', dark: '#5d6d53' },
    { name: 'Navy & Gold', color: '#2c3e50', dark: '#1a252f' },
    { name: 'Terracotta', color: '#c67c5c', dark: '#a05d40' },
    { name: 'Lavender', color: '#9b7cb6', dark: '#7a5d94' },
    { name: 'Teal', color: '#3a8b8b', dark: '#2a6b6b' },
    { name: 'Coral', color: '#e07a5f', dark: '#c45d42' },
    { name: 'Black & Gold', color: '#1a1a1a', dark: '#000000' },
    { name: 'Burgundy', color: '#8b4557', dark: '#6b3543' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Palette className="text-[#8b6d4b]" size={24} />
          <h2 className="text-xl font-medium">Theme Colors</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639] transition-colors"
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Current Colors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-6">Current Theme Colors</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Color */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <p className="text-xs text-gray-500">Main brand color for buttons, links, accents</p>
            <div className="flex gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-12 rounded cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm uppercase"
              />
            </div>
            <div 
              className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Color Preview
            </div>
          </div>

          {/* Primary Dark */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Primary Dark (Hover)
            </label>
            <p className="text-xs text-gray-500">Darker shade for button hover states</p>
            <div className="flex gap-3">
              <input
                type="color"
                value={primaryDark}
                onChange={(e) => setPrimaryDark(e.target.value)}
                className="w-16 h-12 rounded cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={primaryDark}
                onChange={(e) => setPrimaryDark(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm uppercase"
              />
            </div>
            <div 
              className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: primaryDark }}
            >
              Hover Color Preview
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Live Preview</h3>
        <div className="border border-gray-200 rounded-lg p-8 space-y-6">
          <div className="flex gap-4 flex-wrap">
            <button
              className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Button
            </button>
            <button
              className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
              style={{ backgroundColor: primaryDark }}
            >
              Hover State
            </button>
            <button
              className="px-6 py-3 border-2 rounded-lg font-medium transition-colors"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Outline Button
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium" style={{ color: primaryColor }}>
              This is how your primary color looks as text
            </p>
            <p className="text-gray-600">
              Regular text for comparison
            </p>
          </div>
          <div 
            className="p-4 rounded-lg inline-block"
            style={{ backgroundColor: primaryColor + '20' }}
          >
            <span style={{ color: primaryColor }}>Accent background with colored text</span>
          </div>
        </div>
      </div>

      {/* Preset Themes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Quick Presets - Click to Apply</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.color, preset.dark)}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#8b6d4b] transition-all text-left"
            >
              <div 
                className="w-full h-10 rounded mb-2"
                style={{ backgroundColor: preset.color }}
              />
              <span className="text-sm font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-medium text-blue-800 mb-2">How to Use</h3>
        <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
          <li>Pick a color using the color picker or type a hex code</li>
          <li>Click "Save Changes" to apply to your website</li>
          <li>Or click any preset to instantly change colors</li>
          <li>Visit your website to see the changes live!</li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeEditor;
