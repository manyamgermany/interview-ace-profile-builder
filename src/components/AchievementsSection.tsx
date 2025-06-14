
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award, Plus, X, Trophy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
}

const AchievementsSection = ({ achievements, setAchievements }: AchievementsSectionProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    title: "",
    organization: "",
    date: "",
    description: "",
    type: "Award"
  });

  const achievementTypes = ["Award", "Certification", "Recognition", "Achievement", "Honor"];

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.organization) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement({
        title: "",
        organization: "",
        date: "",
        description: "",
        type: "Award"
      });
      setIsAdding(false);
      toast({
        title: "Achievement Added!",
        description: "Your achievement has been added to your presentation.",
      });
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
    toast({
      title: "Achievement Removed",
      description: "The achievement has been removed from your presentation.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Award": return <Award size={16} className="text-yellow-600" />;
      case "Certification": return <Star size={16} className="text-blue-600" />;
      case "Recognition": return <Trophy size={16} className="text-purple-600" />;
      default: return <Award size={16} className="text-green-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Award": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Certification": return "bg-blue-100 text-blue-800 border-blue-300";
      case "Recognition": return "bg-purple-100 text-purple-800 border-purple-300";
      default: return "bg-green-100 text-green-800 border-green-300";
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Award size={24} className="text-yellow-600" />
          Awards & Achievements
        </CardTitle>
        <CardDescription className="text-lg">
          Showcase your awards, certifications, and professional recognition to stand out from other candidates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Achievements */}
        {achievements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Achievements</h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(achievement.type)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(achievement.type)}`}>
                      {achievement.type}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X size={16} />
                  </Button>
                </div>
                <h4 className="font-bold text-lg mb-2">{achievement.title}</h4>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{achievement.organization}</span>
                  {achievement.date && <span className="ml-2 text-sm">• {achievement.date}</span>}
                </p>
                {achievement.description && (
                  <p className="text-gray-700">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add New Achievement */}
        {!isAdding ? (
          <Button 
            onClick={() => setIsAdding(true)} 
            className="w-full h-16 text-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            variant="ghost"
          >
            <Plus size={24} className="mr-2" />
            Add Achievement
          </Button>
        ) : (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Add New Achievement</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Achievement Title *</label>
                  <Input
                    placeholder="e.g., Employee of the Year"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Organization *</label>
                  <Input
                    placeholder="e.g., ABC Corporation"
                    value={newAchievement.organization}
                    onChange={(e) => setNewAchievement({...newAchievement, organization: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newAchievement.type}
                    onChange={(e) => setNewAchievement({...newAchievement, type: e.target.value})}
                  >
                    {achievementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    placeholder="e.g., December 2023"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Brief description of the achievement and its significance..."
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={addAchievement} disabled={!newAchievement.title || !newAchievement.organization}>
                  Add Achievement
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <h4 className="font-bold mb-3 text-yellow-900">🏆 Achievement Tips:</h4>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li>• Include quantifiable achievements (e.g., "Increased sales by 25%")</li>
            <li>• Mention recognition from reputable organizations or industry leaders</li>
            <li>• List relevant certifications that boost your credibility</li>
            <li>• Include recent achievements to show ongoing excellence</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;
