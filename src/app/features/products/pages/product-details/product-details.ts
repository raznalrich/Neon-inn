import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule, ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit{
  product = signal<Product | null>(null);
  notFound = signal(false);

  // Newest 3 products (list is ordered newest first), excluding the one being viewed
  recentProducts = computed(() =>
    this.productService.products()
      .filter(p => p.id !== this.product()?.id)
      .slice(0, 3)
  );

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private whatsappService: WhatsappService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.productService.getBySlugAsync(slug).then(found => {
      if (found) this.product.set(found);
      else this.notFound.set(true);
    });
  }

  buyNow() {
    if (this.product()) this.whatsappService.openWhatsapp(this.product()!);
  }
}
