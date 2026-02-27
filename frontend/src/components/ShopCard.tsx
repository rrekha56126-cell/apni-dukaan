import { Link } from '@tanstack/react-router';
import { MapPin, Phone, Tag, ChevronRight } from 'lucide-react';
import type { Shop } from '../backend';

const CATEGORY_COLORS: Record<string, string> = {
  'Grocery': 'bg-brand-green-light text-brand-green',
  'Electronics': 'bg-brand-blue-light text-brand-blue',
  'Clothing': 'bg-purple-100 text-purple-700',
  'Pharmacy': 'bg-red-100 text-red-600',
  'Restaurant': 'bg-orange-100 text-orange-600',
  'Bakery': 'bg-yellow-100 text-yellow-700',
  'Hardware': 'bg-gray-100 text-gray-700',
  'Stationery': 'bg-teal-100 text-teal-700',
};

function getCategoryStyle(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-brand-blue-light text-brand-blue';
}

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link
      to="/shop/$shopId"
      params={{ shopId: shop.shopId }}
      className="block group"
    >
      <div className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 p-4 group-active:scale-[0.98]">
        <div className="flex items-start gap-3">
          {/* Shop image or placeholder */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-brand-blue-light to-brand-green-light flex items-center justify-center">
            {shop.imageUrl ? (
              <img
                src={shop.imageUrl}
                alt={shop.shopName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-2xl">🏪</span>
            )}
          </div>

          {/* Shop info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-semibold text-foreground text-base leading-tight truncate">
                {shop.shopName}
              </h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-brand-blue transition-colors" />
            </div>

            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${getCategoryStyle(shop.category)}`}>
              <Tag className="w-3 h-3" />
              {shop.category}
            </span>

            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-brand-blue" />
                <span className="truncate">{shop.city}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-brand-green" />
                <span>{shop.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
