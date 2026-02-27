import { useState } from 'react';

export interface ShopFormData {
  // Step 1: Basic Info
  ownerName: string;
  shopName: string;
  category: string;
  // Step 2: Location & Contact
  address: string;
  city: string;
  phoneNumber: string;
  whatsappNumber: string;
  openingHours: string;
  // Step 3: Description & Media
  description: string;
  imageUrl: string;
}

const initialFormData: ShopFormData = {
  ownerName: '',
  shopName: '',
  category: '',
  address: '',
  city: '',
  phoneNumber: '',
  whatsappNumber: '',
  openingHours: '',
  description: '',
  imageUrl: '',
};

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ShopFormData>(initialFormData);

  const updateFormData = (updates: Partial<ShopFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
    totalSteps,
  };
}
