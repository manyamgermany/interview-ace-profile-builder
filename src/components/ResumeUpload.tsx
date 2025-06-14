
import SmartImportCard from "./SmartImportCard";
import ErrorBoundary from "./ErrorBoundary";

interface ResumeUploadProps {
  onDataExtracted: (data: any) => void;
}

const ResumeUpload = ({ onDataExtracted }: ResumeUploadProps) => {
  return (
    <ErrorBoundary>
      <SmartImportCard onDataExtracted={onDataExtracted} />
    </ErrorBoundary>
  );
};

export default ResumeUpload;
