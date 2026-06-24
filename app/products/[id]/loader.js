import { cart } from "../../../src/lib/cart.js";
import { products } from "../../../src/lib/products.js";

export async function GET(req, res) {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.redirect("/");
    return;
  }

  const quantity = cart.filter((id) => id === String(product.id)).length;

  return {
    product,
    quantity,
    inCart: quantity > 0,
    cartCount: cart.length,
  };
}
