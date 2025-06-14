
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAIExtraction } from "@/hooks/useAIExtraction";

interface LinkedInImportSectionProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
  canUseAI: boolean;
}

const LinkedInImportSection = ({ onDataExtracted, llmProvider, llmApiKey, canUseAI }: LinkedInImportSectionProps) => {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLinkedinExtracting, setIsLinkedinExtracting] = useState(false);
  const { toast } = useToast();
  const { generateLinkedInDemoData } = useAIExtraction();

  const handleLinkedinImport = async () => {
    if (!linkedinUrl.trim()) return;
    
    setIsLinkedinExtracting(true);
    
    try {
      toast({
        title: "Importing Profile",
        description: "Generating demo data based on LinkedIn URL...",
      });

      const extractedData = await generateLinkedInDemoData(linkedinUrl, llmProvider, llmApiKey);
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

  return (
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
  );
};

export default LinkedInImportSection;
