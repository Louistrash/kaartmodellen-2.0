import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DealerCreationHeader() {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Dealer</h1>
        <p className="text-muted-foreground mb-8">
          Define your dealer's characteristics before generating outfit images
        </p>
      </div>
    </>
  );
}
