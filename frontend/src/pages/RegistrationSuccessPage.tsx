import { useSearch, useNavigate } from '@tanstack/react-router';
import { CheckCircle, Home, Search, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function RegistrationSuccessPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { shopId?: string; shopName?: string };
  const shopId = search.shopId || '';
  const shopName = search.shopName || 'Your Shop';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (shopId) {
      navigator.clipboard.writeText(shopId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12 flex flex-col items-center text-center animate-fade-in">
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full gradient-brand flex items-center justify-center mb-6 shadow-card-hover">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
        Shop Registered! 🎉
      </h1>
      <p className="text-muted-foreground text-sm max-w-xs mb-8">
        <span className="font-semibold text-brand-green">{shopName}</span> is now live on APNI DUKAAN.
        Customers can find your shop online!
      </p>

      {/* Shop ID Card */}
      {shopId && (
        <div className="w-full max-w-xs bg-card rounded-2xl border border-border shadow-card p-5 mb-8">
          <p className="text-xs text-muted-foreground font-medium mb-2">Your Shop ID</p>
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <code className="text-sm font-mono text-foreground flex-1 truncate">{shopId}</code>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-border transition-colors"
              title="Copy Shop ID"
            >
              {copied ? (
                <Check className="w-4 h-4 text-brand-green" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Save this ID to manage your shop profile later.
          </p>
        </div>
      )}

      {/* What's Next */}
      <div className="w-full max-w-xs bg-brand-green-light rounded-2xl p-4 mb-8 text-left">
        <h3 className="text-sm font-heading font-semibold text-brand-green mb-2">What's next?</h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-brand-green mt-0.5">✓</span>
            Your shop is now visible to customers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-green mt-0.5">✓</span>
            Customers can call or WhatsApp you directly
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-green mt-0.5">✓</span>
            Share your shop with friends and family
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <button
          onClick={() => navigate({ to: '/shops' })}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl gradient-brand text-white font-heading font-semibold text-sm shadow-card-hover active:scale-95 transition-transform"
        >
          <Search className="w-4 h-4" />
          Browse All Shops
        </button>
        <button
          onClick={() => navigate({ to: '/' })}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-card border-2 border-border text-foreground font-heading font-semibold text-sm active:scale-95 transition-transform hover:border-brand-blue hover:text-brand-blue"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
