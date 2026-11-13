import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'products',
        loadChildren: () =>
            import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    ...['terms-and-conditions', 'privacy-policy', 'refund-policy', 'shipping-policy'].map(key => ({
        path: key,
        data: { policy: key },
        loadComponent: () =>
            import('./features/policies/policy').then(m => m.Policy)
    })),
    // {
    //     path: '**',
    //     loadComponent: () =>
    //         import('./features/not-found/not-found').then(m => m.NotFound)
    // }
];
