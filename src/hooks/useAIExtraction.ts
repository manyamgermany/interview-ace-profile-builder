
import { useState } from "react";
import { generateContent } from "@/services/llmService";

export const useAIExtraction = () => {
  const [isExtracting, setIsExtracting] = useState(false);

  const extractDataWithAI = async (resumeText: string, llmProvider: string, llmApiKey: string, llmModel?: string) => {
    if (!llmProvider || !llmApiKey) {
      throw new Error("Please configure your AI provider first");
    }

    console.log("AI Extraction starting with:", { 
      provider: llmProvider, 
      hasApiKey: !!llmApiKey, 
      model: llmModel,
      textLength: resumeText.length 
    });

    const prompt = `Extract the following information from this resume text and return it as a JSON object:

Resume Text:
${resumeText}

Please extract and structure the data as follows:
{
  "name": "Full Name",
  "title": "Professional Title/Position",
  "email": "email@example.com",
  "phone": "+1 (555) 123-4567",
  "summary": "Professional summary or objective",
  "yearsExperience": "5+ years",
  "skills": [
    {"name": "JavaScript", "level": "Expert"},
    {"name": "React", "level": "Advanced"}
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Brief description",
      "technologies": ["React", "Node.js"]
    }
  ],
  "currentWork": {
    "company": "Company Name",
    "position": "Position Title",
    "duration": "Jan 2022 - Present",
    "achievements": ["Achievement 1", "Achievement 2"],
    "responsibilities": ["Responsibility 1", "Responsibility 2"]
  },
  "achievements": [
    {"title": "Award/Achievement", "description": "Description", "year": "2023"}
  ]
}

Return ONLY the JSON object without any markdown formatting or additional text.`;

    try {
      const response = await generateContent({
        provider: llmProvider,
        apiKey: llmApiKey,
        prompt,
        model: llmModel
      });

      console.log("AI Response:", { hasError: !!response.error, contentLength: response.content?.length });

      if (response.error) {
        console.error("AI API Error:", response.error);
        throw new Error(response.error);
      }

      let cleanContent = response.content.trim();
      console.log("Raw AI content:", cleanContent.substring(0, 200));
      
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\n?/, '').replace(/```$/, '');
      }
      
      const parsedData = JSON.parse(cleanContent);
      console.log("Successfully parsed AI response:", Object.keys(parsedData));
      
      return parsedData;
    } catch (error) {
      console.error("AI extraction failed:", error);
      if (error instanceof Error) {
        if (error.message.includes("API error") || error.message.includes("OpenAI")) {
          throw new Error("AI service error. Please check your API key and try again.");
        }
        throw error;
      }
      throw new Error("Failed to extract structured data from resume");
    }
  };

  return {
    isExtracting,
    setIsExtracting,
    extractDataWithAI,
  };
};
