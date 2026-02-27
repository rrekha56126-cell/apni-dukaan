import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Shop {
    ownerName: string;
    shopId: string;
    city: string;
    createdAt: Time;
    description: string;
    whatsappNumber: string;
    imageUrl: string;
    address: string;
    openingHours: string;
    shopName: string;
    category: string;
    phoneNumber: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllShops(): Promise<Array<Shop>>;
    getShop(shopId: string): Promise<Shop>;
    getShopsByCategory(category: string): Promise<Array<Shop>>;
    getShopsByCity(city: string): Promise<Array<Shop>>;
    registerShop(shopId: string, ownerName: string, shopName: string, category: string, description: string, address: string, city: string, phoneNumber: string, whatsappNumber: string, openingHours: string, imageUrl: string): Promise<void>;
}
