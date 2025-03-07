// Dealer and outfit types
export interface Dealer {
  id: string;
  name: string;
  personality: string;
  model: string;
  isActive: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  outfits: DealerOutfit[];
  customPrompt?: string;
  gender: 'female' | 'male'; // Added gender field
}

export interface DealerOutfit {
  id: string;
  stage: number;
  name: string;
  imageUrl: string;
  approved: boolean;
}

export type OutfitStage = 1 | 2 | 3 | 4 | 5;

export interface GenerateImageParams {
  prompt: string;
  model: string;
  gender: 'female' | 'male';
  previousImageUrl?: string; // Added for continuity between images
  isSequential?: boolean;    // Flag to indicate sequential generation
  stageNumber?: number;      // Which stage in the progression
}
