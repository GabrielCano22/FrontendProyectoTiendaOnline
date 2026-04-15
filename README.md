# La Tienda de Gerardo - Frontend

Frontend de la tienda online **"La Tienda de Gerardo"**, construido con **Angular 21**, **Tailwind CSS** y **Lucide Icons**. Ofrece una experiencia completa de e-commerce con roles de cliente y administrador.

---

## Tabla de Contenidos

- [Tecnologias](#tecnologias)
- [Requisitos Previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Ejecucion](#ejecucion)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas y Navegacion](#rutas-y-navegacion)
- [Funcionalidades](#funcionalidades)
- [Servicios](#servicios)
- [Modelos](#modelos)
- [Seguridad](#seguridad)
- [Testing](#testing)
- [Build de Produccion](#build-de-produccion)
- [Autores](#autores)

---

## Tecnologias

| Tecnologia | Version | Descripcion |
|---|---|---|
| Angular | 21.2.0 | Framework principal |
| TypeScript | 5.9.2 | Lenguaje de programacion |
| Tailwind CSS | 3.4.19 | Framework de estilos utilitarios |
| Lucide Angular | 1.0.0 | Libreria de iconos |
| RxJS | 7.8.0 | Programacion reactiva |
| Vitest | 4.0.8 | Framework de testing |
| Prettier | 3.8.1 | Formateo de codigo |

---

## Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 11.x
- **Angular CLI** >= 21.x (`npm install -g @angular/cli`)
- **Backend API** corriendo en `http://localhost:8000`

---

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd FrontendProyectoTiendaOnline

# Instalar dependencias
npm install
```

---

## Ejecucion

```bash
# Servidor de desarrollo
npm start
# La aplicacion estara disponible en http://localhost:4200

# Modo watch (compilacion automatica)
npm run watch
```

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                          # Logica central de la aplicacion
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Guards: authGuard, adminGuard, guestGuard
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts    # Interceptor HTTP para token JWT
│   │   ├── models/
│   │   │   └── index.ts               # Todas las interfaces/modelos
│   │   └── services/
│   │       ├── auth.service.ts        # Autenticacion y sesion
│   │       ├── carrito.service.ts     # Carrito de compras
│   │       ├── categoria.service.ts   # Categorias de productos
│   │       ├── descuento.service.ts   # Descuentos por volumen
│   │       ├── factura.service.ts     # Facturas y compras
│   │       ├── producto.service.ts    # Productos del catalogo
│   │       ├── tienda.service.ts      # Informacion de la tienda
│   │       └── usuario.service.ts     # Gestion de usuarios
│   │
│   ├── features/                      # Modulos funcionales (lazy-loaded)
│   │   ├── auth/                      # Login y registro
│   │   │   ├── login/
│   │   │   ├── registro/
│   │   │   └── auth.routes.ts
│   │   ├── carrito/                   # Carrito de compras
│   │   ├── categorias/                # CRUD de categorias (admin)
│   │   ├── dashboard/                 # Panel principal
│   │   ├── descuentos/                # CRUD de descuentos (admin)
│   │   ├── facturas/                  # Mis compras + detalle de factura
│   │   │   └── factura-detalle/
│   │   ├── gestion-compras/           # Aprobar/rechazar facturas (admin)
│   │   ├── perfil/                    # Perfil del usuario
│   │   ├── productos/                 # Catalogo de productos
│   │   └── usuarios/                  # Gestion de usuarios (admin)
│   │
│   ├── shared/                        # Componentes compartidos
│   │   └── layout/
│   │       └── main-layout/           # Layout principal con sidebar
│   │
│   ├── app.routes.ts                  # Configuracion de rutas
│   ├── app.config.ts                  # Configuracion de la app
│   ├── app.ts                         # Componente raiz
│   └── app.html                       # Template raiz
│
├── environments/
│   ├── environment.ts                 # Configuracion desarrollo (localhost:8000)
│   └── environment.prod.ts            # Configuracion produccion
│
├── styles.css                         # Estilos globales (Tailwind)
├── index.html                         # HTML principal
├── favicon.ico                        # Favicon
└── site.webmanifest                   # Web App Manifest
```

---

## Rutas y Navegacion

### Rutas Publicas (requieren NO estar autenticado)

| Ruta | Componente | Descripcion |
|---|---|---|
| `/auth/login` | LoginComponent | Inicio de sesion |
| `/auth/registro` | RegistroComponent | Registro de nuevos usuarios |

### Rutas de Cliente (requieren autenticacion)

| Ruta | Componente | Descripcion |
|---|---|---|
| `/dashboard` | DashboardComponent | Panel principal con estadisticas |
| `/productos` | ProductosComponent | Catalogo de productos |
| `/carrito` | CarritoComponent | Carrito de compras |
| `/mis-compras` | FacturasComponent | Historial de compras |
| `/facturas/:id` | FacturaDetalleComponent | Detalle de una factura |
| `/perfil` | PerfilComponent | Perfil del usuario |

### Rutas de Administrador (requieren rol administrador)

| Ruta | Componente | Descripcion |
|---|---|---|
| `/categorias` | CategoriasComponent | CRUD de categorias |
| `/usuarios` | UsuariosComponent | Gestion de usuarios |
| `/descuentos` | DescuentosComponent | CRUD de descuentos |
| `/gestion-compras` | GestionComprasComponent | Aprobar/rechazar facturas |

---

## Funcionalidades

### Cliente
- **Registro e inicio de sesion** con autenticacion JWT
- **Explorar productos** con busqueda y filtro por categoria
- **Carrito de compras** con actualizacion de cantidades
- **Descuentos automaticos** por volumen de compra
- **Generar facturas** desde el carrito
- **Historial de compras** con detalle de cada factura
- **Perfil de usuario** editable

### Administrador
- Todo lo del cliente, mas:
- **CRUD de productos** (crear, editar, eliminar)
- **CRUD de categorias**
- **CRUD de descuentos** por volumen
- **Gestion de usuarios**
- **Gestion de compras** (aprobar/rechazar facturas)
- **Dashboard con estadisticas** (productos, categorias, usuarios, descuentos)

---

## Servicios

| Servicio | Endpoint Base | Descripcion |
|---|---|---|
| `AuthService` | `/auth` | Login, registro, logout, gestion de sesion |
| `ProductoService` | `/productos` | CRUD de productos |
| `CategoriaService` | `/categorias` | CRUD de categorias |
| `CarritoService` | `/carrito` | Agregar, actualizar, quitar items del carrito |
| `FacturaService` | `/facturas` | Generar facturas, historial, gestion admin |
| `DescuentoService` | `/descuentos` | CRUD de descuentos |
| `UsuarioService` | `/usuarios` | Gestion de usuarios |
| `TiendaService` | `/tienda` | Informacion de la tienda |

Todos los servicios se conectan al backend en `http://localhost:8000`.

---

## Modelos

```typescript
// Autenticacion
LoginRequest, LoginResponse, RegisterRequest, SessionUser

// Entidades
Usuario, Producto, Categoria, Descuento, Tienda

// Carrito
Carrito, DetalleCarrito, AgregarAlCarritoRequest, ActualizarCantidadRequest

// Facturas
Factura, DetalleFactura

// Operaciones
UsuarioUpdate, CambioContrasena, CategoriaCreate, ProductoCreate, DescuentoCreate

// Generico
ApiResponse<T>
```

---

## Seguridad

- **JWT (JSON Web Token):** El token se almacena en `localStorage` y se envia automaticamente en cada peticion HTTP mediante el `authInterceptor`.
- **Guards de ruta:**
  - `authGuard` — Protege rutas que requieren autenticacion
  - `adminGuard` — Protege rutas exclusivas de administrador
  - `guestGuard` — Impide acceso a login/registro si ya esta autenticado
- **Roles:** `cliente` y `administrador`

---

## Testing

```bash
# Ejecutar tests con Vitest
npm test
```

El proyecto utiliza **Vitest** con **jsdom** como entorno de testing.

---

## Build de Produccion

```bash
# Generar build optimizado
npm run build

# Los archivos se generan en dist/
```

### Presupuestos de bundle:
- **Bundle inicial:** Warning > 1MB, Error > 2MB
- **Estilos por componente:** Warning > 32KB, Error > 64KB

---

## Diseno

- **Tema oscuro** con fondo navy (`#02182B`) y acentos rojos (`#E63946`)
- **Glassmorphism** en componentes de layout
- **Responsive** con sidebar colapsable
- **Fuentes:** Nunito Sans y Rubik (Google Fonts)
- **Iconos:** Lucide Angular

---

## Autores

Proyecto desarrollado como parte del curso de **Programacion de Software** del **Instituto Tecnologico Metropolitano (ITM)**.
