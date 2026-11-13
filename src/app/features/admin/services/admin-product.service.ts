import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { SupabaseService } from '../../../core/services/supabase.service';

interface DbProduct {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  normalcost: number;
  maxretailprice: number;
  price: number;
  currency: string;
  images: string[];
  category: string;
  badge: string | null;
  is_active: boolean;
}

function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    normalCost: row.normalcost,
    maxRetailPrice: row.maxretailprice,
    price: row.price,
    currency: (row.currency as 'INR') || 'INR',
    images: row.images || [],
    category: row.category,
    badge: row.badge ?? undefined,
    isActive: row.is_active,
  };
}

function toRow(p: Product): Omit<DbProduct, 'id'> {
  return {
    slug: p.slug,
    name: p.name,
    short_description: p.shortDescription,
    description: p.description,
    normalcost: p.normalCost ?? 0,
    maxretailprice: p.maxRetailPrice ?? 0,
    price: p.price,
    currency: p.currency,
    images: p.images,
    category: p.category,
    badge: p.badge || null,
    is_active: p.isActive,
  };
}

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private supabase = inject(SupabaseService);

  private _products = signal<Product[]>([]);
  private _categories = signal<string[]>([]);
  readonly isLoading = signal(false);
  readonly products = this._products.asReadonly();
  readonly categories = this._categories.asReadonly();

  constructor() {
    this.load();
  }

  async load(): Promise<void> {
    this.isLoading.set(true);
    const { data, error } = await this.supabase.client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      const list = (data as DbProduct[]).map(toProduct);
      this._products.set(list);
    }
    await this._loadCategories();
    this.isLoading.set(false);
  }

  async addProduct(product: Product): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('products')
      .insert(toRow(product))
      .select()
      .single();
    if (!error && data) {
      this._products.update(list => [toProduct(data as DbProduct), ...list]);
    } else if (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(updated: Product): Promise<void> {
    const { error } = await this.supabase.client
      .from('products')
      .update(toRow(updated))
      .eq('id', updated.id);
    if (!error) {
      this._products.update(list => list.map(p => p.id === updated.id ? updated : p));
    } else {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('products')
      .delete()
      .eq('id', id);
    if (!error) {
      this._products.update(list => list.filter(p => p.id !== id));
    } else {
      throw new Error(error.message);
    }
  }

 async uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await this.supabase.client.storage
    .from('product-images')
    .upload(path, file, {
      upsert: false,
      contentType: file.type
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(error.message);
  }

  const { data } = this.supabase.client.storage
    .from('product-images')
    .getPublicUrl(path);

  return data.publicUrl;
}

  private async _loadCategories(): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('categories')
      .select('name')
      .order('name', { ascending: true });
    if (!error && data) {
      this._categories.set((data as { name: string }[]).map(c => c.name));
    }
  }

  async addCategory(name: string): Promise<void> {
    const trimmed = name.trim();
    if (!trimmed || this._categories().includes(trimmed)) return;
    const { error } = await this.supabase.client
      .from('categories')
      .insert({ name: trimmed });
    if (error) throw new Error(error.message);
    this._categories.update(c => [...c, trimmed].sort((a, b) => a.localeCompare(b)));
  }

  async deleteCategory(name: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('categories')
      .delete()
      .eq('name', name);
    if (error) throw new Error(error.message);
    this._categories.update(c => c.filter(x => x !== name));
  }

  async renameCategory(oldName: string, newName: string): Promise<void> {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) return;
    const { error } = await this.supabase.client
      .from('categories')
      .update({ name: trimmed })
      .eq('name', oldName);
    if (error) throw new Error(error.message);
    // keep existing products in sync with the new name
    const { error: pErr } = await this.supabase.client
      .from('products')
      .update({ category: trimmed })
      .eq('category', oldName);
    if (pErr) throw new Error(pErr.message);
    this._products.update(list =>
      list.map(p => p.category === oldName ? { ...p, category: trimmed } : p)
    );
    this._categories.update(c => c.map(x => x === oldName ? trimmed : x).sort((a, b) => a.localeCompare(b)));
  }
}
