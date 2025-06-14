import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Code, Target, Eye, Download, Camera, Palette, Award, Users } from "lucide-react";
import PersonalInfoSection from "@/components/PersonalInfoSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import PresentationPreview from "@/components/PresentationPreview";
import PhotoUploadSection from "@/components/PhotoUploadSection";
import ThemeSelector from "@/components/ThemeSelector";
import AchievementsSection from "@/components/AchievementsSection";
import ReferencesSection from "@/components/ReferencesSection";
import PracticeMode from "@/components/PracticeMode";
import LLMProviderSettings from "@/components/LLMProviderSettings";
import ResumeUpload from "@/components/ResumeUpload";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedTheme, setSelectedTheme] = useState("professional");
  const [profilePhoto, setProfilePhoto] = useState("");
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
  const [achievements, setAchievements] = useState([]);
  const [references, setReferences] = useState([]);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [llmProvider, setLlmProvider] = useState("");
  const [llmApiKey, setLlmApiKey] = useState("");

  const handleDataExtracted = (extractedData: any) => {
    console.log("Extracted data:", extractedData);
    
    // Update personal info
    if (extractedData.name || extractedData.title || extractedData.email || extractedData.phone || extractedData.summary || extractedData.yearsExperience) {
      setPersonalInfo(prev => ({
        ...prev,
        name: extractedData.name || prev.name,
        title: extractedData.title || prev.title,
        email: extractedData.email || prev.email,
        phone: extractedData.phone || prev.phone,
        summary: extractedData.summary || prev.summary,
        yearsExperience: extractedData.yearsExperience || prev.yearsExperience
      }));
    }

    // Update skills
    if (extractedData.skills && Array.isArray(extractedData.skills)) {
      setSkills(extractedData.skills);
    }

    // Update projects
    if (extractedData.projects && Array.isArray(extractedData.projects)) {
      setProjects(extractedData.projects);
    }

    // Update current work
    if (extractedData.currentWork) {
      setCurrentWork(prev => ({
        ...prev,
        ...extractedData.currentWork
      }));
    }

    // Update achievements
    if (extractedData.achievements && Array.isArray(extractedData.achievements)) {
      setAchievements(extractedData.achievements);
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    const sections = 7; // Updated for new sections
    
    if (personalInfo.name && personalInfo.title && personalInfo.summary) completed += 1;
    if (profilePhoto) completed += 1;
    if (skills.length > 0) completed += 1;
    if (projects.length > 0) completed += 1;
    if (currentWork.company && currentWork.position) completed += 1;
    if (achievements.length > 0) completed += 1;
    if (references.length > 0) completed += 1;
    
    return Math.round((completed / sections) * 100);
  };

  const isReadyForPreview = () => {
    return personalInfo.name && personalInfo.title && skills.length > 0;
  };

  if (isPracticeMode) {
    return (
      <PracticeMode 
        personalInfo={personalInfo}
        skills={skills}
        projects={projects}
        currentWork={currentWork}
        achievements={achievements}
        references={references}
        profilePhoto={profilePhoto}
        theme={selectedTheme}
        onExit={() => setIsPracticeMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Master Your Interview
          </h1>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium">
            Create stunning, professional presentations that showcase your expertise and land you the job of your dreams.
          </p>
        </div>

        {/* LLM Provider Settings */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.05s' }}>
          <LLMProviderSettings 
            selectedProvider={llmProvider}
            apiKey={llmApiKey}
            onProviderChange={setLlmProvider}
            onApiKeyChange={setLlmApiKey}
          />
        </div>

        {/* Resume Upload */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.08s' }}>
          <ResumeUpload 
            onDataExtracted={handleDataExtracted}
            llmProvider={llmProvider}
            llmApiKey={llmApiKey}
          />
        </div>

        {/* Theme Selector */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.1s' }}>
          <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
        </div>

        {/* Progress Bar */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="mb-10 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Presentation Progress</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={calculateProgress() === 100 ? "default" : "secondary"} className="text-lg px-4 py-1">
                    {calculateProgress()}% Complete
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsPracticeMode(true)}
                    disabled={calculateProgress() < 50}
                    className="flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Practice Mode
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={calculateProgress()} className="w-full h-3" />
              <p className="text-slate-600 mt-3 font-medium">
                Complete all sections to create a presentation that will impress any interviewer.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-7 h-14 bg-white/80 backdrop-blur-sm border shadow-md">
                <TabsTrigger value="personal" className="flex flex-col items-center gap-1 text-xs">
                  <User size={18} />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="photo" className="flex flex-col items-center gap-1 text-xs">
                  <Camera size={18} />
                  Photo
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex flex-col items-center gap-1 text-xs">
                  <Code size={18} />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex flex-col items-center gap-1 text-xs">
                  <Target size={18} />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="current" className="flex flex-col items-center gap-1 text-xs">
                  <Briefcase size={18} />
                  Current
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex flex-col items-center gap-1 text-xs">
                  <Award size={18} />
                  Awards
                </TabsTrigger>
                <TabsTrigger value="references" className="flex flex-col items-center gap-1 text-xs">
                  <Users size={18} />
                  References
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoSection 
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                  llmProvider={llmProvider}
                  llmApiKey={llmApiKey}
                />
              </TabsContent>

              <TabsContent value="photo" className="mt-6">
                <PhotoUploadSection 
                  profilePhoto={profilePhoto}
                  setProfilePhoto={setProfilePhoto}
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

              <TabsContent value="achievements" className="mt-6">
                <AchievementsSection 
                  achievements={achievements}
                  setAchievements={setAchievements}
                />
              </TabsContent>

              <TabsContent value="references" className="mt-6">
                <ReferencesSection 
                  references={references}
                  setReferences={setReferences}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Card className="sticky top-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Palette size={24} />
                  Actions & Tips
                </CardTitle>
                <CardDescription className="text-base">
                  Preview, practice, and perfect your presentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full h-12 text-lg font-semibold" 
                  disabled={!isReadyForPreview()}
                  onClick={() => setActiveTab("preview")}
                >
                  <Eye size={20} className="mr-2" />
                  Preview Presentation
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-lg"
                  onClick={() => setIsPracticeMode(true)}
                  disabled={calculateProgress() < 50}
                >
                  <Target size={20} className="mr-2" />
                  Practice Mode
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-lg"
                  disabled={calculateProgress() < 75}
                >
                  <Download size={20} className="mr-2" />
                  Export PDF
                </Button>
                
                <div className="pt-6 border-t">
                  <h4 className="font-bold mb-4 text-lg">💡 Pro Tips:</h4>
                  <ul className="text-sm text-slate-700 space-y-3 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg">•</span>
                      Upload a professional headshot for maximum impact
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg">•</span>
                      Keep your summary compelling but under 150 words
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg">•</span>
                      Highlight 5-7 key skills with specific expertise levels
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg">•</span>
                      Include quantifiable achievements and results
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg">•</span>
                      Practice your 2-minute elevator pitch daily
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal/Section */}
        {activeTab === "preview" && (
          <div className="mt-10 animate-fade-in-up">
            <PresentationPreview 
              personalInfo={personalInfo}
              skills={skills}
              projects={projects}
              currentWork={currentWork}
              achievements={achievements}
              references={references}
              profilePhoto={profilePhoto}
              theme={selectedTheme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
