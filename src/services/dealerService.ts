import { Dealer } from '@/types/dealer';
import { MOCK_DEALERS } from './mockData';

class DealerService {
  // Get all dealers
  async getDealers(): Promise<Dealer[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...MOCK_DEALERS];
  }

  // Get dealer by ID
  async getDealer(id: string): Promise<Dealer | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if this is one of our new dealers (with "new-" prefix)
    if (id.startsWith('new-')) {
      // Find the dealer in the temporary storage
      const newDealerJson = localStorage.getItem(`dealer:${id}`);
      if (newDealerJson) {
        return JSON.parse(newDealerJson);
      }
    }
    
    const dealer = MOCK_DEALERS.find(d => d.id === id);
    return dealer ? { ...dealer } : null;
  }

  // Create a new dealer
  async createDealer(dealer: Omit<Dealer, 'id' | 'createdAt' | 'updatedAt' | 'outfits'>): Promise<Dealer> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newId = `new-${Math.floor(Math.random() * 10000)}`;
    const createdDate = new Date().toISOString();
    
    const newDealer: Dealer = {
      id: newId,
      ...dealer,
      outfits: [],
      createdAt: createdDate,
      updatedAt: createdDate,
    };
    
    // Store the new dealer in localStorage to persist between page reloads
    localStorage.setItem(`dealer:${newId}`, JSON.stringify(newDealer));
    
    // Also add to our in-memory array for listings
    MOCK_DEALERS.push(newDealer);
    
    return newDealer;
  }

  // Update a dealer
  async updateDealer(id: string, updates: Partial<Dealer>): Promise<Dealer> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find the dealer
    let dealer;
    let isNewDealer = false;
    
    if (id.startsWith('new-')) {
      const dealerJson = localStorage.getItem(`dealer:${id}`);
      if (dealerJson) {
        dealer = JSON.parse(dealerJson);
        isNewDealer = true;
      }
    } else {
      dealer = MOCK_DEALERS.find(d => d.id === id);
    }
    
    if (!dealer) {
      throw new Error("Dealer not found");
    }
    
    const updatedDealer = { ...dealer, ...updates, updatedAt: new Date().toISOString() };
    
    // Update the dealer in the appropriate storage
    if (isNewDealer) {
      localStorage.setItem(`dealer:${id}`, JSON.stringify(updatedDealer));
      
      // Also update in mock array
      const index = MOCK_DEALERS.findIndex(d => d.id === id);
      if (index >= 0) {
        MOCK_DEALERS[index] = updatedDealer;
      }
    } else {
      // Update in mock array
      const index = MOCK_DEALERS.findIndex(d => d.id === id);
      if (index >= 0) {
        MOCK_DEALERS[index] = updatedDealer;
      }
    }
    
    return updatedDealer;
  }

  // Delete a dealer
  async deleteDealer(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    if (id.startsWith('new-')) {
      localStorage.removeItem(`dealer:${id}`);
    }
    
    // Remove from mock array
    const index = MOCK_DEALERS.findIndex(d => d.id === id);
    if (index >= 0) {
      MOCK_DEALERS.splice(index, 1);
    }
    
    return true;
  }
}

export const dealerService = new DealerService();
