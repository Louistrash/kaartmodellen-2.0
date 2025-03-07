import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageStagePreview } from "@/components/ImageStagePreview";
import { ImagePlus, Loader2 } from "lucide-react";
import { Dealer, DealerOutfit, OutfitStage } from "@/services/api";

// Define the outfit stages
export const OUTFIT_STAGES = [
  { stage: 1, name: "Casino Uniform" },
  { stage: 2, name: "Relaxed Attire" },
  { stage: 3, name: "Casual/Formal" },
  { stage: 4, name: "Cocktail Attire" },
  { stage: 5, name: "Swimsuit/Lingerie" },
];

interface OutfitGalleryProps {
  dealer: Dealer;
  generatingStage: OutfitStage | null;
  onApproveOutfit: (outfitId: string) => Promise<void>;
  onGenerateImage: (stage: OutfitStage) => Promise<void>;
}

export function OutfitGallery({
  dealer,
  generatingStage,
  onApproveOutfit,
  onGenerateImage,
}: OutfitGalleryProps) {
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [currentBatchStage, setCurrentBatchStage] = useState<number | null>(null);

  // Function to generate all outfits in sequence
  const handleBatchGenerate = async () => {
    setIsBatchGenerating(true);
    
    try {
      // Generate each stage in sequence to maintain character consistency
      for (const { stage } of OUTFIT_STAGES) {
        setCurrentBatchStage(stage);
        // Generate each stage and wait for it to complete before moving to the next
        await onGenerateImage(stage as OutfitStage);
      }
    } catch (error) {
      console.error("Batch generation error:", error);
    } finally {
      setIsBatchGenerating(false);
      setCurrentBatchStage(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Outfit Progression</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBatchGenerate}
          disabled={isBatchGenerating || generatingStage !== null}
        >
          {isBatchGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Stage {currentBatchStage}...
            </>
          ) : (
            <>
              <ImagePlus className="mr-2 h-4 w-4" />
              Batch Generate All
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {OUTFIT_STAGES.map(({ stage, name }) => {
          const existingOutfit = dealer.outfits.find(o => o.stage === stage);
          const isGenerating = generatingStage === stage || (isBatchGenerating && currentBatchStage === stage);
          
          return (
            <ImageStagePreview
              key={stage}
              stage={stage as OutfitStage}
              stageName={name}
              outfit={existingOutfit}
              onApprove={onApproveOutfit}
              onRegenerate={() => onGenerateImage(stage as OutfitStage)}
              isGenerating={isGenerating}
            />
          );
        })}
      </div>
    </div>
  );
}
