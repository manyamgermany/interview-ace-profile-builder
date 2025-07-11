
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Eye, EyeOff, Settings, Save } from "lucide-react";
import { useLLMConfig } from "@/contexts/LLMContext";
import ErrorBoundary from "./ErrorBoundary";

const providers = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4.1, GPT-4o models for content generation"
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Claude Opus, Sonnet models for professional writing"
  },
  {
    id: "google",
    name: "Google Gemini",
    description: "Gemini Pro models for creative content"
  }
];

const LLMProviderSettings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const { 
    config, 
    updateProvider, 
    updateApiKey, 
    updateModel, 
    saveConfig, 
    isConfigValid,
    availableModels 
  } = useLLMConfig();

  const currentProvider = providers.find(p => p.id === config.provider);

  return (
    <ErrorBoundary>
      <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Brain size={24} className="text-purple-600" />
            AI Assistant Settings
          </CardTitle>
          <CardDescription className="text-base">
            Configure your AI provider to get personalized content suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="provider-select" className="text-sm font-medium">
              Choose AI Provider
            </Label>
            <Select value={config.provider} onValueChange={updateProvider}>
              <SelectTrigger id="provider-select" className="w-full">
                <SelectValue placeholder="Select an AI provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{provider.name}</span>
                      <span className="text-xs text-gray-500">{provider.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {config.provider && (
            <>
              <div className="space-y-3">
                <Label htmlFor="api-key" className="text-sm font-medium">
                  API Key
                </Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={config.apiKey}
                    onChange={(e) => updateApiKey(e.target.value)}
                    placeholder={`Enter your ${currentProvider?.name} API key`}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Your API key is stored locally and never sent to our servers
                </p>
              </div>

              {availableModels.length > 0 && (
                <div className="space-y-3">
                  <Label htmlFor="model-select" className="text-sm font-medium">
                    Select Model
                  </Label>
                  <Select value={config.model} onValueChange={updateModel}>
                    <SelectTrigger id="model-select" className="w-full">
                      <SelectValue placeholder="Choose a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button 
                onClick={saveConfig}
                disabled={!isConfigValid}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Save size={16} className="mr-2" />
                Save Settings
              </Button>
            </>
          )}

          {isConfigValid && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Settings size={16} className="text-green-600" />
                <span className="font-medium text-green-900">AI Features Enabled</span>
              </div>
              <p className="text-sm text-green-800">
                You can now use AI to generate professional summaries, skill descriptions, and project highlights.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default LLMProviderSettings;
