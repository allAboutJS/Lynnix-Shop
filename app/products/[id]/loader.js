import { NotFoundError } from "lynnix";
import fetch from "node-fetch";
import { cart } from "../../../src/lib/cart";

export async function GET(req) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${req.params.id}`,
  );

  if (!response.ok) {
    throw new NotFoundError();
  }

  const product = await response.json();
  const quantity = cart.filter((id) => id === String(product.id)).length;

  return {
    product,
    quantity,
    inCart: quantity > 0,
    cartCount: cart.length,
  };
}
