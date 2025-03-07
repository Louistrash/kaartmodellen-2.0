// Generate image using GetImg.ai API
import { createEnhancedPrompt, createNegativePrompt } from "../utils/prompts.ts";
import { createErrorResponse } from "../utils/responses.ts";

// Updated model configurations for GetImg.ai with advanced models
interface ModelConfig {
  model: string;
  cfg_scale: number;
  steps: number;
  scheduler?: string;
  cfg_rescale?: number;
  clip_skip?: number;
}

const MODEL_CONFIGS: Record<string, ModelConfig> = {
  // FLUX.1 - State-of-the-art hyperrealistic model
  "flux-1": {
    model: "flux-1",
    cfg_scale: 7.0,
    steps: 40,
    scheduler: "euler_a"
  },
  // FLUX.1 Ultra variant - Highest quality but slower
  "flux-1-ultra": {
    model: "flux-1-ultra",
    cfg_scale: 7.5,
    steps: 50,
    scheduler: "dpmsolver++"
  },
  // FLUX.1 Schnell variant - Faster generation
  "flux-1-schnell": {
    model: "flux-1-schnell",
    cfg_scale: 7.0,
    steps: 35,
    scheduler: "euler_a"
  },
  // Stable Diffusion XL - High quality model
  "sdxl": {
    model: "sdxl",
    cfg_scale: 7.0,
    steps: 40,
    scheduler: "euler_a"
  },
  // Photoreal v2.0 - Photorealistic model (kept as backup)
  "photoreal-v2.0": {
    model: "photoreal-v2.0",
    cfg_scale: 7.5,
    steps: 50,
    scheduler: "dpmsolver++",
    cfg_rescale: 0.5
  },
  // Realistic vision - Backup model
  "realistic-vision-v5-1": {
    model: "realistic-vision-v5-1",
    cfg_scale: 8.0,
    steps: 45
  }
};

// Main function to generate images with GetImg.ai
export async function generateWithGetImg(prompt: string, gender: string): Promise<string> {
  console.log('Using GetImg.ai API for image generation with advanced hyperrealistic models');
  
  // Validate API key
  const apiKey = validateApiKey();
  
  // Create enhanced prompts
  const enhancedPrompt = createEnhancedPrompt(prompt, gender, 'GetImg.ai');
  const negativePrompt = createNegativePrompt(gender);
  
  logPromptDetails(enhancedPrompt, negativePrompt);
  
  // Try models in sequence, starting with the most advanced
  const modelPriority = ['flux-1-ultra', 'flux-1', 'sdxl', 'photoreal-v2.0', 'realistic-vision-v5-1'];
  
  // Try each model in order until one succeeds
  for (let i = 0; i < modelPriority.length; i++) {
    const modelKey = modelPriority[i];
    try {
      console.log(`Attempting generation with ${modelKey} model...`);
      return await generateWithModel(apiKey, enhancedPrompt, negativePrompt, MODEL_CONFIGS[modelKey]);
    } catch (error) {
      console.error(`Error with ${modelKey} model: ${error.message}`);
      if (i === modelPriority.length - 1) {
        // If this was the last model, propagate the error
        throw error;
      }
      console.log(`Falling back to ${modelPriority[i+1]}...`);
      // Otherwise continue to the next model
    }
  }
  
  // This should never be reached due to the error handling above
  throw new Error('All models failed to generate image');
}

// Validate and retrieve API key
function validateApiKey(): string {
  const apiKey = Deno.env.get('GETIMG_API_KEY');
  
  if (!apiKey) {
    console.error('GETIMG_API_KEY not found in environment variables');
    throw new Error('GetImg.ai API key not configured');
  }
  
  return apiKey;
}

// Log prompt details for debugging
function logPromptDetails(enhancedPrompt: string, negativePrompt: string): void {
  console.log('Enhanced prompt for photorealism:', enhancedPrompt);
  console.log('Negative prompt for avoiding artificial look:', negativePrompt);
}

// Generate image with a specific model configuration
async function generateWithModel(
  apiKey: string, 
  enhancedPrompt: string, 
  negativePrompt: string, 
  modelConfig: ModelConfig
): Promise<string> {
  const requestBody = createRequestBody(enhancedPrompt, negativePrompt, modelConfig);
  const response = await makeApiRequest(apiKey, requestBody);
  return processApiResponse(response, modelConfig.model);
}

// Create request body for the API call
function createRequestBody(
  enhancedPrompt: string, 
  negativePrompt: string, 
  modelConfig: ModelConfig
): Record<string, any> {
  return {
    prompt: enhancedPrompt,
    negative_prompt: negativePrompt,
    model: modelConfig.model,
    width: 1024,
    height: 1536, // Higher resolution for better details
    steps: modelConfig.steps,
    guidance_scale: modelConfig.cfg_scale,
    seed: Math.floor(Math.random() * 1000000), // Random seed for variety
    output_format: "png",
    samples: 1,
    scheduler: modelConfig.scheduler,
    cfg_rescale: modelConfig.cfg_rescale,
    clip_skip: modelConfig.clip_skip
  };
}

// Make the actual API request
async function makeApiRequest(
  apiKey: string, 
  requestBody: Record<string, any>
): Promise<Response> {
  const response = await fetch('https://api.getimg.ai/v1/generation/text-to-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    await handleApiError(response);
  }
  
  return response;
}

// Handle API error responses
async function handleApiError(response: Response): Promise<never> {
  const errorText = await response.text();
  console.error(`GetImg.ai API error: Status ${response.status}`);
  console.error('Error response:', errorText);
  throw new Error(`GetImg.ai API error: ${response.status} ${errorText}`);
}

// Process the API response and extract the image URL
async function processApiResponse(response: Response, modelName: string): Promise<string> {
  const data = await response.json();
  console.log(`${modelName} API response received successfully`);
  
  if (data.output && data.output.length > 0) {
    const imageUrl = data.output[0];
    console.log(`${modelName} generated image URL:`, imageUrl);
    return imageUrl;
  } else if (data.image) {
    const imageUrl = `data:image/png;base64,${data.image}`;
    console.log(`${modelName} generated image as base64`);
    return imageUrl;
  } else {
    console.error(`Unexpected ${modelName} response format:`, data);
    throw new Error(`Unexpected ${modelName} response format`);
  }
}
