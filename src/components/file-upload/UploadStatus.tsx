
import { Upload, Loader2, CheckCircle } from "lucide-react";

interface UploadStatusProps {
  isProcessing: boolean;
  uploadSuccess: boolean;
  currentStep: string;
}

const UploadStatus = ({ isProcessing, uploadSuccess, currentStep }: UploadStatusProps) => {
  return (
    <div>
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
          {isProcessing ? "Processing..." : 
           uploadSuccess ? "Upload successful!" : 
           "Drop your resume here"}
        </h3>
        <p className="text-gray-600 mt-1">
          {isProcessing 
            ? currentStep || "Processing your resume..."
            : uploadSuccess
            ? "Your profile has been updated with the extracted information"
            : "Supports PDF, Word (.doc/.docx), and text files • Max 10MB • AI will extract and fill your profile automatically"
          }
        </p>
      </div>
    </div>
  );
};

export default UploadStatus;
