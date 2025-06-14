
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePresentationContext } from "@/contexts/PresentationContext";
import { Briefcase } from "lucide-react";

const JobDetailsSection = () => {
  const { jobDetails, setJobDetails } = usePresentationContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <Briefcase size={22} className="text-sky-400"/>
          Target Job Details
        </CardTitle>
        <CardDescription className="text-slate-400">
          Provide details about the job to tailor your presentation content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="font-semibold text-slate-300">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={jobDetails.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Frontend Developer"
              className="bg-slate-900/80 border-slate-700 text-slate-200 focus:ring-sky-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="font-semibold text-slate-300">Company</Label>
            <Input
              id="company"
              name="company"
              value={jobDetails.company}
              onChange={handleChange}
              placeholder="e.g., Acme Corporation"
              className="bg-slate-900/80 border-slate-700 text-slate-200 focus:ring-sky-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="font-semibold text-slate-300">Job Description</Label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            value={jobDetails.jobDescription}
            onChange={handleChange}
            placeholder="Paste the job description here..."
            className="h-48 bg-slate-900/80 border-slate-700 text-slate-200 focus:ring-sky-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDetailsSection;
