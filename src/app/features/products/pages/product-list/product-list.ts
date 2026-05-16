import { Component, computed, inject, signal } from '@angular/core';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(ProductService);

  readonly allProducts = this.productService.getProducts();

  /** unique sorted categories */
  readonly categories = ['All', ...new Set(this.allProducts.map(p => p.category)).values()];

  readonly searchQuery = signal('');
  readonly activeCategory = signal('All');
  readonly sortBy = signal<'default' | 'price-asc' | 'price-desc'>('default');

  readonly filtered = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.activeCategory();
    const sort = this.sortBy();

    let list = this.allProducts.filter(p => {
      const matchCat = cat === 'All' || p.category === cat;
      const matchQ = !q
        || p.name.toLowerCase().includes(q)
        || p.shortDescription.toLowerCase().includes(q)
        || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  });

  setCategory(cat: string) { this.activeCategory.set(cat); }
  onSearch(value: string) { this.searchQuery.set(value); }
  onSort(value: string)   { this.sortBy.set(value as any); }
  clearSearch() { this.searchQuery.set(''); }
}
