// Generate image using DALL-E 3 API
import { createEnhancedPrompt } from "../utils/prompts.ts";

export async function generateWithDallE(prompt: string, gender: string): Promise<string> {
  console.log('Using DALL-E 3 API for image generation');
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY not found in environment variables');
    throw new Error('OpenAI API key not configured');
  }
  
  console.log('Making request to OpenAI API...');
  
  // Create enhanced prompt for DALL-E
  const enhancedPrompt = createEnhancedPrompt(prompt, gender, 'DALL·E 3');
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: enhancedPrompt + ", ensure photorealistic quality, absolutely no artistic or CGI styling",
      n: 1,
      size: "1024x1024",
      quality: "hd", // Using HD quality for better details
      style: "natural", // Emphasizing natural look
      response_format: "url"
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`OpenAI API error: Status ${response.status}`);
    console.error('Error response:', errorText);
    throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
  }
  
  const data = await response.json();
  console.log('OpenAI API response received successfully');
  
  if (!data.data || !data.data[0] || !data.data[0].url) {
    console.error('Invalid response format from OpenAI:', data);
    throw new Error('Invalid response format from OpenAI');
  }
  
  const imageUrl = data.data[0].url;
  console.log('DALL-E 3 generated image URL:', imageUrl);
  return imageUrl;
}
