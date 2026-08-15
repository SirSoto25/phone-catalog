# MBST — catálogo de móviles

Prueba técnica de catálogo de smartphones: listado con búsqueda, detalle con opciones, y carrito persistente. Lo monté con **Next.js (App Router)**, **SASS** y **React Context**.

## Requisitos

- Node 18+

## Setup

```bash
npm install
cp .env.example .env.local
```

En `.env.local` rellena la API key del brief:

```env
NEXT_PUBLIC_API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
API_KEY=tu_api_key
NEXT_PUBLIC_API_KEY=tu_api_key
```

Uso las dos keys porque el listado/detalle pegan desde servidor y la búsqueda desde el cliente. Las dos llevan el mismo valor.

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | desarrollo (sin minificar) |
| `npm run build` + `npm start` | producción |
| `npm run lint` | ESLint |
| `npm test` | tests unitarios (Vitest) |
| `npm run format` | Prettier |

## Qué hay en la app

- **Listado:** primeros 20 productos por SSR, cards con imagen / marca / nombre / precio
- **Búsqueda:** en tiempo real contra la API (`?search=`), con contador de resultados
- **Detalle:** SSR del producto, selectores de color y almacenamiento, precio e imagen en vivo, botón Añadir solo si hay ambas opciones, specs y similares
- **Carrito:** vista con eliminar, total y “Continuar comprando”; el contador vive en el navbar y se guarda en `localStorage`

## Arquitectura (resumen)

- Listado inicial y detalle se resuelven en **servidor** (SSR).
- Búsqueda, selectores y carrito van en el **cliente**.
- El carrito usa **Context** + `localStorage` (`mbst-cart`). La API no tiene endpoint de carrito, así que todo es local.
- Estilos con SASS; tipografía `Helvetica, Arial, sans-serif` como pide el brief. Me basé en el Figma en lo esencial, sin obsesionarme con el pixel-perfect.

Estructura relevante:

```
app/                  # rutas (/, /product/[id], /cart)
components/           # UI
context/              # CartContext
lib/api/              # cliente + helpers de products
lib/cart/             # lógica pura del carrito (testeable)
```

## Decisiones

- Elegí Next con SSR porque el brief lo marca como opcional y preferí cubrirlo desde el principio.
- No usé Tailwind: SASS + módulos me bastaba y encaja con el stack pedido.
- Los tests cubren helpers del carrito (`canAddToCart`, count, total), no pantallas enteras.
- Las imágenes de la API vienen en `http://`; están configuradas en `next.config.mjs` para `next/image`.

## API

Base: `https://prueba-tecnica-api-tienda-moviles.onrender.com`  
Docs: `/docs/`  
Todas las peticiones llevan header `x-api-key`.

A veces Render tarda en despertar; si falla el primer fetch, reintenta.

## Límites

- No hay paginación (la API tiene `limit`/`offset`; el listado pide 20).
- El diseño sigue el Figma de forma aproximada.
- Deploy no incluido (se puede subir a Vercel/Netlify sin drama).

## Tests

```bash
npm test
```
