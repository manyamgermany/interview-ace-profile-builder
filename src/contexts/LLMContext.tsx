
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LLMConfig {
  provider: string;
  apiKey: string;
  model: string;
}

interface LLMContextType {
  config: LLMConfig;
  updateProvider: (provider: string) => void;
  updateApiKey: (apiKey: string) => void;
  updateModel: (model: string) => void;
  saveConfig: () => void;
  isConfigValid: boolean;
  availableModels: string[];
}

const LLMContext = createContext<LLMContextType | undefined>(undefined);

const providers = {
  openai: {
    name: "OpenAI",
    models: ["gpt-4.1-2025-04-14", "gpt-4o", "gpt-4.1-mini-2025-04-14"]
  },
  anthropic: {
    name: "Anthropic Claude", 
    models: ["claude-opus-4-20250514", "claude-sonnet-4-20250514", "claude-3-5-haiku-20241022"]
  },
  google: {
    name: "Google Gemini",
    models: ["gemini-pro", "gemini-pro-vision"]
  }
};

export const LLMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LLMConfig>({
    provider: '',
    apiKey: '',
    model: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load saved configuration
    try {
      const savedProvider = localStorage.getItem("llmProvider") || "";
      const savedApiKey = localStorage.getItem("llmApiKey") || "";
      const savedModel = localStorage.getItem("llmModel") || "";
      
      setConfig({
        provider: savedProvider,
        apiKey: savedApiKey,
        model: savedModel
      });
    } catch (error) {
      console.error("Failed to load LLM configuration:", error);
    }
  }, []);

  const updateProvider = (provider: string) => {
    setConfig(prev => {
      const newConfig = { ...prev, provider };
      // Reset model if it's not valid for the new provider
      const availableModels = providers[provider as keyof typeof providers]?.models || [];
      if (!availableModels.includes(prev.model)) {
        newConfig.model = availableModels[0] || '';
      }
      return newConfig;
    });
  };

  const updateApiKey = (apiKey: string) => {
    setConfig(prev => ({ ...prev, apiKey }));
  };

  const updateModel = (model: string) => {
    setConfig(prev => ({ ...prev, model }));
  };

  const saveConfig = () => {
    try {
      localStorage.setItem("llmProvider", config.provider);
      localStorage.setItem("llmApiKey", config.apiKey);
      localStorage.setItem("llmModel", config.model);
      
      toast({
        title: "Settings Saved",
        description: "Your AI provider settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to save LLM configuration:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isConfigValid = Boolean(config.provider && config.apiKey);
  const availableModels = providers[config.provider as keyof typeof providers]?.models || [];

  return (
    <LLMContext.Provider value={{
      config,
      updateProvider,
      updateApiKey,
      updateModel,
      saveConfig,
      isConfigValid,
      availableModels
    }}>
      {children}
    </LLMContext.Provider>
  );
};

export const useLLMConfig = () => {
  const context = useContext(LLMContext);
  if (context === undefined) {
    throw new Error('useLLMConfig must be used within a LLMProvider');
  }
  return context;
};
