import { cart } from "../src/lib/cart.js";
import { products } from "../src/lib/products.js";

export async function GET() {
  return { products, cartCount: cart.length };
}
