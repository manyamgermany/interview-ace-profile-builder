
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, AlertCircle } from "lucide-react";
import FileUploadSection from "./FileUploadSection";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SmartImportCardProps {
  onDataExtracted: (data: any) => void;
  llmProvider: string;
  llmApiKey: string;
}

const SmartImportCard = ({ onDataExtracted, llmProvider, llmApiKey }: SmartImportCardProps) => {
  const [currentProvider, setCurrentProvider] = useState(llmProvider || 'openai');
  const [currentApiKey, setCurrentApiKey] = useState(llmApiKey || '');
  const [savedProvider, setSavedProvider] = useState(llmProvider);
  const [savedApiKey, setSavedApiKey] = useState(llmApiKey);

  useEffect(() => {
    setSavedProvider(llmProvider);
    setSavedApiKey(llmApiKey);
  }, [llmProvider, llmApiKey]);

  const canUseAI = savedProvider && savedApiKey;
  const hasUnsavedChanges = currentProvider !== savedProvider || currentApiKey !== savedApiKey;

  const handleSaveConfig = () => {
    localStorage.setItem("llmProvider", currentProvider);
    localStorage.setItem("llmApiKey", currentApiKey);
    setSavedProvider(currentProvider);
    setSavedApiKey(currentApiKey);
    window.location.reload();
  };

  return (
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
        {!canUseAI && (
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={20} className="text-amber-600" />
              <span className="font-semibold text-xl text-amber-900">AI Configuration Required</span>
            </div>
            <p className="text-sm text-amber-800 mb-4">
              To use the Smart Import features, please provide an API key. Your key will be stored in your browser's local storage and will not be shared.
            </p>
          </div>
        )}

        {(!canUseAI || hasUnsavedChanges) && (
          <div className="space-y-4 p-4 border border-gray-200 rounded-xl bg-white">
            <div className="space-y-2">
              <Label htmlFor="llmProvider" className="font-medium text-gray-900">AI Provider</Label>
              <Select value={currentProvider} onValueChange={setCurrentProvider}>
                <SelectTrigger id="llmProvider" className="bg-white">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="groq">Groq</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="llmApiKey" className="font-medium text-gray-900">API Key</Label>
              <Input
                id="llmApiKey"
                type="password"
                placeholder="Enter your API key"
                value={currentApiKey}
                onChange={(e) => setCurrentApiKey(e.target.value)}
                className="bg-white"
              />
            </div>
            <Button 
              onClick={handleSaveConfig} 
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={!currentProvider || !currentApiKey}
            >
              Save and Enable AI Features
            </Button>
          </div>
        )}

        <FileUploadSection
          onDataExtracted={onDataExtracted}
          llmProvider={savedProvider}
          llmApiKey={savedApiKey}
          canUseAI={!!canUseAI}
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
  );
};

export default SmartImportCard;
