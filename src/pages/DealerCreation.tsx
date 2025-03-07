import { PageTransition } from "@/components/PageTransition";
import { Navbar } from "@/components/Navbar";
import { DealerCreationHeader } from "@/components/dealer/DealerCreationHeader";
import { DealerForm } from "@/components/dealer/DealerForm";
import { PhotoRealisticExamples } from "@/components/dealer/PhotoRealisticExamples";
import { useDealerCreation } from "@/hooks/useDealerCreation";

export default function DealerCreation() {
  const {
    formState,
    isCreating,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleSubmit,
  } = useDealerCreation();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container pt-16 pb-16">
          <DealerCreationHeader />
          
          <div className="mx-auto">
            <DealerForm 
              formState={formState}
              isCreating={isCreating}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onSwitchChange={handleSwitchChange}
              onSubmit={handleSubmit}
            />
          </div>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <PhotoRealisticExamples />
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
