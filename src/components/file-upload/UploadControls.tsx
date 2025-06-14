
import { Button } from "@/components/ui/button";
import { Upload, Loader2, X } from "lucide-react";

interface UploadControlsProps {
  onFileSelect: () => void;
  onCancel: () => void;
  isProcessing: boolean;
  isCancelling: boolean;
  canUseAI: boolean;
}

const UploadControls = ({ 
  onFileSelect, 
  onCancel, 
  isProcessing, 
  isCancelling, 
  canUseAI 
}: UploadControlsProps) => {
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={onFileSelect}
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
          onClick={onCancel}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          <X size={16} className="mr-2" />
          Cancel
        </Button>
      )}
    </div>
  );
};

export default UploadControls;
