import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Shop } from '../backend';

export function useGetAllShops() {
  const { actor, isFetching } = useActor();

  return useQuery<Shop[]>({
    queryKey: ['shops'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetShop(shopId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Shop | null>({
    queryKey: ['shop', shopId],
    queryFn: async () => {
      if (!actor || !shopId) return null;
      try {
        return await actor.getShop(shopId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!shopId,
  });
}

export function useGetShopsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Shop[]>({
    queryKey: ['shops', 'category', category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getShopsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useRegisterShop() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      shopId: string;
      ownerName: string;
      shopName: string;
      category: string;
      description: string;
      address: string;
      city: string;
      phoneNumber: string;
      whatsappNumber: string;
      openingHours: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.registerShop(
        params.shopId,
        params.ownerName,
        params.shopName,
        params.category,
        params.description,
        params.address,
        params.city,
        params.phoneNumber,
        params.whatsappNumber,
        params.openingHours,
        params.imageUrl
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });
}
