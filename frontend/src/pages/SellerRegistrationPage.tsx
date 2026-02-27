import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Check, Loader2, User, MapPin, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import { useRegisterShop } from '../hooks/useQueries';

const CATEGORIES = [
  'Grocery',
  'Electronics',
  'Clothing',
  'Pharmacy',
  'Restaurant',
  'Bakery',
  'Hardware',
  'Stationery',
  'Other',
];

const STEPS = [
  { label: 'Basic Info', icon: User },
  { label: 'Location', icon: MapPin },
  { label: 'Details', icon: FileText },
];

function generateShopId(): string {
  return 'shop_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

interface FieldError {
  [key: string]: string;
}

export default function SellerRegistrationPage() {
  const navigate = useNavigate();
  const { currentStep, formData, updateFormData, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm(3);
  const [errors, setErrors] = useState<FieldError>({});
  const registerShop = useRegisterShop();

  const validateStep = (step: number): boolean => {
    const newErrors: FieldError = {};

    if (step === 0) {
      if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
      if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
      if (!formData.category) newErrors.category = 'Please select a category';
    }

    if (step === 1) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      else {
        const digits = formData.phoneNumber.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 15) {
          newErrors.phoneNumber = 'Phone number must be 10–15 digits';
        }
      }
    }

    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    const shopId = generateShopId();
    try {
      await registerShop.mutateAsync({
        shopId,
        ownerName: formData.ownerName,
        shopName: formData.shopName,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber || formData.phoneNumber,
        openingHours: formData.openingHours || 'Not specified',
        imageUrl: formData.imageUrl || '',
      });
      navigate({ to: '/success', search: { shopId, shopName: formData.shopName } });
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <button
        onClick={() => navigate({ to: '/' })}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-brand-blue transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Register Your <span className="text-brand-green">Shop</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create your digital shop profile in 3 easy steps
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isCompleted
                      ? 'gradient-brand text-white shadow-card'
                      : isActive
                      ? 'bg-brand-blue text-white shadow-card'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    isActive ? 'text-brand-blue' : isCompleted ? 'text-brand-green' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-4 transition-all duration-300 ${
                    index < currentStep ? 'bg-brand-green' : 'bg-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-6">
        {/* Step 1: Basic Info */}
        {currentStep === 0 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-heading font-semibold text-foreground text-lg mb-4">Basic Information</h2>

            <div>
              <Label htmlFor="ownerName" className="text-sm font-medium mb-1.5 block">
                Owner Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerName"
                placeholder="Your full name"
                value={formData.ownerName}
                onChange={(e) => updateFormData({ ownerName: e.target.value })}
                className={`rounded-xl ${errors.ownerName ? 'border-destructive' : ''}`}
              />
              {errors.ownerName && <p className="text-xs text-destructive mt-1">{errors.ownerName}</p>}
            </div>

            <div>
              <Label htmlFor="shopName" className="text-sm font-medium mb-1.5 block">
                Shop Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="shopName"
                placeholder="Your shop's name"
                value={formData.shopName}
                onChange={(e) => updateFormData({ shopName: e.target.value })}
                className={`rounded-xl ${errors.shopName ? 'border-destructive' : ''}`}
              />
              {errors.shopName && <p className="text-xs text-destructive mt-1">{errors.shopName}</p>}
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium mb-1.5 block">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.category} onValueChange={(val) => updateFormData({ category: val })}>
                <SelectTrigger className={`rounded-xl ${errors.category ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Location & Contact */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-heading font-semibold text-foreground text-lg mb-4">Location & Contact</h2>

            <div>
              <Label htmlFor="address" className="text-sm font-medium mb-1.5 block">
                Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                placeholder="Shop address"
                value={formData.address}
                onChange={(e) => updateFormData({ address: e.target.value })}
                className={`rounded-xl ${errors.address ? 'border-destructive' : ''}`}
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="city" className="text-sm font-medium mb-1.5 block">
                City <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                placeholder="City name"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className={`rounded-xl ${errors.city ? 'border-destructive' : ''}`}
              />
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium mb-1.5 block">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                className={`rounded-xl ${errors.phoneNumber ? 'border-destructive' : ''}`}
              />
              {errors.phoneNumber && <p className="text-xs text-destructive mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <Label htmlFor="whatsappNumber" className="text-sm font-medium mb-1.5 block">
                WhatsApp Number <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder="WhatsApp number (if different)"
                value={formData.whatsappNumber}
                onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="openingHours" className="text-sm font-medium mb-1.5 block">
                Opening Hours <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="openingHours"
                placeholder="e.g. Mon–Sat: 9am–8pm"
                value={formData.openingHours}
                onChange={(e) => updateFormData({ openingHours: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Step 3: Description & Review */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-heading font-semibold text-foreground text-lg mb-4">Description & Review</h2>

            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-1.5 block">
                Shop Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your shop, products, and services..."
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                className={`rounded-xl min-h-[100px] ${errors.description ? 'border-destructive' : ''}`}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {formData.description.length}/500
              </p>
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
            </div>

            <div>
              <Label htmlFor="imageUrl" className="text-sm font-medium mb-1.5 block">
                Shop Image URL <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/shop-image.jpg"
                value={formData.imageUrl}
                onChange={(e) => updateFormData({ imageUrl: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Review Summary */}
            <div className="mt-4 pt-4 border-t border-border">
              <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Review Your Details</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Owner', value: formData.ownerName },
                  { label: 'Shop Name', value: formData.shopName },
                  { label: 'Category', value: formData.category },
                  { label: 'Address', value: formData.address },
                  { label: 'City', value: formData.city },
                  { label: 'Phone', value: formData.phoneNumber },
                  formData.whatsappNumber ? { label: 'WhatsApp', value: formData.whatsappNumber } : null,
                  formData.openingHours ? { label: 'Hours', value: formData.openingHours } : null,
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <div key={item!.label} className="flex gap-2">
                      <span className="text-muted-foreground w-24 flex-shrink-0">{item!.label}:</span>
                      <span className="text-foreground font-medium">{item!.value}</span>
                    </div>
                  ))}
              </div>
            </div>

            {errors.submit && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3">
                <p className="text-sm text-destructive">{errors.submit}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {!isFirstStep && (
          <button
            onClick={prevStep}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-card border-2 border-border text-foreground font-heading font-semibold text-sm active:scale-95 transition-transform hover:border-brand-blue hover:text-brand-blue"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {!isLastStep ? (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl gradient-brand text-white font-heading font-semibold text-sm shadow-card-hover active:scale-95 transition-transform"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={registerShop.isPending}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl gradient-brand text-white font-heading font-semibold text-sm shadow-card-hover active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {registerShop.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Register Shop
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
