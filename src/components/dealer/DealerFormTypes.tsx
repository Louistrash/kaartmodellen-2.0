export const AI_MODELS = [
  { id: "flux-1", name: "FLUX.1 (Ultra Photorealistic)" },
  { id: "getimg-ai", name: "GetImg.ai (Hyper-realistic)" },
  { id: "dall-e-3", name: "DALL·E 3" },
  { id: "stable-diffusion-xl", name: "Stable Diffusion XL" },
  { id: "midjourney", name: "Midjourney" }
];

export const PERSONALITY_TYPES = [
  "Elegant & Sophisticated",
  "Playful & Flirty",
  "Professional & Focused",
  "Mysterious & Alluring",
  "Friendly & Approachable",
  "Bold & Confident",
];

export interface DealerFormState {
  name: string;
  personality: string;
  model: string;
  customPrompt: string;
  isPremium: boolean;
  gender: 'female' | 'male';
}
