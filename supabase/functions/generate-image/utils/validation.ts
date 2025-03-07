// Types for request validation
export interface GenerateImageRequest {
  prompt: string;
  model: string;
  gender: string;
  advancedModel?: string;
  previousImageUrl?: string; // Added to reference previous image for consistency
  isSequential?: boolean; // Flag to indicate this is part of a sequence
  stageNumber?: number; // Which stage in the sequence
}

// Validate request body
export function validateRequest(body: any): GenerateImageRequest {
  if (!body.prompt) {
    throw new Error("Prompt is required");
  }
  return {
    prompt: body.prompt,
    model: body.model || 'DALL·E 3',
    gender: body.gender || 'female',
    advancedModel: body.advancedModel,
    previousImageUrl: body.previousImageUrl,
    isSequential: body.isSequential || false,
    stageNumber: body.stageNumber || 1
  };
}

// Validate the generated URL
export function validateImageUrl(imageUrl: string): boolean {
  try {
    // For base64 data URLs, we don't need to validate with URL constructor
    if (!imageUrl.startsWith('data:image')) {
      new URL(imageUrl);
    }
    return true;
  } catch (error) {
    console.error('Invalid image URL generated:', imageUrl);
    throw new Error('Generated image URL is invalid');
  }
}
