
import SmartImportCard from "./SmartImportCard";

interface ResumeUploadProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
}

const ResumeUpload = ({ onDataExtracted, llmProvider, llmApiKey }: ResumeUploadProps) => {
  return (
    <SmartImportCard
      onDataExtracted={onDataExtracted}
      llmProvider={llmProvider}
      llmApiKey={llmApiKey}
    />
  );
};

export default ResumeUpload;
