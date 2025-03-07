import { useParams } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Navbar } from "@/components/Navbar";
import { useDealer } from "@/hooks/useDealer";
import { DealerDetailContent } from "@/components/dealer/DealerDetailContent";
import { LoadingState } from "@/components/dealer/LoadingState";
import { NotFoundState } from "@/components/dealer/NotFoundState";

export default function DealerDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    dealer,
    isLoading,
    isPremiumChecked,
    isActiveChecked,
    generatingStage,
    handlePremiumChange,
    handleActiveChange,
    handleDeleteDealer,
    handleApproveOutfit,
    handleGenerateImage
  } = useDealer(id);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container pt-24 pb-16">
          {isLoading ? (
            <LoadingState />
          ) : !dealer ? (
            <NotFoundState />
          ) : (
            <DealerDetailContent 
              dealer={dealer}
              isPremiumChecked={isPremiumChecked}
              isActiveChecked={isActiveChecked}
              generatingStage={generatingStage}
              onPremiumChange={handlePremiumChange}
              onActiveChange={handleActiveChange}
              onDeleteDealer={handleDeleteDealer}
              onApproveOutfit={handleApproveOutfit}
              onGenerateImage={handleGenerateImage}
            />
          )}
        </main>
      </div>
    </PageTransition>
  );
}
