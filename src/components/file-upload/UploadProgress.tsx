
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  isProcessing: boolean;
}

const UploadProgress = ({ progress, isProcessing }: UploadProgressProps) => {
  if (!isProcessing) return null;

  return (
    <div className="space-y-2">
      <Progress value={progress} className="w-full h-2" />
      <p className="text-sm text-gray-500">{progress}% complete</p>
    </div>
  );
};

export default UploadProgress;
