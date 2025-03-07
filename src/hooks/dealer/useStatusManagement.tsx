import { useState } from "react";
import { toast } from "sonner";
import { Dealer, api } from "@/services/api";

export function useStatusManagement(initialDealer: Dealer | null) {
  const [isPremiumChecked, setIsPremiumChecked] = useState(initialDealer?.isPremium || false);
  const [isActiveChecked, setIsActiveChecked] = useState(initialDealer?.isActive || false);

  const handlePremiumChange = async (dealer: Dealer | null) => {
    if (!dealer) return;
    
    const newValue = !isPremiumChecked;
    setIsPremiumChecked(newValue);
    
    try {
      await api.updateDealer(dealer.id, { isPremium: newValue });
      toast.success(`Dealer is ${newValue ? 'now' : 'no longer'} premium`);
    } catch (error) {
      setIsPremiumChecked(!newValue); // Revert on failure
      toast.error("Failed to update premium status");
    }
  };

  const handleActiveChange = async (dealer: Dealer | null) => {
    if (!dealer) return;
    
    const newValue = !isActiveChecked;
    setIsActiveChecked(newValue);
    
    try {
      await api.updateDealer(dealer.id, { isActive: newValue });
      toast.success(`Dealer is ${newValue ? 'now active' : 'now inactive'}`);
    } catch (error) {
      setIsActiveChecked(!newValue); // Revert on failure
      toast.error("Failed to update active status");
    }
  };

  return {
    isPremiumChecked,
    isActiveChecked,
    setIsPremiumChecked,
    setIsActiveChecked,
    handlePremiumChange,
    handleActiveChange
  };
}
