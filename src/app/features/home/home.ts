import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  featuredProducts = signal<Product[]>([]);
  activeSlide = signal(0);

  heroSlides = [
    { label: 'Custom Neon Signs', img: 'https://picsum.photos/seed/neon-hero-1/400/500' },
    { label: 'Business Signs',    img: 'https://picsum.photos/seed/neon-hero-2/400/500' },
    { label: 'Bedroom Decor',     img: 'https://picsum.photos/seed/neon-hero-3/400/500' },
    { label: 'Love Signs',        img: 'https://picsum.photos/seed/neon-hero-4/400/500' },
    { label: 'Quote Signs',       img: 'https://picsum.photos/seed/neon-hero-5/400/500' },
  ];

  stats = [
    { value: '2K+', label: 'Happy Customers' },
    { value: '150+', label: 'Designs Available' },
    { value: '7-10', label: 'Days Delivery' },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.featuredProducts.set(this.productService.getProducts().slice(0, 6));
  }

  prevSlide() {
    this.activeSlide.update(s => (s - 1 + this.heroSlides.length) % this.heroSlides.length);
  }

  nextSlide() {
    this.activeSlide.update(s => (s + 1) % this.heroSlides.length);
  }

  getSlideStyle(index: number): object {
    const diff = index - this.activeSlide();
    const total = this.heroSlides.length;
    const adjusted =
      ((diff + Math.floor(total / 2) + total) % total) - Math.floor(total / 2);
  
    const x = adjusted * 120;
    const z = -Math.abs(adjusted) * 70;
    const rotate = adjusted * 12;
    const scale = adjusted === 0 ? 1 : 0.84;
    const opacity = Math.abs(adjusted) > 2 ? 0 : 1 - Math.abs(adjusted) * 0.22;
  
    return {
      transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
      opacity,
      zIndex: 20 - Math.abs(adjusted)
    };
  }
}
