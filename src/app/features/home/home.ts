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
    { label: 'Custom Neon Signs', img: 'https://images.unsplash.com/photo-1569081156361-c98e05e7f1e4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { label: 'Business Signs',    img: 'https://images.unsplash.com/photo-1507120410856-1f35574c3b45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { label: 'Bedroom Decor',     img: 'https://images.unsplash.com/photo-1602918955248-d1bbfcbfae38?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { label: 'Love Signs',        img: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { label: 'Quote Signs',       img: 'https://plus.unsplash.com/premium_photo-1674670903819-8983675fe386?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
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
