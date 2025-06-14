
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Code, Target, Briefcase, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PresentationPreviewProps {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    summary: string;
    yearsExperience: string;
  };
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    role: string;
    duration: string;
    achievements: string[];
    link?: string;
  }>;
  currentWork: {
    company: string;
    position: string;
    duration: string;
    achievements: string[];
    responsibilities: string[];
  };
}

const PresentationPreview = ({ personalInfo, skills, projects, currentWork }: PresentationPreviewProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Feature Coming Soon!",
      description: "PDF export functionality will be available in the next update.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Feature Coming Soon!",
      description: "You'll be able to share your presentation link with others soon.",
    });
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-green-500 text-white";
      case "Advanced": return "bg-blue-500 text-white"; 
      case "Intermediate": return "bg-yellow-500 text-white";
      case "Beginner": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Presentation Preview</h2>
        <div className="flex justify-center gap-4">
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download size={16} />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
            <Share2 size={16} />
            Share Link
          </Button>
        </div>
      </div>

      {/* Slide 1: Personal Introduction */}
      <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <CardContent className="p-8 text-center">
          <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
          <p className="text-xl mb-4 text-blue-100">{personalInfo.title || "Your Professional Title"}</p>
          {personalInfo.yearsExperience && (
            <p className="text-lg text-blue-200">{personalInfo.yearsExperience} of Experience</p>
          )}
          <div className="flex justify-center gap-6 mt-6 text-blue-200">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Slide 2: Professional Summary */}
      {personalInfo.summary && (
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle className="text-2xl text-center">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
              {personalInfo.summary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Slide 3: Skills & Expertise */}
      {skills.length > 0 && (
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Code size={24} />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <Badge className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Slide 4: Current Work */}
      {currentWork.company && currentWork.position && (
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Briefcase size={24} />
              Current Role
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{currentWork.position}</h3>
              <p className="text-lg text-gray-600">{currentWork.company}</p>
              {currentWork.duration && (
                <p className="text-gray-500">{currentWork.duration}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {currentWork.responsibilities.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {currentWork.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentWork.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Notable Achievements</h4>
                  <ul className="space-y-2">
                    {currentWork.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">🏆</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slide 5: Key Projects */}
      {projects.length > 0 && (
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Target size={24} />
              Key Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-6">
              {projects.slice(0, 3).map((project, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                    <span className="text-sm text-gray-500">{project.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.role}</p>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  )}

                  {project.achievements.length > 0 && (
                    <ul className="text-sm text-gray-700">
                      {project.achievements.slice(0, 2).map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slide 6: Thank You */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <CardContent className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Thank You</h2>
          <p className="text-xl mb-6 text-indigo-100">Questions & Discussion</p>
          <div className="flex justify-center gap-8 text-indigo-200">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={20} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={20} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Ready to present your professional story?</p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleExport} size="lg" className="flex items-center gap-2">
            <Download size={20} />
            Download Presentation
          </Button>
          <Button variant="outline" onClick={handleShare} size="lg" className="flex items-center gap-2">
            <Share2 size={20} />
            Share with Others
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresentationPreview;
