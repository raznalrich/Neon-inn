import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
    // ⚠️ Replace with your actual WhatsApp number (international format)
    private supabase = inject(SupabaseService);
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
        // Record the order for the admin portal; never block opening WhatsApp on it.
        this.logOrder(product).catch(err =>
            console.error('Failed to log WhatsApp order:', err));
        window.open(this.createBuyLink(product), '_blank', 'noopener,noreferrer');
    }

    private async logOrder(product: Product): Promise<void> {
        const { error } = await this.supabase.client.from('orders').insert({
            customer_name: 'WhatsApp Customer',
            customer_phone: '',
            customer_address: '',
            items: [{
                customername: 'WhatsApp Customer',
                phonenumber: '',
                productId: product.id,
                productName: product.name,
                price: product.price,
                qty: 1,
            }],
            total: product.price,
            status: 'pending',
            source: 'whatsapp',
            notes: '',
        });
        if (error) throw new Error(error.message);
    }
}
