
import { useState } from "react";
import { generateContent } from "@/services/llmService";

export const useAIExtraction = () => {
  const [isExtracting, setIsExtracting] = useState(false);

  // ADDED: accept model
  const extractDataWithAI = async (resumeText: string, llmProvider: string, llmApiKey: string, llmModel?: string) => {
    if (!llmProvider || !llmApiKey) {
      throw new Error("Please configure your AI provider first");
    }

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

    const response = await generateContent({
      provider: llmProvider,
      apiKey: llmApiKey,
      prompt,
      model: llmModel // ensure model is always passed if present
    });

    if (response.error) {
      throw new Error(response.error);
    }

    try {
      let cleanContent = response.content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\n?/, '').replace(/```$/, '');
      }
      
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error("Failed to parse AI response:", response.content);
      throw new Error("Failed to extract structured data from resume");
    }
  };

  // The demo data function can be left as is for now, if we only use real data upload
  return {
    isExtracting,
    setIsExtracting,
    extractDataWithAI,
  };
};
