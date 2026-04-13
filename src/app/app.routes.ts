import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Auth (sin layout)
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // App con layout
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'productos',
        loadComponent: () => import('./features/productos/productos.component').then(m => m.ProductosComponent),
      },
      {
        path: 'carrito',
        loadComponent: () => import('./features/carrito/carrito.component').then(m => m.CarritoComponent),
      },
      {
        path: 'mis-compras',
        loadComponent: () => import('./features/facturas/facturas.component').then(m => m.FacturasComponent),
      },
      {
        path: 'facturas/:id',
        loadComponent: () => import('./features/facturas/factura-detalle/factura-detalle.component').then(m => m.FacturaDetalleComponent),
      },
    ],
  },

  { path: '**', redirectTo: '/productos' },
];