import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
    // ⚠️ Replace with your actual WhatsApp number (international format)
    private readonly phone = '+917593016782';

    createBuyLink(product: Product): string {
        const productUrl = window.location.origin + '/products/' + product.slug;
        const msg = `Hi! I want to buy this neon sign:\n\n` +
            `*${product.name}*\n` +
            `Price: ₹${product.price.toLocaleString('en-IN')}\n\n` +
            `Product Link: ${productUrl}`;
        return `https://wa.me/${this.phone}?text=${encodeURIComponent(msg)}`;
    }

    openWhatsapp(product: Product): void {
        window.open(this.createBuyLink(product), '_blank', 'noopener,noreferrer');
    }
}