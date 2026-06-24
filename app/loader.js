import fetch from "node-fetch";
import { cart } from "../src/lib/cart";

export async function GET() {
  const response = await fetch("https://fakestoreapi.com/products/");
  const data = await response.json();
  return { products: data, cartCount: cart.length };
}
