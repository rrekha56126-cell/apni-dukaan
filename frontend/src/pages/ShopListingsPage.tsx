import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Store } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ShopCard from '../components/ShopCard';
import { useGetAllShops } from '../hooks/useQueries';

const CATEGORIES = [
  'All Categories',
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

export default function ShopListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const { data: shops = [], isLoading, isError } = useGetAllShops();

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const matchesSearch =
        searchQuery === '' ||
        shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' || shop.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [shops, searchQuery, selectedCategory]);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Find a <span className="text-brand-blue">Shop</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Discover local shops in your area
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by shop name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl border-border bg-card"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[140px] rounded-xl border-border bg-card shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      {!isLoading && !isError && (
        <p className="text-xs text-muted-foreground mb-4">
          {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-4">
              <div className="flex gap-3">
                <Skeleton className="w-14 h-14 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-foreground font-semibold">Failed to load shops</p>
          <p className="text-sm text-muted-foreground mt-1">Please try again later</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredShops.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-brand-blue-light flex items-center justify-center mx-auto mb-4">
            <Store className="w-10 h-10 text-brand-blue" />
          </div>
          <h3 className="font-heading font-semibold text-foreground text-lg">No shops found</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            {shops.length === 0
              ? 'No shops have been registered yet. Be the first to register!'
              : 'Try adjusting your search or filter to find what you\'re looking for.'}
          </p>
        </div>
      )}

      {/* Shop List */}
      {!isLoading && !isError && filteredShops.length > 0 && (
        <div className="flex flex-col gap-3">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.shopId} shop={shop} />
          ))}
        </div>
      )}
    </div>
  );
}
