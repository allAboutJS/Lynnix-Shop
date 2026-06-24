import fetch from "node-fetch";
import { cart } from "../src/lib/cart";

export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    const data = await response.json();
    return { products: data, cartCount: cart.length };
  } catch (error) {
    console.error(error);
    return { products: [], cartCount: cart.length };
  }
}
