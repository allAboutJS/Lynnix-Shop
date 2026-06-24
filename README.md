# Lynnix Shop

A fully server-rendered e-commerce demo built with [Lynnix](https://github.com/allaboutjs/lynnix), [Mutor.js](https://github.com/allAboutJS/Mutor), and [htmx](https://htmx.org). No client-side framework. No build step for the frontend. Just files, functions, and hypermedia.

---

## What it demonstrates

- File-based routing with Lynnix — pages, fragments, and dynamic routes all driven by the filesystem
- Real-time cart updates using htmx custom events — add and remove items without a page reload
- Server-side rendering with Mutor.js — templates compiled and rendered on the server
- Dynamic product pages via `[id]` route segments
- Fragment-only responses for htmx partial swaps alongside full-page SSR for direct navigation
- Deployable to Vercel with zero framework-specific configuration

---

## Stack

- **[Lynnix](https://github.com/allaboutjs/lynnix)** — file-based routing and SSR middleware
- **[Mutor.js](https://github.com/allAboutJS/Mutor.js)** — template engine (bundled with Lynnix)
- **[htmx](https://htmx.org)** — hypermedia interactions
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first styling
- **[Fake Store API](https://fakestoreapi.com)** — product data source
- **Node.js** — runtime

---

## Project Structure

```
app/
├── components/
│   ├── header.html         — shared header with live cart count
│   ├── htmx-script.html    — htmx script include
│   └── product.html        — reusable product card component
├── cart/
│   ├── add/
│   │   └── loader.js       — POST /cart/add
│   ├── count/
│   │   └── loader.js       — GET /cart/count
│   ├── remove/
│   │   └── loader.js       — DELETE /cart/remove
│   ├── fragment.html       — cart fragment for htmx swaps
│   ├── loader.js           — GET /cart
│   └── page.html           — full cart page
├── products/
│   └── [id]/
│       ├── fragment.html   — product actions fragment
│       ├── loader.js       — GET /products/:id
│       └── page.html       — full product detail page
├── loader.js               — GET / (fetches all products)
└── page.html               — home page
src/
├── index.js                — server entry point
└── lib/
    └── cart.js             — in-memory cart store
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/allaboutjs/lynnix-shop
cd lynnix-shop
npm install
```

### Development

```bash
npm run dev
```

The server starts at [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm start
```

---

## How it works

### Routing

Every directory inside `app/` maps to a route. The `[id]` directory under `products/` is a dynamic segment — visiting `/products/3` captures `3` as `req.params.id` and passes it to the loader.

### Loaders

Each route's `loader.js` exports named functions matching HTTP methods. The return value becomes `data` in the template:

```js
// app/loader.js
export async function GET() {
  const response = await fetch("https://fakestoreapi.com/products/");
  const products = await response.json();
  return { products, cartCount: cart.length };
}
```

```html
<!-- app/page.html -->
{{ for product of data.products }} {{ ::include("@/components/product.html",
product) }} {{ endfor }}
```

### htmx Cart Updates

The cart is driven entirely by htmx custom events. When a product is added or removed, the loader fires `cart-updated` on the response:

```js
// app/cart/add/loader.js
export async function POST(req, res) {
  cart.push(req.body.id);
  res.htmxTrigger("cart-updated");
  res.end();
}
```

Any element listening for `cart-updated from:body` re-fetches its content automatically — the cart count in the header and the cart fragment on the cart page both update without a full reload.

### Fragments

When htmx makes a request to `/cart`, Lynnix detects the `HX-Request` header and renders `fragment.html` instead of `page.html`. The same loader feeds both — full-page SSR for direct navigation, partial HTML for htmx swaps.

### Product Actions

The product detail page includes `fragment.html` directly for the initial render. When `cart-updated` fires, htmx re-fetches the fragment and swaps just the actions section — toggling between "Add to Cart" and the quantity controls depending on whether the item is in the cart.

---

## Deployment

### Vercel

The project is configured for Vercel out of the box via `vercel.json`. Push to GitHub and import the repository into Vercel, or deploy directly:

```bash
vercel deploy
```

### Any Node.js Host

Set `NODE_ENV=production` and run:

```bash
npm start
```

Works on Railway, Render, Fly.io, or any platform that runs a persistent Node.js process.

---

## License

MIT © [Onah Victor](https://github.com/allAboutJS)
