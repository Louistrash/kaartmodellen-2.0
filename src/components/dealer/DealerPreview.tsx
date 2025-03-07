import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DealerFormState } from "./DealerFormTypes";
import { InfoIcon, User, Users } from "lucide-react";

interface DealerPreviewProps {
  formState: DealerFormState;
}

export function DealerPreview({ formState }: DealerPreviewProps) {
  // Extract the selected model name from the AI_MODELS array
  const selectedModelName = formState.model 
    ? formState.model === "getimg-ai" 
      ? "GetImg.ai"
      : formState.model === "stable-diffusion-xl" 
        ? "Stable Diffusion XL"
        : formState.model === "dall-e-3" 
          ? "DALL·E 3"
          : formState.model === "midjourney" 
            ? "Midjourney"
            : ""
    : "";

  // Get personality type for display
  const personalityType = formState.personality || "Not selected";

  // Features that will be added to the generation based on the form state
  const photorealisticFeatures = [
    {
      title: "Skin Texture",
      description: "Natural skin with pores and subtle imperfections",
      enabled: formState.customPrompt?.includes("skin texture") || true,
    },
    {
      title: "Detailed Eyes",
      description: "Realistic eyes with proper depth and reflections",
      enabled: formState.customPrompt?.includes("detailed eyes") || true,
    },
    {
      title: "Natural Lighting",
      description: "Soft studio lighting with proper shadows",
      enabled: formState.customPrompt?.includes("lighting") || true,
    },
    {
      title: "Hair Detail",
      description: "Natural hair with individual strands and volume",
      enabled: formState.customPrompt?.includes("hair") || true,
    },
    {
      title: "Professional Look",
      description: "Casino professional with consistent styling",
      enabled: true,
    },
    {
      title: "Enhanced by Custom Prompt",
      description: formState.customPrompt || "No custom prompt added",
      enabled: !!formState.customPrompt,
      highlight: true,
    },
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10">
            {formState.gender === "female" ? (
              <Users className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-primary" />
            )}
          </div>
          Dealer Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary">
              {formState.gender === "female" ? "Female" : "Male"}
            </Badge>
            {personalityType !== "Not selected" && (
              <Badge variant="outline" className="bg-secondary/10 text-secondary">
                {personalityType}
              </Badge>
            )}
            {selectedModelName && (
              <Badge variant="outline" className="bg-accent/10">
                {selectedModelName}
              </Badge>
            )}
            {formState.isPremium && (
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-200">
                Premium
              </Badge>
            )}
          </div>

          <div className="bg-muted/30 p-4 rounded-md border">
            <div className="flex items-center gap-2 mb-3">
              <InfoIcon className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Photorealistic Features</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {photorealisticFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border ${
                    feature.highlight 
                      ? 'bg-primary/5 border-primary/20' 
                      : feature.enabled 
                        ? 'bg-success/5 border-success/20' 
                        : 'bg-muted border-muted-foreground/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium">{feature.title}</h5>
                    <Badge 
                      variant={feature.enabled ? "default" : "outline"} 
                      className={
                        feature.highlight 
                          ? "bg-primary text-primary-foreground text-xs" 
                          : feature.enabled 
                            ? "bg-success/20 text-success text-xs" 
                            : "text-xs"
                      }
                    >
                      {feature.enabled ? "Enabled" : "Not Specified"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {!formState.name && !formState.personality && !formState.model && (
              <div className="mt-3 p-3 border rounded-md bg-amber-50 border-amber-100 text-amber-800 text-sm">
                Complete the form to fully customize your dealer's appearance
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
