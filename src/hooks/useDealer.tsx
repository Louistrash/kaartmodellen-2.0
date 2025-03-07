import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dealer, OutfitStage, api } from "@/services/api";
import { useStatusManagement } from "./dealer/useStatusManagement";
import { useOutfitManagement } from "./dealer/useOutfitManagement";
import { useImageGeneration } from "./dealer/useImageGeneration";

export function useDealer(id: string | undefined) {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previousImageUrls, setPreviousImageUrls] = useState<Record<number, string>>({});

  // Initialize status management with initial dealer
  const {
    isPremiumChecked,
    isActiveChecked,
    setIsPremiumChecked,
    setIsActiveChecked,
    handlePremiumChange,
    handleActiveChange
  } = useStatusManagement(dealer);

  // Initialize outfit management
  const {
    handleApproveOutfit,
    handleDeleteDealer
  } = useOutfitManagement(setDealer);

  // Function to update dealer with new outfit
  const updateDealerWithOutfit = (newOutfit: any) => {
    setDealer(prev => {
      if (!prev) return null;
      
      const outfits = prev.outfits.filter(o => o.stage !== newOutfit.stage);
      
      return {
        ...prev,
        outfits: [...outfits, newOutfit],
      };
    });
  };

  // Initialize image generation
  const {
    generatingStage,
    handleGenerateImage
  } = useImageGeneration(dealer, setPreviousImageUrls, updateDealerWithOutfit);

  useEffect(() => {
    const fetchDealer = async () => {
      if (!id) return;
      
      try {
        const data = await api.getDealer(id);
        setDealer(data);
        if (data) {
          setIsPremiumChecked(data.isPremium);
          setIsActiveChecked(data.isActive);
          
          const urlMap: Record<number, string> = {};
          data.outfits.forEach(outfit => {
            if (outfit.imageUrl) {
              urlMap[outfit.stage] = outfit.imageUrl;
            }
          });
          setPreviousImageUrls(urlMap);
        }
      } catch (error) {
        console.error("Failed to fetch dealer", error);
        toast.error("Failed to load dealer details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealer();
  }, [id]);

  // Wrapper functions to pass dealer to the utility hooks
  const handlePremiumChangeWrapper = async () => {
    await handlePremiumChange(dealer);
  };

  const handleActiveChangeWrapper = async () => {
    await handleActiveChange(dealer);
  };

  const handleApproveOutfitWrapper = async (outfitId: string) => {
    await handleApproveOutfit(dealer, outfitId);
  };

  const handleDeleteDealerWrapper = async () => {
    await handleDeleteDealer(dealer);
  };

  const handleGenerateImageWrapper = async (stage: OutfitStage) => {
    await handleGenerateImage(stage, previousImageUrls);
  };

  return {
    dealer,
    isLoading,
    isPremiumChecked,
    isActiveChecked,
    generatingStage,
    handlePremiumChange: handlePremiumChangeWrapper,
    handleActiveChange: handleActiveChangeWrapper,
    handleDeleteDealer: handleDeleteDealerWrapper,
    handleApproveOutfit: handleApproveOutfitWrapper,
    handleGenerateImage: handleGenerateImageWrapper
  };
}
