import { DealerOutfit, OutfitStage } from '@/types/dealer';
import { dealerService } from './dealerService';

class OutfitService {
  // Add a new outfit to a dealer
  async addOutfit(dealerId: string, outfit: Omit<DealerOutfit, 'id'>): Promise<DealerOutfit> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newOutfit: DealerOutfit = {
      id: `outfit-${Math.floor(Math.random() * 10000)}`,
      ...outfit,
    };
    
    // Find the dealer and add the outfit
    const dealer = await dealerService.getDealer(dealerId);
    if (dealer) {
      // Filter out any existing outfits with the same stage
      const updatedOutfits = dealer.outfits.filter(o => o.stage !== outfit.stage);
      updatedOutfits.push(newOutfit);
      
      // Update the dealer
      await dealerService.updateDealer(dealerId, { outfits: updatedOutfits });
    }
    
    return newOutfit;
  }

  // Approve an outfit
  async approveOutfit(dealerId: string, outfitId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the dealer
    const dealer = await dealerService.getDealer(dealerId);
    if (dealer) {
      // Find and update the outfit
      const updatedOutfits = dealer.outfits.map(outfit => 
        outfit.id === outfitId ? { ...outfit, approved: true } : outfit
      );
      
      // Update the dealer
      await dealerService.updateDealer(dealerId, { outfits: updatedOutfits });
    }
    
    return true;
  }
}

export const outfitService = new OutfitService();
