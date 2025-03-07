import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/services/api";
import { DealerFormState } from "@/components/dealer/DealerForm";
import { AI_MODELS } from "@/components/dealer/DealerForm";

export function useDealerCreation() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<DealerFormState>({
    name: "",
    personality: "",
    model: "",
    customPrompt: "",
    isPremium: false,
    gender: "female", // Default to female
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.personality || !formState.model || !formState.gender) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsCreating(true);
    
    try {
      const newDealer = await api.createDealer({
        name: formState.name,
        personality: formState.personality,
        model: AI_MODELS.find(m => m.id === formState.model)?.name || formState.model,
        isActive: true,
        isPremium: formState.isPremium,
        gender: formState.gender,
        customPrompt: formState.customPrompt,
      });
      
      toast.success("Dealer created successfully");
      navigate(`/dealer/${newDealer.id}`);
    } catch (error) {
      console.error("Failed to create dealer", error);
      toast.error("Failed to create dealer");
    } finally {
      setIsCreating(false);
    }
  };

  return {
    formState,
    isCreating,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleSubmit,
  };
}
