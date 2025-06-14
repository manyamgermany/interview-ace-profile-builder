
import { useState } from "react";
import { generateContent } from "@/services/llmService";

export const useAIExtraction = () => {
  const [isExtracting, setIsExtracting] = useState(false);

  const extractDataWithAI = async (resumeText: string, llmProvider: string, llmApiKey: string) => {
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
      prompt
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

  const generateLinkedInDemoData = async (linkedinUrl: string, llmProvider: string, llmApiKey: string) => {
    const prompt = `Based on this LinkedIn profile URL: ${linkedinUrl}, generate realistic professional data for demonstration purposes.

Create a JSON object with:
{
  "name": "Professional Name",
  "title": "Current Job Title",
  "email": "professional.email@company.com",
  "phone": "+1 (555) 123-4567",
  "summary": "Compelling professional summary highlighting key achievements and expertise",
  "yearsExperience": "X+ years",
  "skills": [
    {"name": "Skill Name", "level": "Expert/Advanced/Intermediate"}
  ],
  "currentWork": {
    "company": "Current Company",
    "position": "Current Position",
    "duration": "Start Date - Present",
    "achievements": ["Notable achievement with metrics"],
    "responsibilities": ["Key responsibility"]
  }
}

Make it realistic and professional. Return ONLY the JSON object.`;

    const response = await generateContent({
      provider: llmProvider,
      apiKey: llmApiKey,
      prompt
    });

    if (response.error) {
      throw new Error(response.error);
    }

    let cleanContent = response.content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
    }

    return JSON.parse(cleanContent);
  };

  return {
    isExtracting,
    setIsExtracting,
    extractDataWithAI,
    generateLinkedInDemoData
  };
};
