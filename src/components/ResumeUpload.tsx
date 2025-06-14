
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2, Linkedin, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { generateContent } from "@/services/llmService";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
}

const ResumeUpload = ({ onDataExtracted, llmProvider, llmApiKey }: ResumeUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLinkedinExtracting, setIsLinkedinExtracting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          if (file.type === "application/pdf") {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            const text = new TextDecoder().decode(uint8Array);
            
            const textContent = text.replace(/[^\x20-\x7E\n\r]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
            
            resolve(textContent);
          } else {
            resolve(e.target?.result as string);
          }
        } catch (error) {
          reject(new Error("Failed to extract text from file"));
        }
      };
      
      reader.onerror = () => reject(new Error("Failed to read file"));
      
      if (file.type === "application/pdf") {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const extractDataWithAI = async (resumeText: string) => {
    if (!llmProvider || !llmApiKey) {
      throw new Error("Please configure your AI provider first");
    }

    const prompt = `Extract the following information from this resume text and return it as a JSON object:

Resume Text:
${resumeText}

Please extract and structure the data as follows:
{
  "name": "Full Name",
  "title": "Professional Title/Position",
  "email": "email@example.com",
  "phone": "+1 (555) 123-4567",
  "summary": "Professional summary or objective",
  "yearsExperience": "5+ years",
  "skills": [
    {"name": "JavaScript", "level": "Expert"},
    {"name": "React", "level": "Advanced"}
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Brief description",
      "technologies": ["React", "Node.js"]
    }
  ],
  "currentWork": {
    "company": "Company Name",
    "position": "Position Title",
    "duration": "Jan 2022 - Present",
    "achievements": ["Achievement 1", "Achievement 2"],
    "responsibilities": ["Responsibility 1", "Responsibility 2"]
  },
  "achievements": [
    {"title": "Award/Achievement", "description": "Description", "year": "2023"}
  ]
}

Return ONLY the JSON object without any markdown formatting or additional text.`;

    const response = await generateContent({
      provider: llmProvider,
      apiKey: llmApiKey,
      prompt
    });

    if (response.error) {
      throw new Error(response.error);
    }

    try {
      let cleanContent = response.content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\n?/, '').replace(/```$/, '');
      }
      
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error("Failed to parse AI response:", response.content);
      throw new Error("Failed to extract structured data from resume");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setIsExtracting(true);
    setUploadSuccess(false);

    try {
      if (!file.type.includes("pdf") && !file.type.includes("text") && !file.name.endsWith(".txt")) {
        throw new Error("Please upload a PDF or text file");
      }

      toast({
        title: "Processing Resume",
        description: "Extracting text from your resume...",
      });

      const extractedText = await extractTextFromFile(file);
      
      if (extractedText.length < 50) {
        throw new Error("Could not extract enough text from the file. Please ensure it's a text-based resume.");
      }

      toast({
        title: "Analyzing Content",
        description: "AI is extracting your professional information...",
      });

      const extractedData = await extractDataWithAI(extractedText);
      onDataExtracted(extractedData);
      setUploadSuccess(true);
      
      toast({
        title: "Success!",
        description: "Your resume has been processed and profile updated.",
      });
      
    } catch (error) {
      console.error("Resume extraction error:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to process resume",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsExtracting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleLinkedinImport = async () => {
    if (!linkedinUrl.trim()) return;
    
    setIsLinkedinExtracting(true);
    
    try {
      toast({
        title: "Importing Profile",
        description: "Generating demo data based on LinkedIn URL...",
      });

      const prompt = `Based on this LinkedIn profile URL: ${linkedinUrl}, generate realistic professional data for demonstration purposes.

Create a JSON object with:
{
  "name": "Professional Name",
  "title": "Current Job Title",
  "email": "professional.email@company.com",
  "phone": "+1 (555) 123-4567",
  "summary": "Compelling professional summary highlighting key achievements and expertise",
  "yearsExperience": "X+ years",
  "skills": [
    {"name": "Skill Name", "level": "Expert/Advanced/Intermediate"}
  ],
  "currentWork": {
    "company": "Current Company",
    "position": "Current Position",
    "duration": "Start Date - Present",
    "achievements": ["Notable achievement with metrics"],
    "responsibilities": ["Key responsibility"]
  }
}

Make it realistic and professional. Return ONLY the JSON object.`;

      const response = await generateContent({
        provider: llmProvider,
        apiKey: llmApiKey,
        prompt
      });

      if (response.error) {
        throw new Error(response.error);
      }

      let cleanContent = response.content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
      }

      const extractedData = JSON.parse(cleanContent);
      onDataExtracted(extractedData);
      setLinkedinUrl("");
      
      toast({
        title: "Import Successful",
        description: "Demo profile data has been generated and applied.",
      });
      
    } catch (error) {
      console.error("LinkedIn extraction error:", error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import LinkedIn profile",
        variant: "destructive",
      });
    } finally {
      setIsLinkedinExtracting(false);
    }
  };

  const canUseAI = llmProvider && llmApiKey;

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles size={24} className="text-blue-600" />
          Smart Import
        </CardTitle>
        <CardDescription className="text-base">
          Upload your resume or import from LinkedIn to automatically fill your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!canUseAI && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-amber-600" />
              <span className="font-medium text-amber-900">AI Configuration Required</span>
            </div>
            <p className="text-sm text-amber-800">
              Please configure your AI provider in the settings above to use smart import features.
            </p>
          </div>
        )}

        {/* Resume Upload */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-gray-600" />
            <Label className="text-lg font-semibold">Upload Resume</Label>
          </div>
          
          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            uploadSuccess ? 'border-green-400 bg-green-50' : 
            canUseAI ? 'border-gray-300 hover:border-blue-400' : 'border-gray-200 bg-gray-50'
          }`}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              className="hidden"
              disabled={!canUseAI}
            />
            
            <div className="space-y-4">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                uploadSuccess ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {isUploading ? (
                  <Loader2 size={24} className="text-blue-600 animate-spin" />
                ) : uploadSuccess ? (
                  <CheckCircle size={24} className="text-green-600" />
                ) : (
                  <Upload size={24} className="text-blue-600" />
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isExtracting ? "Extracting data..." : 
                   uploadSuccess ? "Upload successful!" : 
                   "Drop your resume here"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {isExtracting 
                    ? "AI is analyzing your resume and extracting relevant information"
                    : uploadSuccess
                    ? "Your profile has been updated with the extracted information"
                    : "Supports PDF and text files • AI will extract and fill your profile automatically"
                  }
                </p>
              </div>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || !canUseAI}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Choose File
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* LinkedIn Import */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Linkedin size={20} className="text-blue-700" />
            <Label className="text-lg font-semibold">Import from LinkedIn (Demo)</Label>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This generates demo data for demonstration purposes and does not access real LinkedIn profiles.
            </p>
          </div>
          
          <div className="space-y-3">
            <Input
              placeholder="https://linkedin.com/in/your-profile"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={!canUseAI}
              className="text-base"
            />
            
            <Button
              onClick={handleLinkedinImport}
              disabled={!linkedinUrl.trim() || isLinkedinExtracting || !canUseAI}
              variant="outline"
              className="w-full border-blue-200 hover:bg-blue-50"
            >
              {isLinkedinExtracting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Generating Demo Data...
                </>
              ) : (
                <>
                  <Linkedin size={16} className="mr-2" />
                  Generate Demo Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2">✨ Smart Features</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• AI automatically extracts personal information, skills, and experience</li>
            <li>• Supports PDF and text resume formats</li>
            <li>• LinkedIn import generates realistic demo data</li>
            <li>• All data can be edited and refined after import</li>
            <li>• Your data is processed securely with your chosen AI provider</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
