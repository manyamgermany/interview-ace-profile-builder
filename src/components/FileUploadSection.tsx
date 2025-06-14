
import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFileExtraction } from "@/hooks/useFileExtraction";
import { useAIExtraction } from "@/hooks/useAIExtraction";
import { useFileUploadProgress } from "@/hooks/useFileUploadProgress";
import { validateUploadFile } from "@/utils/fileValidation";
import ErrorBoundary from "./ErrorBoundary";
import UploadProgress from "./file-upload/UploadProgress";
import UploadStatus from "./file-upload/UploadStatus";
import UploadControls from "./file-upload/UploadControls";

interface FileUploadSectionProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
  llmModel?: string;
  canUseAI: boolean;
}

const FileUploadSection = ({ onDataExtracted, llmProvider, llmApiKey, llmModel, canUseAI }: FileUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();
  const { isUploading, setIsUploading, uploadSuccess, setUploadSuccess, extractTextFromFile } = useFileExtraction();
  const { isExtracting, setIsExtracting, extractDataWithAI } = useAIExtraction();
  const { progress, currentStep, updateProgress, resetProgress } = useFileUploadProgress();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateUploadFile(file);
    if (!validation.isValid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setIsExtracting(true);
    setUploadSuccess(false);
    setIsCancelling(false);
    resetProgress();

    try {
      updateProgress(10, "Starting file processing...");
      
      toast({
        title: "Processing Resume",
        description: "Extracting text from your resume...",
      });

      updateProgress(25, "Reading file contents...");
      const extractedText = await extractTextFromFile(file);
      
      if (extractedText.length < 50) {
        throw new Error("Could not extract enough text from the file. Please ensure it's a text-based resume.");
      }

      updateProgress(50, "Text extraction completed");
      console.log("Extracted text length:", extractedText.length);
      console.log("First 200 characters:", extractedText.substring(0, 200));

      updateProgress(60, "Connecting to AI service...");
      
      toast({
        title: "Analyzing Content",
        description: "AI is extracting your professional information...",
      });

      updateProgress(75, "AI analyzing resume content...");
      const extractedData = await extractDataWithAI(extractedText, llmProvider, llmApiKey, llmModel);
      
      updateProgress(90, "Processing extracted data...");
      
      // Validate extracted data
      if (!extractedData || typeof extractedData !== 'object') {
        throw new Error("AI extraction returned invalid data format");
      }

      updateProgress(95, "Updating your profile...");
      onDataExtracted(extractedData);
      
      updateProgress(100, "Complete!");
      setUploadSuccess(true);
      
      toast({
        title: "Success!",
        description: "Your resume has been processed and profile updated.",
      });
      
    } catch (error) {
      console.error("Resume extraction error:", error);
      let errorMessage = "Failed to process resume";
      
      if (error instanceof Error) {
        if (error.message.includes("Invalid API key")) {
          errorMessage = "AI service error. Please check your API key and try again.";
        } else if (error.message.includes("Rate limit")) {
          errorMessage = "Rate limit exceeded. Please try again in a few minutes.";
        } else if (error.message.includes("Please configure")) {
          errorMessage = "Please configure your AI provider first";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      resetProgress();
    } finally {
      setIsUploading(false);
      setIsExtracting(false);
      setIsCancelling(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancel = () => {
    setIsCancelling(true);
    resetProgress();
    toast({
      title: "Processing Cancelled",
      description: "File upload has been cancelled.",
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const isProcessing = isUploading || isExtracting;

  return (
    <ErrorBoundary>
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
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            disabled={!canUseAI || isProcessing}
          />
          
          <div className="space-y-4">
            <UploadStatus 
              isProcessing={isProcessing}
              uploadSuccess={uploadSuccess}
              currentStep={currentStep}
            />
            
            <UploadProgress 
              progress={progress}
              isProcessing={isProcessing}
            />
            
            <UploadControls
              onFileSelect={handleFileSelect}
              onCancel={handleCancel}
              isProcessing={isProcessing}
              isCancelling={isCancelling}
              canUseAI={canUseAI}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FileUploadSection;
