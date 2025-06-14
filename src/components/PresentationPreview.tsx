import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Code, Target, Briefcase, Download, Share2, Star, Award, Users } from "lucide-react";
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
  achievements?: any[];
  references?: any[];
  profilePhoto?: string;
  theme?: string;
}

const PresentationPreview = ({ 
  personalInfo, 
  skills, 
  projects, 
  currentWork, 
  achievements = [], 
  references = [], 
  profilePhoto = "", 
  theme = "professional" 
}: PresentationPreviewProps) => {
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

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case "creative":
        return {
          primary: "from-purple-900 to-pink-900",
          accent: "text-pink-300",
          badge: "bg-purple-100 text-purple-800 border-purple-300"
        };
      case "tech":
        return {
          primary: "from-emerald-900 to-cyan-900",
          accent: "text-cyan-300",
          badge: "bg-emerald-100 text-emerald-800 border-emerald-300"
        };
      case "executive":
        return {
          primary: "from-gray-900 to-amber-900",
          accent: "text-amber-300",
          badge: "bg-amber-100 text-amber-800 border-amber-300"
        };
      default:
        return {
          primary: "from-gray-900 to-black",
          accent: "text-sky-300",
          badge: "bg-sky-100 text-sky-800 border-sky-300"
        };
    }
  };

  const themeColors = getThemeColors(theme);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Advanced": return "bg-sky-100 text-sky-800 border-sky-300"; 
      case "Intermediate": return "bg-amber-100 text-amber-800 border-amber-300";
      case "Beginner": return "bg-slate-100 text-slate-800 border-slate-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
      <div className="p-6 sm:p-8 bg-gray-50 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Presentation Preview</h2>
        <div className="flex justify-center gap-4">
          <Button onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 size={16} className="mr-2" />
            Share Link
          </Button>
        </div>
      </div>

      <div className="p-6 sm:p-10 space-y-10">
        {/* Slide 1: Personal Introduction */}
        <Card className={`bg-gradient-to-br ${themeColors.primary} text-white shadow-xl rounded-2xl overflow-hidden`}>
          <CardContent className="p-8 sm:p-12 text-center relative">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
            <div className="relative">
              <div className="w-32 h-32 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center ring-4 ring-white/20 backdrop-blur-sm overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={56} className="text-white" />
                )}
              </div>
              <h1 className="text-5xl font-extrabold mb-2 tracking-tight">{personalInfo.name || "Your Name"}</h1>
              <p className={`text-2xl mb-4 ${themeColors.accent}`}>{personalInfo.title || "Your Professional Title"}</p>
              {personalInfo.yearsExperience && (
                <Badge variant="secondary" className="bg-white/20 text-white border-transparent text-base">
                  {personalInfo.yearsExperience} of Experience
                </Badge>
              )}
              <div className={`flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2 mt-8 ${themeColors.accent}`}>
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
            </div>
          </CardContent>
        </Card>

        {/* Slide 2: Professional Summary */}
        {personalInfo.summary && (
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-2xl font-bold text-center">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto font-serif">
                "{personalInfo.summary}"
              </p>
            </CardContent>
          </Card>
        )}

        {/* Slide 3: Skills & Expertise */}
        {skills.length > 0 && (
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Code size={24} />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill, index) => (
                      <Badge key={index} className={`text-sm px-3 py-1 border ${getLevelColor(skill.level)}`}>
                        {skill.name}
                        <span className="font-normal opacity-70 ml-2 pl-2 border-l border-current">{skill.level}</span>
                      </Badge>
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
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Briefcase size={24} />
                Current Role
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{currentWork.position}</h3>
                <p className="text-xl text-gray-600">at {currentWork.company}</p>
                {currentWork.duration && (
                  <p className="text-gray-500 mt-1">{currentWork.duration}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {currentWork.responsibilities.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {currentWork.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="text-sky-500 mt-1.5">◆</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentWork.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Notable Achievements</h4>
                    <ul className="space-y-2">
                      {currentWork.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <Star size={16} className="text-amber-500 mt-1 shrink-0" />
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
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Target size={24} />
                Key Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="border-l-4 border-sky-500 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                      <span className="text-sm text-gray-500 font-medium">{project.duration}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 font-semibold">{project.role}</p>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-sky-300 text-sky-800">{tech}</Badge>
                        ))}
                      </div>
                    )}

                    {project.achievements.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {project.achievements.slice(0, 2).map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2">
                            <span className="text-emerald-500">✓</span>
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

        {/* New Achievements Section */}
        {achievements.length > 0 && (
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Award size={24} />
                Awards & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex items-start gap-3 mb-3">
                      <Award size={20} className="text-yellow-600 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{achievement.title}</h3>
                        <p className="text-gray-600">{achievement.organization}</p>
                        {achievement.date && <p className="text-sm text-gray-500">{achievement.date}</p>}
                      </div>
                    </div>
                    {achievement.description && (
                      <p className="text-gray-700 text-sm">{achievement.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* New References Section */}
        {references.length > 0 && (
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Users size={24} />
                Professional References
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {references.slice(0, 4).map((reference, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-1">{reference.name}</h3>
                    <p className="text-gray-600 mb-2">{reference.title}</p>
                    <p className="text-sm text-blue-600 font-medium mb-3">{reference.company}</p>
                    {reference.testimonial && (
                      <blockquote className="text-sm text-gray-700 italic border-l-4 border-blue-500 pl-4">
                        "{reference.testimonial}"
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Slide 6: Thank You */}
        <Card className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white rounded-2xl shadow-xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Thank You</h2>
            <p className="text-2xl mb-8 text-indigo-200">Questions & Discussion</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-4 text-indigo-200">
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
      </div>
    </div>
  );
};

export default PresentationPreview;
