import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, Tag, User, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetShop } from '../hooks/useQueries';

export default function ShopDetailPage() {
  const { shopId } = useParams({ from: '/layout/shop/$shopId' });
  const navigate = useNavigate();
  const { data: shop, isLoading, isError } = useGetShop(shopId);

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate({ to: '/shops' })}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shops
        </button>
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !shop) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate({ to: '/shops' })}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shops
        </button>
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="font-heading font-bold text-xl text-foreground">Shop not found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            This shop may have been removed or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  const whatsappUrl = shop.whatsappNumber
    ? `https://wa.me/${shop.whatsappNumber.replace(/\D/g, '')}`
    : null;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate({ to: '/shops' })}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-5 hover:text-brand-blue transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shops
      </button>

      {/* Shop Image */}
      {shop.imageUrl && (
        <div className="w-full h-48 rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-brand-blue-light to-brand-green-light">
          <img
            src={shop.imageUrl}
            alt={shop.shopName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Shop Header */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-heading font-bold text-foreground leading-tight">
            {shop.shopName}
          </h1>
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue flex-shrink-0">
            <Tag className="w-3 h-3" />
            {shop.category}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
          <User className="w-4 h-4 text-brand-green" />
          <span>Owner: <span className="text-foreground font-medium">{shop.ownerName}</span></span>
        </div>
      </div>

      {/* Description */}
      {shop.description && (
        <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <h2 className="text-sm font-heading font-semibold text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{shop.description}</p>
        </div>
      )}

      {/* Details Grid */}
      <div className="bg-card rounded-2xl border border-border divide-y divide-border mb-4">
        {/* Address */}
        <div className="flex items-start gap-3 p-4">
          <div className="w-8 h-8 rounded-lg bg-brand-blue-light flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-brand-blue" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">Address</p>
            <p className="text-sm text-foreground">{shop.address}</p>
            <p className="text-sm text-brand-blue font-medium">{shop.city}</p>
          </div>
        </div>

        {/* Opening Hours */}
        {shop.openingHours && (
          <div className="flex items-start gap-3 p-4">
            <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Opening Hours</p>
              <p className="text-sm text-foreground">{shop.openingHours}</p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-col gap-3">
        <a
          href={`tel:${shop.phoneNumber}`}
          className="flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl gradient-brand text-white font-heading font-semibold text-sm shadow-card-hover active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Call: {shop.phoneNumber}
        </a>

        {whatsappUrl && shop.whatsappNumber && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-card border-2 border-brand-green text-brand-green font-heading font-semibold text-sm shadow-card active:scale-95 transition-transform hover:bg-brand-green-light"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp: {shop.whatsappNumber}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
