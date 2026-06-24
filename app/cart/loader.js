import { cart } from "../../src/lib/cart.js";
import { products } from "../../src/lib/products.js";

export async function GET() {
  const uniqueId = new Set(cart);
  const filteredData = products.filter((product) =>
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
