
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase, Plus, X } from "lucide-react";
import { useState } from "react";

interface CurrentWork {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
  responsibilities: string[];
}

interface CurrentWorkSectionProps {
  currentWork: CurrentWork;
  setCurrentWork: (work: CurrentWork) => void;
}

const CurrentWorkSection = ({ currentWork, setCurrentWork }: CurrentWorkSectionProps) => {
  const [newAchievement, setNewAchievement] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");

  const handleInputChange = (field: keyof CurrentWork, value: string) => {
    setCurrentWork({ ...currentWork, [field]: value });
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setCurrentWork({
        ...currentWork,
        achievements: [...currentWork.achievements, newAchievement.trim()]
      });
      setNewAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    setCurrentWork({
      ...currentWork,
      achievements: currentWork.achievements.filter((_, i) => i !== index)
    });
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setCurrentWork({
        ...currentWork,
        responsibilities: [...currentWork.responsibilities, newResponsibility.trim()]
      });
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    setCurrentWork({
      ...currentWork,
      responsibilities: currentWork.responsibilities.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase size={20} />
          Current Work & Experience
        </CardTitle>
        <CardDescription>
          Highlight your current role, responsibilities, and recent achievements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Current Company *</Label>
            <Input
              id="company"
              placeholder="Tech Solutions Inc."
              value={currentWork.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="position">Position/Title *</Label>
            <Input
              id="position"
              placeholder="Senior Software Engineer"
              value={currentWork.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            placeholder="Jan 2022 - Present (2+ years)"
            value={currentWork.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />
        </div>

        {/* Key Responsibilities */}
        <div>
          <Label>Key Responsibilities</Label>
          <div className="space-y-3 mt-2">
            <div className="flex gap-2">
              <Textarea
                placeholder="Lead a team of 5 developers in building scalable web applications..."
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addResponsibility())}
                rows={2}
                className="flex-1"
              />
              <Button onClick={addResponsibility} type="button" size="sm" className="self-end">
                <Plus size={16} />
              </Button>
            </div>
            
            {currentWork.responsibilities.length > 0 && (
              <div className="space-y-2">
                {currentWork.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-1 text-sm">• {responsibility}</span>
                    <button 
                      onClick={() => removeResponsibility(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Key Achievements */}
        <div>
          <Label>Notable Achievements</Label>
          <div className="space-y-3 mt-2">
            <div className="flex gap-2">
              <Textarea
                placeholder="Improved system performance by 40% through optimization..."
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addAchievement())}
                rows={2}
                className="flex-1"
              />
              <Button onClick={addAchievement} type="button" size="sm" className="self-end">
                <Plus size={16} />
              </Button>
            </div>
            
            {currentWork.achievements.length > 0 && (
              <div className="space-y-2">
                {currentWork.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <span className="flex-1 text-sm">🏆 {achievement}</span>
                    <button 
                      onClick={() => removeAchievement(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">💼 Professional Presentation Tips</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Use action verbs (Led, Implemented, Optimized, Delivered)</li>
            <li>• Include specific metrics and numbers where possible</li>
            <li>• Focus on results and impact, not just tasks</li>
            <li>• Highlight leadership and collaboration experiences</li>
            <li>• Show progression and increased responsibilities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWorkSection;
