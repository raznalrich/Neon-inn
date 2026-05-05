import { Injectable } from '@angular/core';
import { PRODUCTS } from '../../features/products/data/products.mock';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    getProducts(): Product[] {
        return PRODUCTS.filter(p => p.isActive);
    }

    getBySlug(slug: string): Product | undefined {
        return PRODUCTS.find(p => p.slug === slug && p.isActive);
    }

    getByCategory(category: string): Product[] {
        return PRODUCTS.filter(p => p.category === category && p.isActive);
    }
}