// Enhanced helper for photographic details
export function createPhotographicDetails(modelName: string): string {
  // Professional camera and lighting setup
  const cameraSettings = `
    shot on Canon EOS 5D Mark IV, 85mm f/1.4 portrait lens,
    natural studio lighting with soft diffusion,
    shallow depth of field with subtle bokeh effect,
    professional color grading, 8k resolution
  `;

  // Realistic skin textures and details
  const skinDetails = `
    natural skin texture with visible pores and subtle imperfections,
    subsurface light scattering on skin,
    fine facial details including laugh lines and natural asymmetry,
    realistic skin tone variations and subtle blemishes
  `;

  // Detailed eye realism
  const eyeDetails = `
    hyper-detailed iris texture with depth and dimensionality,
    natural eye moisture and reflections,
    proper catch lights in eyes,
    subtle blood vessels in sclera
  `;

  // Natural hair details
  const hairDetails = `
    individual hair strands with natural flyaways,
    realistic hair texture and volume,
    subtle highlights and shadows in hair,
    natural hair movement and flow
  `;

  // Advanced model-specific prompts
  if (modelName === 'GetImg.ai' || modelName.includes('flux')) {
    // Advanced hyperrealistic details for flux-1 and other advanced models
    const advancedDetails = `
      cinematic lighting with accurate shadow transitions,
      subtle micro-expressions in facial features,
      detailed fabric textures and material properties,
      photography-accurate depth of field and focus,
      single person only, no duplicates, no clones
    `;
    
    return `${cameraSettings}, ${skinDetails}, ${eyeDetails}, ${hairDetails}, ${advancedDetails}, 
            maintain exact same face structure, facial features, height, body proportions for character continuity,
            single character portrait, no multiple versions of the same person`;
  } else {
    // Simplified version for DALL-E (which sometimes performs better with less technical prompts)
    return `professional portrait photography, natural skin details, lifelike eyes, realistic hair texture, 
            maintain consistent facial features and identity, single character portrait, no multiple versions of the same person,
            exact same face across all images`;
  }
}

// Enhanced prompt generation with more realistic details and character consistency
export function createEnhancedPrompt(prompt: string, gender: string, modelName: string): string {
  const photographicDetails = createPhotographicDetails(modelName);
  
  // Check if this is part of a dealer outfit progression
  const isOutfitProgression = prompt.includes("same person as previous") || 
                              prompt.includes("consistent facial features") ||
                              prompt.includes("casino dealer");
  
  let basePrompt;
  
  if (isOutfitProgression) {
    // This is part of an outfit progression, so maintain character consistency
    basePrompt = `ultra-realistic single photograph of the same ${gender} casino dealer as in previous image, 
                  maintaining 100% identical facial features, face shape, hair style, and body proportions,
                  ${prompt}, just one person in frame, no duplicates or multiple versions`;
  } else {
    // Standard prompt for new character generation
    basePrompt = gender === 'female'
      ? `ultra-realistic photograph of a single beautiful female casino dealer in her early 30s,
         natural beauty, confident pose, slight genuine smile,
         professional appearance, well-groomed, one person only,
         ${prompt}`
      : `ultra-realistic photograph of a single handsome male casino dealer in his early 30s,
         natural features, confident pose, slight genuine smile,
         professional appearance, clean-shaven, well-groomed, one person only,
         ${prompt}`;
  }

  return `${basePrompt}, ${photographicDetails}, solo portrait, single character only, no duplicate people`;
}

// Enhanced negative prompt to better avoid artificial looks
export function createNegativePrompt(gender: string): string {
  return `
    artificial looking, digital art, illustration, painting, drawing, sketch, 
    anime style, cartoon style, pixar style, disney style,
    3d render, CGI, computer generated imagery,
    plastic skin, smooth airbrushed skin, perfect symmetry,
    unrealistic proportions, uncanny valley,
    oversaturated colors, HDR look,
    fake bokeh, artificial blur,
    ${gender === 'female' ? 'masculine features,' : 'feminine features,'}
    deformed features, distorted anatomy, extra limbs,
    inconsistent lighting, inconsistent features between images,
    multiple people, duplicate faces, clones, multiple versions of same person
  `.trim();
}
