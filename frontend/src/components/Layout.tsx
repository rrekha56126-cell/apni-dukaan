import { Outlet, Link, useRouter } from '@tanstack/react-router';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="container max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/apni-dukaan-logo.dim_512x512.png"
              alt="APNI DUKAAN"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link
            to="/register"
            className="text-xs font-semibold text-brand-blue hover:text-brand-green transition-colors px-3 py-1.5 rounded-lg border border-brand-blue hover:border-brand-green"
          >
            + Register Shop
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border py-5 mt-8">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} APNI DUKAAN · Har Dukan Online
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with{' '}
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
        </div>
      </footer>
    </div>
  );
}
