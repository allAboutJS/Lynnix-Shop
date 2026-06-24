import { cart } from "../src/lib/cart.js";

export async function GET() {
  const response = await fetch("https://fakestoreapi.com/products/");
  const data = await response.json();

  return { products: data, cartCount: cart.length };
}
