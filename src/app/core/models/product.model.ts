export interface Product {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    normalCost?: number;
    maxRetailPrice?: number;
    price: number;
    currency: 'INR';
    images: string[];
    category: string;
    badge?: string;   // e.g. "New", "Hot"
    isActive: boolean;
}