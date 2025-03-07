import { Dealer, OutfitStage } from "@/services/api";
import { DealerHeader } from "@/components/dealer/DealerHeader";
import { DealerInfo } from "@/components/dealer/DealerInfo";
import { OutfitGallery } from "@/components/dealer/OutfitGallery";

interface DealerDetailContentProps {
  dealer: Dealer;
  isPremiumChecked: boolean;
  isActiveChecked: boolean;
  generatingStage: OutfitStage | null;
  onPremiumChange: () => Promise<void>;
  onActiveChange: () => Promise<void>;
  onDeleteDealer: () => Promise<void>;
  onApproveOutfit: (outfitId: string) => Promise<void>;
  onGenerateImage: (stage: OutfitStage) => Promise<void>;
}

export function DealerDetailContent({
  dealer,
  isPremiumChecked,
  isActiveChecked,
  generatingStage,
  onPremiumChange,
  onActiveChange,
  onDeleteDealer,
  onApproveOutfit,
  onGenerateImage
}: DealerDetailContentProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/3 space-y-6">
        <DealerHeader
          dealer={dealer}
          onDelete={onDeleteDealer}
        />
        
        <DealerInfo
          dealer={dealer}
          isPremiumChecked={isPremiumChecked}
          isActiveChecked={isActiveChecked}
          onPremiumChange={onPremiumChange}
          onActiveChange={onActiveChange}
        />
      </div>
      
      <div className="lg:w-2/3">
        <OutfitGallery
          dealer={dealer}
          generatingStage={generatingStage}
          onApproveOutfit={onApproveOutfit}
          onGenerateImage={onGenerateImage}
        />
      </div>
    </div>
  );
}
