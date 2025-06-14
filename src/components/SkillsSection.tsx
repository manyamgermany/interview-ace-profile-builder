
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Plus, X } from "lucide-react";

interface Skill {
  name: string;
  level: string;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

const SkillsSection = ({ skills, setSkills }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skillCategory, setSkillCategory] = useState("");

  const categories = [
    "Technical Skills",
    "Programming Languages",
    "Frameworks & Tools",
    "Soft Skills",
    "Leadership",
    "Languages"
  ];

  const levels = [
    "Beginner",
    "Intermediate", 
    "Advanced",
    "Expert"
  ];

  const addSkill = () => {
    if (newSkill.trim() && skillLevel && skillCategory) {
      setSkills([...skills, {
        name: newSkill.trim(),
        level: skillLevel,
        category: skillCategory
      }]);
      setNewSkill("");
      setSkillLevel("");
      setSkillCategory("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-green-100 text-green-800";
      case "Advanced": return "bg-blue-100 text-blue-800"; 
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Beginner": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code size={20} />
          Skills & Expertise
        </CardTitle>
        <CardDescription>
          Showcase your technical and soft skills with proficiency levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Skill */}
        <div className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <Input
            placeholder="Skill name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <Select value={skillCategory} onValueChange={setSkillCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={skillLevel} onValueChange={setSkillLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addSkill} className="w-full">
            <Plus size={16} className="mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills Display */}
        {Object.keys(groupedSkills).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg mb-3 text-gray-900">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={`${skill.name}-${index}`}
                      className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm"
                    >
                      <span className="font-medium">{skill.name}</span>
                      <Badge className={getLevelColor(skill.level)} variant="secondary">
                        {skill.level}
                      </Badge>
                      <button
                        onClick={() => removeSkill(skills.findIndex(s => s.name === skill.name && s.category === skill.category))}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Code size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No skills added yet. Start building your skill portfolio!</p>
          </div>
        )}

        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-900 mb-2">🎯 Skill Selection Strategy</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Focus on skills relevant to your target role</li>
            <li>• Include a mix of technical and soft skills</li>
            <li>• Be honest about your proficiency levels</li>
            <li>• Limit to 15-20 skills maximum for better impact</li>
            <li>• Group related skills for better organization</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
