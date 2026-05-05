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
    // {
    //     path: '**',
    //     loadComponent: () =>
    //         import('./features/not-found/not-found').then(m => m.NotFound)
    // }
];
