
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Code, Target, Eye, Download } from "lucide-react";
import PersonalInfoSection from "@/components/PersonalInfoSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import PresentationPreview from "@/components/PresentationPreview";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    yearsExperience: ""
  });
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentWork, setCurrentWork] = useState({
    company: "",
    position: "",
    duration: "",
    achievements: [],
    responsibilities: []
  });

  const calculateProgress = () => {
    let completed = 0;
    if (personalInfo.name && personalInfo.title && personalInfo.summary) completed += 25;
    if (skills.length > 0) completed += 25;
    if (projects.length > 0) completed += 25;
    if (currentWork.company && currentWork.position) completed += 25;
    return completed;
  };

  const isReadyForPreview = () => {
    return personalInfo.name && personalInfo.title && skills.length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Presentation Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a compelling presentation that showcases your professional story, 
            skills, and achievements to ace your next interview
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Presentation Progress</CardTitle>
              <Badge variant={calculateProgress() === 100 ? "default" : "secondary"}>
                {calculateProgress()}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={calculateProgress()} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">
              Complete all sections to unlock the preview and export features
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User size={16} />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Code size={16} />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Target size={16} />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="current" className="flex items-center gap-2">
                  <Briefcase size={16} />
                  Current Work
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoSection 
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillsSection 
                  skills={skills}
                  setSkills={setSkills}
                />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <ProjectsSection 
                  projects={projects}
                  setProjects={setProjects}
                />
              </TabsContent>

              <TabsContent value="current" className="mt-6">
                <CurrentWorkSection 
                  currentWork={currentWork}
                  setCurrentWork={setCurrentWork}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye size={20} />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Preview and export your presentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  disabled={!isReadyForPreview()}
                  onClick={() => setActiveTab("preview")}
                >
                  <Eye size={16} className="mr-2" />
                  Preview Presentation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={calculateProgress() < 75}
                >
                  <Download size={16} className="mr-2" />
                  Export PDF
                </Button>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Pro Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Keep your summary under 150 words</li>
                    <li>• Highlight 5-7 key skills maximum</li>
                    <li>• Include quantifiable achievements</li>
                    <li>• Practice your 2-minute elevator pitch</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal/Section */}
        {activeTab === "preview" && (
          <div className="mt-8">
            <PresentationPreview 
              personalInfo={personalInfo}
              skills={skills}
              projects={projects}
              currentWork={currentWork}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
