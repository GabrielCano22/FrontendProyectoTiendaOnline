import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FacturaService } from '../../core/services/factura.service';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './facturas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasComponent implements OnInit {
  private auth = inject(AuthService);
  private facturaService = inject(FacturaService);

  facturas = this.facturaService.facturas;
  loading = this.facturaService.loading;
  error = this.facturaService.error;

  totalGastado = computed(() =>
    this.facturas().reduce((sum, f) => sum + Number(f.total_neto), 0)
  );

  totalAhorrado = computed(() =>
    this.facturas().reduce((sum, f) => sum + Number(f.total_descuento), 0)
  );

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (userId) {
      this.facturaService.getMisFacturas(userId);
    }
  }

  shortId(id: string): string {
    return id.slice(0, 8).toUpperCase();
  }

  estadoColor(estado: string): string {
    switch (estado) {
      case 'pagado': case 'pagada': return 'green';
      case 'pendiente': return 'amber';
      case 'cancelado': case 'anulada': return 'red';
      default: return 'gray';
    }
  }
}