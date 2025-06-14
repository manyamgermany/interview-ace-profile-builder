
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { generateContent } from "@/services/llmService";

interface AIEnhancedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  aiPromptTemplate: string;
  provider: string;
  apiKey: string;
  disabled?: boolean;
}

const AIEnhancedInput = ({
  value,
  onChange,
  placeholder,
  label,
  aiPromptTemplate,
  provider,
  apiKey,
  disabled = false
}: AIEnhancedInputProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!provider || !apiKey) return;
    
    setIsGenerating(true);
    try {
      const prompt = aiPromptTemplate.replace('{current_value}', value);
      const response = await generateContent({ provider, apiKey, prompt });
      
      if (response.error) {
        console.error('AI Generation Error:', response.error);
      } else {
        onChange(response.content);
      }
    } catch (error) {
      console.error('Failed to generate AI content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canUseAI = provider && apiKey && !disabled;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {canUseAI && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAIGenerate}
            disabled={isGenerating}
            className="flex items-center gap-1 text-xs"
          >
            {isGenerating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            {isGenerating ? 'Generating...' : 'AI Enhance'}
          </Button>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] resize-none"
        disabled={disabled}
      />
    </div>
  );
};

export default AIEnhancedInput;
