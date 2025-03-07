import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader2 } from "lucide-react";
import { DealerBasicInfo } from "./DealerBasicInfo";
import { DealerPersonality } from "./DealerPersonality";
import { DealerModelSelection } from "./DealerModelSelection";
import { DealerAdvancedSettings } from "./DealerAdvancedSettings";
import { DealerPreview } from "./DealerPreview";
import { DealerFormState } from "./DealerFormTypes";

// Re-export from types
export { AI_MODELS, PERSONALITY_TYPES } from "./DealerFormTypes";
export type { DealerFormState } from "./DealerFormTypes";

interface DealerFormProps {
  formState: DealerFormState;
  isCreating: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function DealerForm({
  formState,
  isCreating,
  onInputChange,
  onSelectChange,
  onSwitchChange,
  onSubmit,
}: DealerFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Dealer Details</CardTitle>
              <CardDescription>
                These details will be used to create consistent AI-generated images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <DealerBasicInfo 
                formState={formState} 
                onInputChange={onInputChange} 
                onSelectChange={onSelectChange} 
              />
              
              {/* Personality Selection */}
              <DealerPersonality 
                formState={formState} 
                onSelectChange={onSelectChange} 
              />
              
              {/* Model Selection */}
              <DealerModelSelection 
                formState={formState} 
                onSelectChange={onSelectChange} 
              />
              
              <Separator />
              
              {/* Advanced Settings */}
              <DealerAdvancedSettings 
                formState={formState}
                onInputChange={onInputChange}
                onSwitchChange={onSwitchChange}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Dealer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <DealerPreview formState={formState} />
        </div>
      </div>
    </form>
  );
}
