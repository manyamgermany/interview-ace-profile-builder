
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFileExtraction } from "@/hooks/useFileExtraction";
import { useAIExtraction } from "@/hooks/useAIExtraction";

interface FileUploadSectionProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
  canUseAI: boolean;
}

const FileUploadSection = ({ onDataExtracted, llmProvider, llmApiKey, canUseAI }: FileUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { isUploading, setIsUploading, uploadSuccess, setUploadSuccess, extractTextFromFile } = useFileExtraction();
  const { isExtracting, setIsExtracting, extractDataWithAI } = useAIExtraction();

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

      const extractedData = await extractDataWithAI(extractedText, llmProvider, llmApiKey);
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

  return (
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
  );
};

export default FileUploadSection;
