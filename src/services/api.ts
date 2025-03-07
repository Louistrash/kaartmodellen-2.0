import { Dealer, DealerOutfit, OutfitStage, GenerateImageParams } from '@/types/dealer';
import { dealerService } from './dealerService';
import { outfitService } from './outfitService';
import { imageService } from './imageService';

// Re-export types for backward compatibility
export type { Dealer, DealerOutfit, OutfitStage, GenerateImageParams };

// Create a unified API with all services
const api = {
  // Dealer operations
  getDealers: dealerService.getDealers.bind(dealerService),
  getDealer: dealerService.getDealer.bind(dealerService),
  createDealer: dealerService.createDealer.bind(dealerService),
  updateDealer: dealerService.updateDealer.bind(dealerService),
  deleteDealer: dealerService.deleteDealer.bind(dealerService),
  
  // Outfit operations
  addOutfit: outfitService.addOutfit.bind(outfitService),
  approveOutfit: outfitService.approveOutfit.bind(outfitService),
  
  // Image operations
  generateImage: imageService.generateImage.bind(imageService),
};

export { api };
