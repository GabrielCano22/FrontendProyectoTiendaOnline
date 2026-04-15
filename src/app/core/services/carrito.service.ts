import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, map, forkJoin, of } from 'rxjs';
import { Carrito, AgregarAlCarritoRequest, ActualizarCantidadRequest, Producto } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private base = `${environment.apiUrl}/carrito`;
  private productoBase = `${environment.apiUrl}/productos`;
  private http = inject(HttpClient);
  cartCount = signal<number>(0);

  private enrichCarrito(carrito: Carrito): Observable<Carrito> {
    if (!carrito.detalles || carrito.detalles.length === 0) return of(carrito);

    const requests = carrito.detalles.map(d =>
      this.http.get<Producto>(`${this.productoBase}/${d.id_producto}`)
    );

    return forkJoin(requests).pipe(
      map(productos => {
        carrito.detalles = carrito.detalles.map((d, i) => ({
          ...d,
          producto: productos[i]
        }));
        return carrito;
      })
    );
  }

  get(userId: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.base}/${userId}`).pipe(
      tap(c => this.cartCount.set(c.detalles?.length ?? 0)),
      switchMap(c => this.enrichCarrito(c))
    );
  }

  agregar(userId: string, data: AgregarAlCarritoRequest): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.base}/${userId}/agregar`, data).pipe(
      tap(c => this.cartCount.set(c.detalles?.length ?? 0)),
      switchMap(c => this.enrichCarrito(c))
    );
  }

  actualizar(userId: string, productoId: string, data: ActualizarCantidadRequest): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.base}/${userId}/actualizar/${productoId}`, data).pipe(
      tap(c => this.cartCount.set(c.detalles?.length ?? 0)),
      switchMap(c => this.enrichCarrito(c))
    );
  }

  quitar(userId: string, productoId: string): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.base}/${userId}/quitar/${productoId}`).pipe(
      tap(c => this.cartCount.set(c.detalles?.length ?? 0)),
      switchMap(c => this.enrichCarrito(c))
    );
  }

  vaciar(userId: string): Observable<any> {
    return this.http.delete(`${this.base}/${userId}/vaciar`).pipe(
      tap(() => this.cartCount.set(0))
    );
  }
}
