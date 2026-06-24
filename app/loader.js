import fetch from "node-fetch";
import { cart } from "../src/lib/cart.js";

export async function GET() {
  const response = await fetch("https://fakestoreapi.com/products/");

  try {
    const data = await response.json();
    return { products: data, cartCount: cart.length };
  } catch (error) {
    console.error(error);
    console.log(await response.text());
    return { products: [], cartCount: cart.length };
  }
}
