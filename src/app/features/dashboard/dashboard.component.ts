import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProductoService } from '../../core/services/producto.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { FacturaService } from '../../core/services/factura.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  facturaService = inject(FacturaService);

  session = this.auth.session;
  isAdmin = this.auth.isAdmin;
  misFacturas = this.facturaService.facturas;
  stats = signal({ productos: 0, categorias: 0 });
  loading = signal(true);

  ngOnInit() {
    this.productoService.getAll().subscribe({
      next: p => this.stats.update(s => ({ ...s, productos: p.length })),
      error: () => {}
    });
    this.categoriaService.getAll().subscribe({
      next: c => this.stats.update(s => ({ ...s, categorias: c.length })),
      error: () => {}
    });
    const userId = this.auth.getUserId();
    if (userId) {
      this.facturaService.getMisFacturas(userId);
    }
    this.loading.set(false);
  }
}