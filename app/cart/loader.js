import fetch from "node-fetch";
import { cart } from "../../src/lib/cart";

export async function GET() {
  const response = await fetch("https://fakestoreapi.com/products/");
  const data = await response.json();

  const uniqueId = new Set(cart);
  const filteredData = data.filter((product) =>
    uniqueId.has(String(product.id)),
  );

  const cartItems = filteredData.map((product) => ({
    id: product.id,
    name: product.title,
    price: product.price,
    quantity: cart.filter((id) => id === String(product.id)).length,
  }));

  return {
    cartItems,
    total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    cartCount: cart.length,
  };
}
