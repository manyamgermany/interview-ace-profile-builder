
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Briefcase } from "lucide-react";

interface PersonalInfoSectionProps {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    summary: string;
    yearsExperience: string;
  };
  setPersonalInfo: (info: any) => void;
}

const PersonalInfoSection = ({ personalInfo, setPersonalInfo }: PersonalInfoSectionProps) => {
  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={20} />
          Personal Information
        </CardTitle>
        <CardDescription>
          Your basic information and professional summary that will make the first impression
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={personalInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title *</Label>
            <Input
              id="title"
              placeholder="Senior Software Engineer"
              value={personalInfo.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10"
                value={personalInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                className="pl-10"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
            <Input
              id="experience"
              placeholder="5+ years"
              className="pl-10"
              value={personalInfo.yearsExperience}
              onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="summary">Professional Summary *</Label>
          <Textarea
            id="summary"
            placeholder="Write a compelling 2-3 sentence summary that highlights your key strengths, experience, and what makes you unique as a candidate..."
            rows={4}
            value={personalInfo.summary}
            onChange={(e) => handleInputChange("summary", e.target.value)}
            className="resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            {personalInfo.summary.length}/400 characters - Keep it concise and impactful
          </p>
        </div>

        <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
          <h4 className="font-semibold text-sky-900 mb-2">💡 Writing Tips</h4>
          <ul className="text-sm text-sky-800 space-y-1 list-disc list-inside">
            <li>Start with your years of experience and key expertise</li>
            <li>Mention your most relevant skills for the target role</li>
            <li>Include a notable achievement or unique value proposition</li>
            <li>End with your career goal or what you're seeking</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
