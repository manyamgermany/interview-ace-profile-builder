
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, AlertCircle } from "lucide-react";
import FileUploadSection from "./FileUploadSection";
import LinkedInImportSection from "./LinkedInImportSection";

interface SmartImportCardProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
}

const SmartImportCard = ({ onDataExtracted, llmProvider, llmApiKey }: SmartImportCardProps) => {
  const canUseAI = llmProvider && llmApiKey;

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles size={24} className="text-blue-600" />
          Smart Import
        </CardTitle>
        <CardDescription className="text-base">
          Upload your resume or import from LinkedIn to automatically fill your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!canUseAI && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-amber-600" />
              <span className="font-medium text-amber-900">AI Configuration Required</span>
            </div>
            <p className="text-sm text-amber-800">
              Please configure your AI provider in the settings above to use smart import features.
            </p>
          </div>
        )}

        <FileUploadSection
          onDataExtracted={onDataExtracted}
          llmProvider={llmProvider}
          llmApiKey={llmApiKey}
          canUseAI={canUseAI}
        />

        <LinkedInImportSection
          onDataExtracted={onDataExtracted}
          llmProvider={llmProvider}
          llmApiKey={llmApiKey}
          canUseAI={canUseAI}
        />

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2">✨ Smart Features</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• AI automatically extracts personal information, skills, and experience</li>
            <li>• Supports PDF and text resume formats</li>
            <li>• LinkedIn import generates realistic demo data</li>
            <li>• All data can be edited and refined after import</li>
            <li>• Your data is processed securely with your chosen AI provider</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartImportCard;
