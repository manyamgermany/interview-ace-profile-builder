
import { useState } from "react";
import { generateContent } from "@/services/llmService";

export const useAIExtraction = () => {
  const [isExtracting, setIsExtracting] = useState(false);

  const chunkText = (text: string, maxChunkSize: number = 3000): string[] => {
    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > maxChunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? '. ' : '') + sentence;
      }
    }
    
    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  };

  const summarizeText = async (text: string, llmProvider: string, llmApiKey: string, llmModel?: string): Promise<string> => {
    console.log("Summarizing large text, length:", text.length);
    
    // If text is small enough, return as-is
    if (text.length < 4000) {
      return text;
    }

    const chunks = chunkText(text, 3000);
    console.log("Split into chunks:", chunks.length);
    
    const summaries: string[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Processing chunk ${i + 1}/${chunks.length}, length: ${chunk.length}`);
      
      const summaryPrompt = `Summarize this resume section, preserving all important professional information including names, positions, companies, skills, achievements, and dates. Keep technical details and quantifiable results:

${chunk}

Provide a concise summary that retains all key professional details:`;

      try {
        const response = await generateContent({
          provider: llmProvider,
          apiKey: llmApiKey,
          prompt: summaryPrompt,
          model: llmModel
        });

        if (response.error) {
          throw new Error(response.error);
        }

        summaries.push(response.content);
      } catch (error) {
        console.error(`Failed to summarize chunk ${i + 1}:`, error);
        // If summarization fails, use the original chunk but truncate it
        summaries.push(chunk.substring(0, 2000));
      }
    }
    
    const combinedSummary = summaries.join('\n\n');
    console.log("Combined summary length:", combinedSummary.length);
    
    return combinedSummary;
  };

  const extractDataWithAI = async (resumeText: string, llmProvider: string, llmApiKey: string, llmModel?: string) => {
    if (!llmProvider || !llmApiKey) {
      throw new Error("Please configure your AI provider first");
    }

    console.log("AI Extraction starting with:", { 
      provider: llmProvider, 
      hasApiKey: !!llmApiKey, 
      model: llmModel,
      originalTextLength: resumeText.length 
    });

    try {
      // First, summarize the text if it's too large
      const processedText = await summarizeText(resumeText, llmProvider, llmApiKey, llmModel);
      
      console.log("Processing summarized text, length:", processedText.length);

      const prompt = `Extract the following information from this resume text and return it as a JSON object:

Resume Text:
${processedText}

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
