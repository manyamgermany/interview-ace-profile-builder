
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean, corporate look perfect for traditional industries",
    colors: ["bg-slate-800", "bg-blue-600", "bg-gray-100"],
    preview: "linear-gradient(135deg, #1e293b, #2563eb)"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Vibrant and modern design for creative roles",
    colors: ["bg-purple-600", "bg-pink-500", "bg-orange-400"],
    preview: "linear-gradient(135deg, #9333ea, #ec4899, #fb923c)"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Sleek and innovative for technology positions",
    colors: ["bg-emerald-600", "bg-cyan-500", "bg-blue-500"],
    preview: "linear-gradient(135deg, #059669, #06b6d4, #3b82f6)"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated and elegant for leadership roles",
    colors: ["bg-gray-900", "bg-amber-600", "bg-slate-600"],
    preview: "linear-gradient(135deg, #111827, #d97706, #475569)"
  }
];

const ThemeSelector = ({ selectedTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Palette size={24} className="text-purple-600" />
          Presentation Theme
        </CardTitle>
        <CardDescription className="text-base">
          Choose a theme that matches your industry and personal style
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                selectedTheme === theme.id
                  ? 'border-blue-500 ring-2 ring-blue-200 scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:scale-102'
              }`}
              onClick={() => onThemeChange(theme.id)}
            >
              {/* Theme Preview */}
              <div 
                className="h-24 w-full"
                style={{ background: theme.preview }}
              />
              
              {/* Theme Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">{theme.name}</h3>
                  {selectedTheme === theme.id && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-3">{theme.description}</p>
                
                {/* Color Palette */}
                <div className="flex gap-1">
                  {theme.colors.map((color, index) => (
                    <div key={index} className={`w-4 h-4 rounded-full ${color}`} />
                  ))}
                </div>
              </div>
              
              {/* Selection Overlay */}
              {selectedTheme === theme.id && (
                <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-xl" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
