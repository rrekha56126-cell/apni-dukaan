import { useNavigate } from '@tanstack/react-router';
import { Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        {/* Logo */}
        <div className="mb-6 animate-fade-in">
          <img
            src="/assets/generated/apni-dukaan-logo.dim_512x512.png"
            alt="APNI DUKAAN"
            className="w-56 h-56 object-contain mx-auto drop-shadow-lg"
          />
        </div>

        {/* Tagline */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-heading font-800 mb-2">
            <span className="text-brand-green">APNI</span>{' '}
            <span className="text-brand-blue">DUKAAN</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-brand-green">
            <span className="h-px w-8 bg-brand-green inline-block" />
            <p className="text-base font-heading font-semibold tracking-wide">
              Har Dukan Online
            </p>
            <span className="h-px w-8 bg-brand-green inline-block" />
          </div>
          <p className="mt-4 text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
            Discover local shops near you or bring your shop online in minutes.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-xs flex flex-col gap-4 animate-fade-in">
          <button
            onClick={() => navigate({ to: '/shops' })}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl gradient-brand text-white font-heading font-semibold text-base shadow-card-hover active:scale-95 transition-transform"
          >
            <Search className="w-5 h-5" />
            Find a Shop
          </button>

          <button
            onClick={() => navigate({ to: '/register' })}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-card border-2 border-brand-blue text-brand-blue font-heading font-semibold text-base shadow-card active:scale-95 transition-transform hover:bg-brand-blue-light"
          >
            <Store className="w-5 h-5" />
            Register Your Shop
          </button>
        </div>

        {/* Stats strip */}
        <div className="mt-12 w-full max-w-xs grid grid-cols-3 gap-2">
          {[
            { label: 'Local Shops', icon: '🏪' },
            { label: 'Cities', icon: '🏙️' },
            { label: 'Categories', icon: '📦' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card rounded-xl p-3 text-center border border-border shadow-xs"
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} APNI DUKAAN · Built with{' '}
          <span className="text-brand-green">♥</span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'apni-dukaan')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
