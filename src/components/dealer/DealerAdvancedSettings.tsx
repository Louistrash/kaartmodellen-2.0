import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";
import { DealerFormState } from "./DealerFormTypes";

interface DealerAdvancedSettingsProps {
  formState: DealerFormState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
}

export function DealerAdvancedSettings({
  formState,
  onInputChange,
  onSwitchChange,
}: DealerAdvancedSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="customPrompt">Custom Prompt Template</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2 text-sm">
                <h4 className="font-medium">Photorealistic Prompt Tips</h4>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>Be specific about lighting: <span className="text-muted-foreground italic">"soft natural lighting, subtle rim light"</span></li>
                  <li>Describe skin details: <span className="text-muted-foreground italic">"natural skin texture with pores"</span></li>
                  <li>Specify camera settings: <span className="text-muted-foreground italic">"85mm portrait lens, f/2.8 aperture"</span></li>
                  <li>Add professional context: <span className="text-muted-foreground italic">"professional photoshoot, studio lighting"</span></li>
                  <li>Describe expressions: <span className="text-muted-foreground italic">"confident subtle smile, relaxed expression"</span></li>
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <Textarea
          id="customPrompt"
          name="customPrompt"
          placeholder="Example: professional photography, natural skin texture with visible pores, detailed eyes with depth, 85mm portrait lens, soft studio lighting, subtle smile"
          value={formState.customPrompt}
          onChange={onInputChange}
          className="min-h-24 text-sm"
        />
        
        <div className="bg-muted/50 p-3 rounded-md mt-2">
          <h4 className="text-xs font-medium mb-2">Sample Prompts for Realism</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div onClick={() => {
              const exampleText = "professional headshot, natural skin texture with pores, detailed eyes with proper catch lights, soft studio lighting, 85mm lens";
              const event = {
                target: { name: "customPrompt", value: exampleText }
              } as React.ChangeEvent<HTMLTextAreaElement>;
              onInputChange(event);
            }} className="text-xs p-2 bg-background border rounded-md cursor-pointer hover:bg-accent transition-colors">
              Professional Headshot
            </div>
            
            <div onClick={() => {
              const exampleText = "photorealistic portrait, cinematic lighting, detailed facial features, natural hair strands, 4k, detailed skin texture";
              const event = {
                target: { name: "customPrompt", value: exampleText }
              } as React.ChangeEvent<HTMLTextAreaElement>;
              onInputChange(event);
            }} className="text-xs p-2 bg-background border rounded-md cursor-pointer hover:bg-accent transition-colors">
              Cinematic Portrait
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          These details will be added to the AI prompt to enhance photorealism across all generated images
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isPremium"
          checked={formState.isPremium}
          onCheckedChange={(checked) => onSwitchChange("isPremium", checked)}
        />
        <Label htmlFor="isPremium">Premium Dealer</Label>
      </div>
    </div>
  );
}
