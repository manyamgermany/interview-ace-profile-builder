import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Code, Target, Eye, Download, Camera, Palette, Award, Users, Bot, Sparkles } from "lucide-react";
import PersonalInfoSection from "@/components/PersonalInfoSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import PhotoUploadSection from "@/components/PhotoUploadSection";
import ThemeSelector from "@/components/ThemeSelector";
import AchievementsSection from "@/components/AchievementsSection";
import ReferencesSection from "@/components/ReferencesSection";
import PracticeMode from "@/components/PracticeMode";
import LLMProviderSettings from "@/components/LLMProviderSettings";
import ResumeUpload from "@/components/ResumeUpload";
import PresentationPreviewModal from "@/components/PresentationPreviewModal";
import JobDetailsSection from "@/components/JobDetailsSection";
import { PresentationProvider, usePresentationContext } from "@/contexts/PresentationContext";
import { LLMProvider } from "@/contexts/LLMContext";
import ExportModal from "@/components/ExportModal";

const IndexContent = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const {
    personalInfo,
    setPersonalInfo,
    skills,
    setSkills,
    projects,
    setProjects,
    currentWork,
    setCurrentWork,
    achievements,
    setAchievements,
    references,
    setReferences,
    profilePhoto,
    setProfilePhoto,
    selectedTheme,
    setSelectedTheme,
    handleDataExtracted,
    calculateProgress,
    isReadyForPreview
  } = usePresentationContext();

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
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-4">
            PitchPerfect
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Engineer a bespoke, AI-powered presentation tailored to your next career move.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <LLMProviderSettings />
            <ResumeUpload onDataExtracted={handleDataExtracted} />
            <JobDetailsSection />

            <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                    <Sparkles size={22} className="text-sky-400" />
                    Presentation Content
                  </CardTitle>
                  <Badge variant={calculateProgress() === 100 ? "default" : "secondary"} className="text-base px-4 py-1.5 bg-sky-500/10 text-sky-300 border border-sky-400/30">
                    {calculateProgress()}% Complete
                  </Badge>
                </div>
                <CardDescription className="text-slate-400 pt-2">
                  Complete each section below to build your presentation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={calculateProgress()} className="w-full h-2 bg-slate-700" />
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-7 h-16 bg-slate-800/80 backdrop-blur-sm border border-slate-700 shadow-md p-1 rounded-xl">
                <TabsTrigger value="personal" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <User size={18} /> Personal
                </TabsTrigger>
                <TabsTrigger value="photo" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <Camera size={18} /> Photo
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <Code size={18} /> Skills
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <Target size={18} /> Projects
                </TabsTrigger>
                <TabsTrigger value="current" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <Briefcase size={18} /> Current
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <Award size={18} /> Awards
                </TabsTrigger>
                <TabsTrigger value="references" className="flex flex-col items-center gap-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 text-slate-400">
                  <Users size={18} /> References
                </TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-6"><PersonalInfoSection personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} /></TabsContent>
              <TabsContent value="photo" className="mt-6"><PhotoUploadSection profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} /></TabsContent>
              <TabsContent value="skills" className="mt-6"><SkillsSection skills={skills} setSkills={setSkills} /></TabsContent>
              <TabsContent value="projects" className="mt-6"><ProjectsSection projects={projects} setProjects={setProjects} /></TabsContent>
              <TabsContent value="current" className="mt-6"><CurrentWorkSection currentWork={currentWork} setCurrentWork={setCurrentWork} /></TabsContent>
              <TabsContent value="achievements" className="mt-6"><AchievementsSection achievements={achievements} setAchievements={setAchievements} /></TabsContent>
              <TabsContent value="references" className="mt-6"><ReferencesSection references={references} setReferences={setReferences} /></TabsContent>
            </Tabs>

            <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
          </div>

          <aside className="lg:col-span-2 lg:sticky top-8 self-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="border-slate-700 bg-slate-800/50 shadow-xl backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
                  <Palette size={22} className="text-sky-400" />
                  Actions & Tips
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Preview, practice, and perfect your presentation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full h-12 text-lg font-semibold bg-sky-600 hover:bg-sky-500 text-white" disabled={!isReadyForPreview()} onClick={() => setIsPreviewModalOpen(true)}>
                  <Eye size={20} className="mr-2" />
                  Preview Presentation
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg border-sky-400/40 text-sky-300 hover:bg-sky-500/10 hover:text-sky-200" onClick={() => setIsPracticeMode(true)} disabled={calculateProgress() < 50}>
                  <Bot size={20} className="mr-2" />
                  Practice Mode
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg border-sky-400/40 text-sky-300 hover:bg-sky-500/10 hover:text-sky-200" disabled={calculateProgress() < 75} onClick={() => setIsExportModalOpen(true)}>
                  <Download size={20} className="mr-2" />
                  Export Presentation
                </Button>
                <div className="pt-6 border-t border-slate-700">
                  <h4 className="font-bold mb-4 text-lg text-white">💡 Pro Tips:</h4>
                  <ul className="text-sm text-slate-400 space-y-3 font-medium">
                    <li className="flex items-start gap-3"><span className="text-sky-500 mt-1">◆</span>Upload a professional headshot for maximum impact.</li>
                    <li className="flex items-start gap-3"><span className="text-sky-500 mt-1">◆</span>Keep your summary compelling but under 150 words.</li>
                    <li className="flex items-start gap-3"><span className="text-sky-500 mt-1">◆</span>Highlight 5-7 key skills with specific expertise levels.</li>
                    <li className="flex items-start gap-3"><span className="text-sky-500 mt-1">◆</span>Include quantifiable achievements and results.</li>
                    <li className="flex items-start gap-3"><span className="text-sky-500 mt-1">◆</span>Use the job description to align your key projects.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <PresentationPreviewModal 
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
        />

        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={{
            personalInfo,
            skills,
            projects,
            currentWork,
            achievements,
            references,
            profilePhoto,
            theme: selectedTheme
          }}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LLMProvider>
      <PresentationProvider>
        <IndexContent />
      </PresentationProvider>
    </LLMProvider>
  );
};

export default Index;
