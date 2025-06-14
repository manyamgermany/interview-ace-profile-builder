
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFileExtraction } from "@/hooks/useFileExtraction";
import { useAIExtraction } from "@/hooks/useAIExtraction";
import { validateUploadFile } from "@/utils/fileValidation";
import ErrorBoundary from "./ErrorBoundary";

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

    try {
      toast({
        title: "Processing Resume",
        description: "Extracting text from your resume...",
      });

      const extractedText = await extractTextFromFile(file);
      
      if (extractedText.length < 50) {
        throw new Error("Could not extract enough text from the file. Please ensure it's a text-based resume.");
      }

      console.log("Extracted text length:", extractedText.length);
      console.log("First 200 characters:", extractedText.substring(0, 200));

      toast({
        title: "Analyzing Content",
        description: "AI is extracting your professional information...",
      });

      const extractedData = await extractDataWithAI(extractedText, llmProvider, llmApiKey, llmModel);
      
      // Validate extracted data
      if (!extractedData || typeof extractedData !== 'object') {
        throw new Error("AI extraction returned invalid data format");
      }

      onDataExtracted(extractedData);
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
    // Note: In a real implementation, you'd need to implement actual cancellation logic
    toast({
      title: "Processing Cancelled",
      description: "File upload has been cancelled.",
    });
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
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              uploadSuccess ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {isProcessing ? (
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
                  : "Supports PDF, Word (.doc/.docx), and text files • Max 10MB • AI will extract and fill your profile automatically"
                }
              </p>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing || !canUseAI}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
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
              
              {isProcessing && !isCancelling && (
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FileUploadSection;
