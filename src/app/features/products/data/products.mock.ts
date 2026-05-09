import { Product } from '../../../core/models/product.model';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        slug: 'neon-heart-red',
        name: 'Glowing Red Heart',
        shortDescription: 'A vibrant red neon heart perfect for bedrooms & cafes.',
        description: 'Handcrafted LED neon sign in bold red. USB powered with dimmer switch. Flexible silicone tube mounted on acrylic backboard. 40cm x 35cm.',
        price: 2499,
        currency: 'INR',
        images: ['https://images.unsplash.com/photo-1569081156361-c98e05e7f1e4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        category: 'Love',
        badge: 'Best Seller',
        isActive: true
    },
    {
        id: '2',
        slug: 'neon-open-sign',
        name: 'OPEN Neon Sign',
        shortDescription: 'Classic blue OPEN sign for shops and restaurants.',
        description: 'Classic style LED OPEN sign in vibrant blue glow. Ideal for shops, cafes, bars. 12V adapter included. 50cm x 25cm.',
        price: 3299,
        currency: 'INR',
        images: ['https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        category: 'Business',
        badge: 'Popular',
        isActive: true
    },
    {
        id: '3',
        slug: 'neon-good-vibes',
        name: 'Good Vibes Only',
        shortDescription: 'Positive vibes neon for your living room or studio.',
        description: 'Motivational LED neon sign in warm pink. Custom curved lettering. Wall mount + free hanging kit. 60cm x 20cm.',
        price: 3999,
        currency: 'INR',
        images: ['https://plus.unsplash.com/premium_photo-1674670903819-8983675fe386?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        category: 'Quotes',
        badge: 'New',
        isActive: true
    },
    {
        id: '4',
        slug: 'neon-bar-sign',
        name: 'BAR Neon Sign',
        shortDescription: 'Classic green BAR sign for home bars & pubs.',
        description: 'Retro-style green neon BAR sign. Durable acrylic base. 3-meter power cord. Perfect for home bars, man caves. 45cm x 30cm.',
        price: 2899,
        currency: 'INR',
        images: ['https://images.unsplash.com/photo-1602918955248-d1bbfcbfae38?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        category: 'Business',
        isActive: true
    },
    {
        id: '5',
        slug: 'neon-moon-star',
        name: 'Moon & Star',
        shortDescription: 'Dreamy crescent moon with star for bedroom decor.',
        description: 'Celestial LED neon set — crescent moon + five-pointed star in cool white. Comes with wall anchors. 35cm x 40cm.',
        price: 1999,
        currency: 'INR',
        images: ['https://images.unsplash.com/photo-1507120410856-1f35574c3b45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        category: 'Decor',
        badge: 'Hot',
        isActive: true
    },
    {
        id: '6',
        slug: 'neon-custom-name',
        name: 'Custom Name Sign',
        shortDescription: 'Your name in neon — fully customizable color & font.',
        description: 'Order a personalized LED neon sign with your name or word. Choose from 10 colors. Font options available. Delivery in 7–10 days. Up to 20 characters.',
        price: 4999,
        currency: 'INR',
        images: ['https://images.unsplash.com/photo-1581300740943-cfa5f847db2c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        category: 'Custom',
        badge: 'Custom',
        isActive: true
    }
];