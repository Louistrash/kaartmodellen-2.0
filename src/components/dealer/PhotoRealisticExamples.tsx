import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, UserIcon, UsersIcon } from "lucide-react";

// Example images for realistic dealer photos
const PHOTO_EXAMPLES = {
  female: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Professional Headshot",
      features: ["Natural skin texture", "Soft lighting", "Studio background"],
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Cinematic Portrait",
      features: ["Dramatic lighting", "Color grading", "Expressive pose"],
    },
  ],
  male: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Professional Headshot",
      features: ["Natural skin texture", "Professional attire", "Studio lighting"],
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Cinematic Portrait",
      features: ["Dramatic lighting", "Character depth", "Engaging expression"],
    },
  ],
};

export function PhotoRealisticExamples() {
  const [selectedTab, setSelectedTab] = useState<"female" | "male">("female");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Photorealistic Examples
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="female" onValueChange={(value) => setSelectedTab(value as "female" | "male")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="female" className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" />
              Female
            </TabsTrigger>
            <TabsTrigger value="male" className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              Male
            </TabsTrigger>
          </TabsList>
          
          {["female", "male"].map((gender) => (
            <TabsContent key={gender} value={gender} className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                {PHOTO_EXAMPLES[gender as "female" | "male"].map((example) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-md overflow-hidden border aspect-[4/3] relative group">
                      <img
                        src={example.url}
                        alt={example.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
                        <h3 className="text-white font-medium">{example.title}</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {example.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="bg-white/20 text-white text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
                These examples showcase the photorealistic quality that can be achieved with proper settings and prompts.
                The generated dealer images aim to have similar lighting, skin detail, and natural appearance.
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" className="text-xs">
            View More {selectedTab === "female" ? "Female" : "Male"} Examples
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
