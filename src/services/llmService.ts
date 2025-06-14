
interface LLMResponse {
  content: string;
  error?: string;
}

interface LLMRequest {
  provider: string;
  apiKey: string;
  prompt: string;
  model?: string;
}

export const generateContent = async ({ 
  provider, 
  apiKey, 
  prompt, 
  model 
}: LLMRequest): Promise<LLMResponse> => {
  try {
    switch (provider) {
      case 'openai':
        return await callOpenAI(apiKey, prompt, model || 'gpt-4.1-2025-04-14');
      case 'anthropic':
        return await callAnthropic(apiKey, prompt, model || 'claude-sonnet-4-20250514');
      case 'google':
        return await callGoogleGemini(apiKey, prompt, model || 'gemini-pro');
      default:
        return { content: '', error: 'Unsupported provider' };
    }
  } catch (error) {
    console.error('LLM API Error:', error);
    return { 
      content: '', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

const callOpenAI = async (apiKey: string, prompt: string, model: string): Promise<LLMResponse> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional career advisor helping create impressive resumes and presentations. Be concise, professional, and impactful.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return { content: data.choices[0]?.message?.content || '' };
};

const callAnthropic = async (apiKey: string, prompt: string, model: string): Promise<LLMResponse> => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are a professional career advisor helping create impressive resumes and presentations. Be concise, professional, and impactful.\n\n${prompt}`
        }
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return { content: data.content[0]?.text || '' };
};

const callGoogleGemini = async (apiKey: string, prompt: string, model: string): Promise<LLMResponse> => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are a professional career advisor helping create impressive resumes and presentations. Be concise, professional, and impactful.\n\n${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return { content: data.candidates[0]?.content?.parts[0]?.text || '' };
};

export const generateSummary = (personalInfo: any, provider: string, apiKey: string) => {
  const prompt = `Create a compelling professional summary for someone with the following information:
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Years of Experience: ${personalInfo.yearsExperience}
Current Summary: ${personalInfo.summary}

Make it impactful, concise (2-3 sentences), and tailored for job interviews. Focus on achievements and value proposition.`;

  return generateContent({ provider, apiKey, prompt });
};

export const generateSkillDescription = (skill: string, level: string, provider: string, apiKey: string) => {
  const prompt = `Create a brief, impressive description for this skill:
Skill: ${skill}
Proficiency Level: ${level}

Write 1-2 sentences that highlight expertise and practical application. Make it sound professional and impactful.`;

  return generateContent({ provider, apiKey, prompt });
};

export const generateProjectHighlight = (project: any, provider: string, apiKey: string) => {
  const prompt = `Enhance this project description to make it more impressive for interviews:
Title: ${project.title}
Description: ${project.description}
Technologies: ${project.technologies?.join(', ')}

Rewrite the description to be more impactful, highlighting achievements, results, and technical skills. Keep it concise but impressive.`;

  return generateContent({ provider, apiKey, prompt });
};
