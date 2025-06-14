
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, AlertCircle } from "lucide-react";
import FileUploadSection from "./FileUploadSection";
import { useLLMConfig } from "@/contexts/LLMContext";
import ErrorBoundary from "./ErrorBoundary";

interface SmartImportCardProps {
  onDataExtracted: (data: any) => void;
}

const SmartImportCard = ({ onDataExtracted }: SmartImportCardProps) => {
  const { config, isConfigValid } = useLLMConfig();

  return (
    <ErrorBoundary>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles size={24} className="text-blue-600" />
            Smart Import
          </CardTitle>
          <CardDescription className="text-base">
            Upload your resume to automatically fill your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isConfigValid && (
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={20} className="text-amber-600" />
                <span className="font-semibold text-xl text-amber-900">AI Configuration Required</span>
              </div>
              <p className="text-sm text-amber-800 mb-4">
                To use the Smart Import features, please configure your AI provider using the "AI Assistant Settings" section above.
              </p>
            </div>
          )}

          <FileUploadSection
            onDataExtracted={onDataExtracted}
            llmProvider={config.provider}
            llmApiKey={config.apiKey}
            llmModel={config.model}
            canUseAI={isConfigValid}
          />

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">✨ Smart Features</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• AI automatically extracts personal information, skills, and experience</li>
              <li>• Supports PDF and text resume formats</li>
              <li>• All data can be edited and refined after import</li>
              <li>• Your data is processed securely with your chosen AI provider</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default SmartImportCard;
