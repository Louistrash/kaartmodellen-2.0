import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, createSuccessResponse, createErrorResponse } from "./utils/responses.ts";
import { validateRequest, validateImageUrl } from "./utils/validation.ts";
import { generateWithGetImg } from "./services/getimg.ts";
import { generateWithDallE } from "./services/dalle.ts";

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate the request body
    const requestData = await req.json();
    const { prompt, model, gender, advancedModel } = validateRequest(requestData);
    
    console.log(`Generating image with prompt: "${prompt}" using model: ${model}, gender: ${gender}, advanced model: ${advancedModel || 'not specified'}`);
    
    // Generate image based on the selected model
    let imageUrl;
    if (model === 'GetImg.ai') {
      imageUrl = await generateWithGetImg(prompt, gender);
    } else {
      // Default to DALL-E 3
      imageUrl = await generateWithDallE(prompt, gender);
    }
    
    // Validate the generated URL
    validateImageUrl(imageUrl);
    
    // Return the image URL to the client
    return createSuccessResponse({ imageUrl });
    
  } catch (error) {
    return createErrorResponse(`Failed to generate image: ${error.message}`, error.stack);
  }
});
