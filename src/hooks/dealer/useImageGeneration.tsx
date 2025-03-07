import { useState } from "react";
import { toast } from "sonner";
import { Dealer, OutfitStage, api } from "@/services/api";
import { OUTFIT_STAGES } from "@/components/dealer/OutfitGallery";

export function useImageGeneration(
  dealer: Dealer | null,
  setPreviousImageUrls: React.Dispatch<React.SetStateAction<Record<number, string>>>,
  updateDealerWithOutfit: (newOutfit: any) => void
) {
  const [generatingStage, setGeneratingStage] = useState<OutfitStage | null>(null);

  const handleGenerateImage = async (stage: OutfitStage, previousImageUrls: Record<number, string>) => {
    if (!dealer) return;
    
    setGeneratingStage(stage);
    const stageInfo = OUTFIT_STAGES.find(s => s.stage === stage);
    
    try {
      const stagePrompt = stageInfo?.name || `Stage ${stage}`;
      
      const gender = dealer.gender || 'female'; // Default to female if not specified
      
      let previousStage = null;
      let previousImageUrl = null;
      
      for (let i = stage - 1; i >= 1; i--) {
        if (previousImageUrls[i]) {
          previousStage = i;
          previousImageUrl = previousImageUrls[i];
          break;
        }
      }
      
      let outfitDetails = "";
      switch(stage) {
        case 1:
          outfitDetails = gender === 'female' 
            ? "wearing professional casino uniform, black vest, white shirt, black tie, formal skirt, standing at blackjack table"
            : "wearing professional casino uniform, black vest, white shirt, black tie, formal pants, standing at blackjack table";
          break;
        case 2: 
          outfitDetails = gender === 'female'
            ? "wearing relaxed casino attire, white shirt with sleeves rolled up, slightly undone tie, standing relaxed at blackjack table"
            : "wearing relaxed casino attire, white shirt with sleeves rolled up, loosened tie, standing relaxed at blackjack table";
          break;
        case 3:
          outfitDetails = gender === 'female'
            ? "wearing elegant stylish clothing, sleek blouse or sophisticated dress, at upscale casino setting"
            : "wearing elegant stylish clothing, fitted dress shirt or casual blazer, at upscale casino setting";
          break;
        case 4:
          outfitDetails = gender === 'female'
            ? "wearing cocktail dress with elegant accessories, in high-end casino lounge setting with soft lighting"
            : "wearing formal evening attire, open-chest dress shirt or fitted tuxedo vest, in high-end casino lounge setting";
          break;
        case 5:
          outfitDetails = gender === 'female'
            ? "wearing stylish lingerie or fashionable swimsuit, tasteful and sophisticated pose, elegant casino suite setting"
            : "wearing stylish swim shorts or elegant robe, tasteful and sophisticated pose, elegant casino suite setting";
          break;
      }
      
      const isSequential = previousImageUrl !== null;
      
      let detailedPrompt = isSequential
        ? `same person as previous image, identical facial features and appearance, ${gender} casino dealer with ${dealer.personality.toLowerCase()} expression, ${outfitDetails}, photorealistic, professional photography, consistent lighting, same exact face and body as previous image, only one person in frame`
        : `${gender} casino dealer with ${dealer.personality.toLowerCase()} expression, ${outfitDetails}, photorealistic, professional photography, consistent lighting, only one person in frame`;
      
      if (dealer.customPrompt) {
        detailedPrompt += `, ${dealer.customPrompt}`;
      }
      
      const imageUrl = await api.generateImage({
        prompt: detailedPrompt,
        model: dealer.model,
        gender: gender,
        previousImageUrl: previousImageUrl,
        isSequential: isSequential,
        stageNumber: stage
      });
      
      setPreviousImageUrls(prev => ({
        ...prev,
        [stage]: imageUrl
      }));
      
      const newOutfit = await api.addOutfit(dealer.id, {
        stage,
        name: stageInfo?.name || `Stage ${stage}`,
        imageUrl,
        approved: false,
      });
      
      updateDealerWithOutfit(newOutfit);
      
      toast.success(`Generated ${stageInfo?.name} image`);
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error(`Failed to generate image: ${error.message || "Unknown error"}`);
    } finally {
      setGeneratingStage(null);
    }
  };

  return {
    generatingStage,
    handleGenerateImage
  };
}
