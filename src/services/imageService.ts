import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GenerateImageParams } from "@/types/dealer";

class ImageService {
  // Generate an image using AI
  async generateImage(params: GenerateImageParams): Promise<string> {
    try {
      console.log('Generating image with params:', {
        prompt: params.prompt,
        model: params.model,
        gender: params.gender,
        isSequential: params.isSequential,
        stageNumber: params.stageNumber,
        previousImageUrl: params.previousImageUrl?.substring(0, 30) + '...' // Log truncated URL for debugging
      });
      
      // Map the model ID to the correct service name
      let modelToUse;
      if (params.model === 'getimg-ai') {
        modelToUse = 'GetImg.ai';
      } else if (params.model === 'flux-1') {
        modelToUse = 'flux-1';
      } else if (params.model === 'dall-e-3') {
        modelToUse = 'DALL·E 3';
      } else {
        // Default to DALL·E 3 for other models
        modelToUse = 'DALL·E 3';
      }
      
      // Add instructions for single character consistency
      if (!params.prompt.includes("single person only")) {
        params.prompt += ", single person only, consistent facial features, no multiple versions";
      }
      
      // Log enhanced prompt if using advanced models
      if (modelToUse === 'GetImg.ai' || modelToUse === 'flux-1') {
        console.log('Enhanced prompt for hyper-realism:', params.prompt);
      }
      
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: {
          prompt: params.prompt,
          model: modelToUse,
          gender: params.gender,
          advancedModel: params.model === 'flux-1' ? 'flux-1' : undefined,
          previousImageUrl: params.previousImageUrl,
          isSequential: params.isSequential || false,
          stageNumber: params.stageNumber || 1
        },
      });

      if (error) {
        console.error('Error from Supabase function:', error);
        throw new Error(error.message || 'Failed to generate image');
      }

      console.log('Response from Supabase function:', data);

      if (!data?.imageUrl) {
        console.error('No image URL returned from function:', data);
        throw new Error(data?.error || 'No image URL returned');
      }

      // Validate the image URL (allowing data:image urls)
      if (!this.isValidUrl(data.imageUrl) && !data.imageUrl.startsWith('data:image')) {
        console.error('Invalid image URL returned:', data.imageUrl);
        throw new Error('Invalid image URL returned');
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(`Failed to generate image: ${error.message || 'Unknown error'}`);
      throw error;
    }
  }

  // Helper to validate URLs
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const imageService = new ImageService();
