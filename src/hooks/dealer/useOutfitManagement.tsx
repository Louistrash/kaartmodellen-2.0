import { toast } from "sonner";
import { Dealer, api } from "@/services/api";

export function useOutfitManagement(
  updateDealer: React.Dispatch<React.SetStateAction<Dealer | null>>
) {
  const handleApproveOutfit = async (dealer: Dealer | null, outfitId: string) => {
    if (!dealer) return;
    
    try {
      await api.approveOutfit(dealer.id, outfitId);
      updateDealer(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          outfits: prev.outfits.map(outfit => 
            outfit.id === outfitId ? { ...outfit, approved: true } : outfit
          )
        };
      });
      
      toast.success("Outfit approved");
    } catch (error) {
      toast.error("Failed to approve outfit");
    }
  };

  const handleDeleteDealer = async (dealer: Dealer | null) => {
    if (!dealer) return;
    
    try {
      await api.deleteDealer(dealer.id);
    } catch (error) {
      toast.error("Failed to delete dealer");
    }
  };

  return {
    handleApproveOutfit,
    handleDeleteDealer
  };
}
